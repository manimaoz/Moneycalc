import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
}

export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    document.title = `${title} | MoneyCalc`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${title} | MoneyCalc`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    if (path) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://moneycalc.vercel.app${path}`);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = `https://moneycalc.vercel.app${path}`;
        document.head.appendChild(link);
      }
    }
  }, [title, description, path]);
}
