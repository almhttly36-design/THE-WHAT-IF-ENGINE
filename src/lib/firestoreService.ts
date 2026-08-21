import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import { SimulationResult, HistoryItem } from '../types';

const SIMULATIONS_COLLECTION = 'simulations';

/**
 * Save or sync a simulation result to Cloud Firestore
 */
export async function saveSimulationToFirestore(
  promptText: string,
  simResult: SimulationResult,
  language: string
): Promise<string> {
  const customId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, SIMULATIONS_COLLECTION, customId);

  const payload = {
    id: customId,
    prompt: promptText.trim(),
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
    source: simResult.source || 'ai_generated',
    createdAt: new Date().toISOString(),
    timestamp: Date.now(),
  };

  await setDoc(docRef, payload);
  return customId;
}

/**
 * Real-time listener for Firestore simulations collection
 */
export function subscribeToSimulations(
  callback: (items: HistoryItem[]) => void,
  maxItems = 30
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
            source: data.source || 'shared_cache',
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
export async function fetchSimulationsFromFirestore(maxItems = 30): Promise<HistoryItem[]> {
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
          source: data.source || 'shared_cache',
          cached_at: data.createdAt,
        },
      };
    });
  } catch (err) {
    console.warn('Failed to fetch from Firestore:', err);
    return [];
  }
}
