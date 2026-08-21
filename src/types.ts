export type SupportedLocale = 'ar' | 'en' | 'es' | 'fr';

export interface SimulationResult {
  scenario_summary: string;
  risk_index: {
    score: number;
    category: string;
  };
  outcomes: {
    optimistic: string;
    pessimistic: string;
  };
  temporal_impact: {
    one_month: string;
    one_year: string;
    five_years: string;
  };
  contingency_plan: string[];
  search_intent_title?: string;
  source?: 'shared_cache' | 'ai_generated' | 'local_cache' | 'resilient_engine';
  cached_at?: string;
  model_used?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  user_prompt: string;
  scenario_summary: string;
  result: SimulationResult;
  risk_score: number;
  risk_category: string;
}

export interface Dictionary {
  badge: string;
  hero_title: string;
  hero_subtitle: string;
  search_placeholder: string;
  analyze_button: string;
  simulating_button: string;
  trending_label: string;
  preset_1: string;
  preset_2: string;
  preset_3: string;
  custom_key_label: string;
  custom_key_placeholder: string;
  custom_key_save: string;
  key_saved: string;
  summary_label: string;
  risk_label: string;
  optimistic_label: string;
  pessimistic_label: string;
  temporal_label: string;
  contingency_label: string;
  badges: {
    ai_models: string;
    realtime: string;
    historical: string;
  };
}
