import { type ReactNode } from 'react';
import AdSlot from '@/components/AdSlot';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: {lastUpdated}</p>

        <div className="mt-8">{children}</div>

        <div className="mt-10">
          <AdSlot variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
