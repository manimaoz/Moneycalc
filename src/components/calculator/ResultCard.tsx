import { type ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: ReactNode;
  subValue?: string;
}

export default function ResultCard({ label, value, highlight, icon, subValue }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        highlight
          ? 'border-primary-200 bg-primary-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary-600">{icon}</span>}
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      </div>
      <p
        className={`mt-1 font-display text-2xl font-bold ${
          highlight ? 'text-primary-700' : 'text-gray-900'
        }`}
      >
        {value}
      </p>
      {subValue && <p className="mt-0.5 text-xs text-gray-400">{subValue}</p>}
    </div>
  );
}
