import type { ReactNode } from 'react';
import { i18n, localeDirection, type Locale } from '@/config/i18n.config';
import '@/index.css';

export interface Metadata {
  title: {
    default: string;
    template: string;
  };
  description?: string;
  alternates?: {
    canonical: string;
    languages: Record<string, string>;
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: 'The What If Engine | محرك ماذا لو',
      template: '%s | The What If Engine',
    },
    description:
      'An advanced analytical counterfactual simulation engine computing hypothetical scenarios, causal divergence, and temporal timelines.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
        es: '/es',
        fr: '/fr',
        'x-default': '/ar',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const direction = localeDirection[locale] || 'ltr';

  return (
    <html lang={locale} dir={direction} className="dark">
      <body className="min-h-screen bg-[#04060A] text-zinc-100 antialiased font-sans selection:bg-cyan-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
