import { type ReactNode } from 'react';
import { Info } from 'lucide-react';

interface FormulaCardProps {
  title?: string;
  formula: ReactNode;
  explanation?: ReactNode;
}

export default function FormulaCard({ title = 'Formula', formula, explanation }: FormulaCardProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-primary-500" />
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="mt-3 overflow-x-auto">
        <code className="whitespace-nowrap font-mono text-sm text-gray-800">{formula}</code>
      </div>
      {explanation && <div className="mt-3 text-sm text-gray-500">{explanation}</div>}
    </div>
  );
}
