import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, TrendingUp, Receipt, Landmark, PiggyBank, Percent, Wallet } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import AdSlot from '@/components/AdSlot';

const guides = [
  {
    title: 'Understanding EMI: How Your Loan Payments Work',
    excerpt: 'Learn what EMI is, how it is calculated, and why the interest portion is higher in the early years of your loan.',
    icon: Landmark,
    readTime: '5 min',
    link: '/calculators/emi-calculator',
  },
  {
    title: 'SIP vs Lump Sum: Which Is Better for You?',
    excerpt: 'Compare Systematic Investment Plans with one-time investments and understand the power of rupee cost averaging.',
    icon: TrendingUp,
    readTime: '6 min',
    link: '/calculators/sip-calculator',
  },
  {
    title: 'How to Save Tax Under Section 80C and 80D',
    excerpt: 'A practical guide to tax-saving investments and health insurance deductions under the old tax regime.',
    icon: Receipt,
    readTime: '7 min',
    link: '/calculators/income-tax-calculator',
  },
  {
    title: 'Fixed Deposits: A Safe Investment Option',
    excerpt: 'Understand how FDs work, the effect of compounding frequency, and when to choose FDs over other investments.',
    icon: PiggyBank,
    readTime: '5 min',
    link: '/calculators/fd-calculator',
  },
  {
    title: 'The Power of Compound Interest Explained',
    excerpt: 'See how compound interest grows your money exponentially and why starting early matters more than the amount.',
    icon: Percent,
    readTime: '5 min',
    link: '/calculators/compound-interest-calculator',
  },
  {
    title: 'GST in India: A Simple Guide for Businesses',
    excerpt: 'Understand the GST slabs, how to calculate GST on your invoices, and the difference between inclusive and exclusive pricing.',
    icon: Wallet,
    readTime: '6 min',
    link: '/calculators/gst-calculator',
  },
];

export default function Guides() {
  useSeo({
    title: 'Finance Guides',
    description: 'Easy-to-understand finance guides on EMI, SIP, tax saving, fixed deposits, compound interest, and GST for Indian investors.',
    path: '/guides',
  });

  return (
    <div className="container-app py-12">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-50 p-3">
          <BookOpen className="h-7 w-7 text-primary-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          Finance Guides
        </h1>
        <p className="mt-3 text-gray-500">
          Simple, practical guides to help you understand and manage your money better.
        </p>
      </div>

      <AdSlot variant="horizontal" />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div key={guide.title} className="card card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{guide.readTime} read</span>
                  </div>
                  <h2 className="mt-1 font-display text-lg font-bold text-gray-900">
                    {guide.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">{guide.excerpt}</p>
                  <Link
                    to={guide.link}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                  >
                    Try the calculator <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
