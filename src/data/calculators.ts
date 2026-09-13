import {
  Calculator,
  TrendingUp,
  Landmark,
  PiggyBank,
  Percent,
  Receipt,
  Wallet,
  FileText,
  type LucideIcon,
} from 'lucide-react';

export interface CalculatorInfo {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  category: string;
  color: string;
  bgColor: string;
}

export const calculators: CalculatorInfo[] = [
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    shortName: 'EMI',
    description: 'Calculate your monthly EMI for any loan amount, interest rate, and tenure.',
    icon: Calculator,
    category: 'Loans',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    shortName: 'SIP',
    description: 'See how your monthly SIP investments grow over time with compounding.',
    icon: TrendingUp,
    category: 'Investments',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Eligibility Calculator',
    shortName: 'Loan',
    description: 'Find out how much loan you can get based on your income and existing EMIs.',
    icon: Landmark,
    category: 'Loans',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
  },
  {
    slug: 'fd-calculator',
    name: 'Fixed Deposit Calculator',
    shortName: 'FD',
    description: 'Calculate the maturity value of your fixed deposit with compound interest.',
    icon: PiggyBank,
    category: 'Savings',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortName: 'Compound Interest',
    description: 'Compute compound interest on any principal with flexible compounding frequency.',
    icon: Percent,
    category: 'Savings',
    color: 'text-primary-700',
    bgColor: 'bg-primary-50',
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    shortName: 'GST',
    description: 'Add or remove GST from any amount with support for all Indian GST slabs.',
    icon: Receipt,
    category: 'Tax',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortName: 'Simple Interest',
    description: 'Calculate simple interest on any principal, rate, and time period.',
    icon: Wallet,
    category: 'Savings',
    color: 'text-secondary-700',
    bgColor: 'bg-secondary-50',
  },
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    shortName: 'Income Tax',
    description: 'Compare old vs new tax regimes and find out your income tax liability.',
    icon: FileText,
    category: 'Tax',
    color: 'text-error-600',
    bgColor: 'bg-error-50',
  },
];

export function getCalculator(slug: string): CalculatorInfo | undefined {
  return calculators.find((c) => c.slug === slug);
}
