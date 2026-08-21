import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  where,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import { SimulationResult, HistoryItem } from '../types';

const SIMULATIONS_COLLECTION = 'simulations';

/**
 * Normalizes text for robust matching across accents, Arabic hamzas, case and punctuation
 */
export function normalizePrompt(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Normalize Arabic alefs
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ة]/g, 'ه')
    // Remove Arabic diacritics / tashkeel
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Remove punctuation & question marks
    .replace(/[؟?.,!;:()[\]{}"'“”‘’\-_/\\#@$%^&*~+=]/g, ' ')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Save or sync a simulation result to Cloud Firestore
 */
export async function saveSimulationToFirestore(
  promptText: string,
  simResult: SimulationResult,
  language: string
): Promise<string> {
  const normalizedKey = normalizePrompt(promptText);
  // Generate deterministic ID or custom id
  const customId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, SIMULATIONS_COLLECTION, customId);

  const payload = {
    id: customId,
    prompt: promptText.trim(),
    normalized_prompt: normalizedKey,
    language: language || 'ar',
    scenario_summary: simResult.scenario_summary || '',
    risk_index: {
      score: Number(simResult.risk_index?.score) || 50,
      category: String(simResult.risk_index?.category || 'MODERATE'),
    },
    outcomes: {
      optimistic: String(simResult.outcomes?.optimistic || ''),
      pessimistic: String(simResult.outcomes?.pessimistic || ''),
    },
    temporal_impact: {
      one_month: String(simResult.temporal_impact?.one_month || ''),
      one_year: String(simResult.temporal_impact?.one_year || ''),
      five_years: String(simResult.temporal_impact?.five_years || ''),
    },
    contingency_plan: Array.isArray(simResult.contingency_plan) ? simResult.contingency_plan : [],
    search_intent_title: simResult.search_intent_title || promptText.trim(),
    source: 'ai_generated',
    createdAt: new Date().toISOString(),
    timestamp: Date.now(),
  };

  await setDoc(docRef, payload);
  return customId;
}

/**
 * Search Cloud Firestore for a previously simulated scenario to serve instantly without calling AI
 */
export async function findSimulationInFirestore(
  promptText: string,
  cachedItems?: HistoryItem[]
): Promise<SimulationResult | null> {
  const normalizedTarget = normalizePrompt(promptText);
  if (!normalizedTarget || normalizedTarget.length < 3) return null;

  // 1. Fast in-memory check (from real-time listener or local history)
  if (cachedItems && cachedItems.length > 0) {
    const memoryMatch = cachedItems.find((item) => {
      const norm = normalizePrompt(item.user_prompt);
      return norm === normalizedTarget || norm.includes(normalizedTarget) || normalizedTarget.includes(norm);
    });

    if (memoryMatch && memoryMatch.result) {
      return {
        ...memoryMatch.result,
        source: 'shared_cache',
      };
    }
  }

  // 2. Query Firestore directly
  try {
    // Try exact prompt or normalized query first
    const q1 = query(
      collection(db, SIMULATIONS_COLLECTION),
      where('normalized_prompt', '==', normalizedTarget),
      limit(1)
    );
    const snap1 = await getDocs(q1);
    if (!snap1.empty) {
      const data = snap1.docs[0].data();
      return {
        scenario_summary: data.scenario_summary || '',
        risk_index: data.risk_index || { score: 50, category: 'MODERATE' },
        outcomes: data.outcomes || { optimistic: '', pessimistic: '' },
        temporal_impact: data.temporal_impact || { one_month: '', one_year: '', five_years: '' },
        contingency_plan: data.contingency_plan || [],
        search_intent_title: data.search_intent_title || data.prompt || '',
        source: 'shared_cache',
        cached_at: data.createdAt,
      };
    }

    // Fallback search across recent 100 simulations
    const qRecent = query(
      collection(db, SIMULATIONS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const snapRecent = await getDocs(qRecent);
    
    for (const d of snapRecent.docs) {
      const data = d.data();
      const docNorm = data.normalized_prompt || normalizePrompt(data.prompt || '');
      if (docNorm === normalizedTarget || (docNorm.length > 10 && (docNorm.includes(normalizedTarget) || normalizedTarget.includes(docNorm)))) {
        return {
          scenario_summary: data.scenario_summary || '',
          risk_index: data.risk_index || { score: 50, category: 'MODERATE' },
          outcomes: data.outcomes || { optimistic: '', pessimistic: '' },
          temporal_impact: data.temporal_impact || { one_month: '', one_year: '', five_years: '' },
          contingency_plan: data.contingency_plan || [],
          search_intent_title: data.search_intent_title || data.prompt || '',
          source: 'shared_cache',
          cached_at: data.createdAt,
        };
      }
    }

    return null;
  } catch (err) {
    console.warn('Error querying Firestore cache:', err);
    return null;
  }
}

/**
 * Real-time listener for Firestore simulations collection
 */
export function subscribeToSimulations(
  callback: (items: HistoryItem[]) => void,
  maxItems = 50
) {
  const q = query(
    collection(db, SIMULATIONS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(maxItems)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items: HistoryItem[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          timestamp: data.timestamp || (data.createdAt ? new Date(data.createdAt).getTime() : Date.now()),
          user_prompt: data.prompt || '',
          scenario_summary: data.scenario_summary || '',
          risk_score: data.risk_index?.score || 50,
          risk_category: data.risk_index?.category || 'MODERATE',
          result: {
            scenario_summary: data.scenario_summary || '',
            risk_index: data.risk_index || { score: 50, category: 'MODERATE' },
            outcomes: data.outcomes || { optimistic: '', pessimistic: '' },
            temporal_impact: data.temporal_impact || { one_month: '', one_year: '', five_years: '' },
            contingency_plan: data.contingency_plan || [],
            search_intent_title: data.search_intent_title || data.prompt || '',
            source: 'shared_cache',
            cached_at: data.createdAt,
          },
        };
      });
      callback(items);
    },
    (err) => {
      console.warn('Firestore subscription error (fallback to local):', err);
    }
  );
}

/**
 * Delete a simulation from Firestore
 */
export async function deleteSimulationFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, SIMULATIONS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Fetch initial list of simulations once
 */
export async function fetchSimulationsFromFirestore(maxItems = 50): Promise<HistoryItem[]> {
  try {
    const q = query(
      collection(db, SIMULATIONS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(maxItems)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        timestamp: data.timestamp || (data.createdAt ? new Date(data.createdAt).getTime() : Date.now()),
        user_prompt: data.prompt || '',
        scenario_summary: data.scenario_summary || '',
        risk_score: data.risk_index?.score || 50,
        risk_category: data.risk_index?.category || 'MODERATE',
        result: {
          scenario_summary: data.scenario_summary || '',
          risk_index: data.risk_index || { score: 50, category: 'MODERATE' },
          outcomes: data.outcomes || { optimistic: '', pessimistic: '' },
          temporal_impact: data.temporal_impact || { one_month: '', one_year: '', five_years: '' },
          contingency_plan: data.contingency_plan || [],
          search_intent_title: data.search_intent_title || data.prompt || '',
          source: 'shared_cache',
          cached_at: data.createdAt,
        },
      };
    });
  } catch (err) {
    console.warn('Failed to fetch from Firestore:', err);
    return [];
  }
}
