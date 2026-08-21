import { SimulationResult } from '../types';

export function updatePageSEO(
  prompt: string | null,
  result: SimulationResult | null,
  locale: string = 'ar'
) {
  const defaultTitle = locale === 'ar' 
    ? 'The What If Engine | محرك محاكاة السيناريوهات والتشعبات البديلة' 
    : 'The What If Engine | Counterfactual Causal Simulation Engine';

  const defaultDesc = locale === 'ar'
    ? 'محرك تحليلي متطور لمحاكاة السيناريوهات الافتراضية والتشعبات الزمنية ومصفوفات المخاطر والفرص بالذكاء الاصطناعي.'
    : 'Advanced simulation engine exploring counterfactual scenarios, temporal forecasts, and contingency matrices.';

  if (!prompt || !result) {
    document.title = defaultTitle;
    setMeta('title', defaultTitle);
    setMeta('description', defaultDesc);
    setMetaProperty('og:title', defaultTitle);
    setMetaProperty('og:description', defaultDesc);
    setMetaProperty('twitter:title', defaultTitle);
    setMetaProperty('twitter:description', defaultDesc);
    
    // Reset URL to base without destroying hash/locale
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    url.searchParams.delete('id');
    window.history.replaceState({}, '', url.toString());
    return;
  }

  // Generate dynamic SEO Title & Description
  const displayTitle = `${prompt.trim()} | The What If Engine`;
  const summarySnippet = result.scenario_summary
    ? result.scenario_summary.substring(0, 160) + (result.scenario_summary.length > 160 ? '...' : '')
    : defaultDesc;

  document.title = displayTitle;

  setMeta('title', displayTitle);
  setMeta('description', summarySnippet);

  // Social Open Graph Tags (Facebook, LinkedIn, Discord, Telegram, WhatsApp)
  setMetaProperty('og:title', displayTitle);
  setMetaProperty('og:description', summarySnippet);
  setMetaProperty('og:type', 'article');
  setMetaProperty('og:url', window.location.href);

  // Twitter / X Card
  setMetaProperty('twitter:title', displayTitle);
  setMetaProperty('twitter:description', summarySnippet);

  // Dynamic Schema.org JSON-LD Structured Data for Google Rich Snippets
  injectJsonLd(prompt, result);

  // Deep Link in URL query param for instant sharing and Googlebot crawler indexing
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('q', prompt.trim());
    window.history.replaceState({ prompt }, '', url.toString());
  } catch (err) {
    console.warn('Could not update history state:', err);
  }
}

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function injectJsonLd(prompt: string, result: SimulationResult) {
  const existingScript = document.getElementById('seo-jsonld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: prompt,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${result.scenario_summary} المخاطر التقديرية: ${result.risk_index?.category} (${result.risk_index?.score}%). السيناريو المتفائل: ${result.outcomes?.optimistic}. السيناريو المتشائم: ${result.outcomes?.pessimistic}.`,
        },
      },
    ],
  };

  const script = document.createElement('script');
  script.id = 'seo-jsonld-schema';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}
