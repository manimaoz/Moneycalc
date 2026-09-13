import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { CalculatorInfo } from '@/data/calculators';
import AdSlot from '@/components/AdSlot';

interface CalculatorLayoutProps {
  info: CalculatorInfo;
  title: string;
  description: string;
  children: ReactNode;
}

export default function CalculatorLayout({ info, title, description, children }: CalculatorLayoutProps) {
  const Icon = info.icon;
  return (
    <div className="container-app py-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-400">
        <Link to="/calculators" className="flex items-center gap-1 transition-colors hover:text-primary-600">
          <ArrowLeft className="h-3.5 w-3.5" />
          Calculators
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-600">{info.shortName}</span>
      </nav>

      <div className="mb-8 flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${info.bgColor}`}>
          <Icon className={`h-7 w-7 ${info.color}`} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{children}</div>
        <div className="space-y-6">
          <AdSlot variant="square" />
        </div>
      </div>
    </div>
  );
}
