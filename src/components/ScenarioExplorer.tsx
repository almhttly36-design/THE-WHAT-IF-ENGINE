import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Zap,
  Dice5,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Locale } from '../config/i18n.config';
import { 
  PRESET_SCENARIOS, 
  SCENARIO_CATEGORIES, 
  ScenarioQuestion 
} from '../data/presetScenarios';
import { AdBanner } from './AdBanner';

interface ScenarioExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (prompt: string) => void;
  locale: Locale;
}

export const ScenarioExplorer: React.FC<ScenarioExplorerProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  locale,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isRTL = locale === 'ar';

  const filteredScenarios = useMemo(() => {
    return PRESET_SCENARIOS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const titleText = (item.title[locale] || item.title.en || '').toLowerCase();
      const descText = (item.description[locale] || item.description.en || '').toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || titleText.includes(query) || descText.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, locale]);

  if (!isOpen) return null;

  const handlePickRandom = () => {
    const randomItem = PRESET_SCENARIOS[Math.floor(Math.random() * PRESET_SCENARIOS.length)];
    const text = randomItem.title[locale] || randomItem.title.en;
    onSelectScenario(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#07090E] border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 bg-zinc-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">
                  {locale === 'ar' ? 'مكتبة الأسئلة والسيناريوهات الافتراضية' : 'Counterfactual Scenario Vault'}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  {PRESET_SCENARIOS.length} {locale === 'ar' ? 'سيناريو' : 'seeds'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {locale === 'ar'
                  ? 'اختر أي سيناريو لاختبار نتائجه عبر محرك الذكاء الاصطناعي التفرعي فوراً'
                  : 'Select any scenario seed to simulate its causal branching instantly'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePickRandom}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
            >
              <Dice5 className="w-4 h-4" />
              <span>{locale === 'ar' ? 'سؤال عشوائي' : 'Random Seed'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar & Categories Tabs */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/60 bg-zinc-950/40 space-y-3">
          {/* Search Field */}
          <div className="relative flex items-center">
            <Search className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} w-4 h-4 text-zinc-500 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'ابحث في الأسئلة والسيناريوهات (الأندلس، المريخ، الطاقة، الذكاء الاصطناعي...)' : 'Filter scenarios (e.g. Alexandria, Mars, Fusion, Quantum)...'}
              className={`w-full bg-zinc-900/70 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm rounded-xl py-2.5 ${
                isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
              } border border-zinc-800 focus:outline-none focus:border-cyan-500/60 transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} text-zinc-500 hover:text-zinc-300 text-xs`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SCENARIO_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label[locale] || cat.label.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* In-Modal Sponsored Ad */}
        <div className="px-4 sm:px-6 pt-3 flex justify-center">
          <div className="hidden sm:block">
            <AdBanner slot="banner_468x60" />
          </div>
          <div className="block sm:hidden">
            <AdBanner slot="mobile_320x50" />
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredScenarios.length === 0 ? (
            <div className="col-span-full py-12 text-center text-zinc-500">
              <Layers className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {locale === 'ar' ? 'لم يتم العثور على سيناريوهات مطابقة للبحث' : 'NO MATCHING SCENARIOS FOUND'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                {locale === 'ar' ? 'عرض جميع السيناريوهات' : 'Reset all filters'}
              </button>
            </div>
          ) : (
            filteredScenarios.map((scenario) => {
              const title = scenario.title[locale] || scenario.title.en;
              const desc = scenario.description[locale] || scenario.description.en;
              return (
                <div
                  key={scenario.id}
                  onClick={() => {
                    onSelectScenario(title);
                    onClose();
                  }}
                  className="group relative p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-cyan-500/60 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xl">{scenario.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase">
                        {scenario.category}
                      </span>
                    </div>

                    {/* Question Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                      {title}
                    </h3>

                    {/* Explanation */}
                    <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="mt-3.5 pt-2.5 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{locale === 'ar' ? 'بدء المحاكاة الآن' : 'Simulate Vector'}</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{locale === 'ar' ? 'توليد ديناميكي مدعوم بنماذج Gemini' : 'Powered by Gemini 3.7 Causal Inference'}</span>
          </span>
          <button
            onClick={handlePickRandom}
            className="sm:hidden flex items-center gap-1 text-cyan-400 font-bold"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'عشوائي' : 'Random'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
