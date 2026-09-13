import { Target, Eye, Heart, Users } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import AdSlot from '@/components/AdSlot';

export default function About() {
  useSeo({
    title: 'About MoneyCalc',
    description: 'MoneyCalc is a free online financial calculator platform for Indian users. Learn about our mission and the tools we offer.',
    path: '/about',
  });

  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">About MoneyCalc</h1>
        <p className="mt-4 text-lg text-gray-500">
          MoneyCalc is a free online financial calculator platform built for Indian users. We provide
          accurate, easy-to-use calculators that help you make informed financial decisions.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-gray-900">Our Mission</h2>
            <p className="mt-2 text-sm text-gray-500">
              To make financial planning accessible to every Indian. We believe everyone should have
              the tools to understand their money without needing a finance degree.
            </p>
          </div>

          <div className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50">
              <Eye className="h-6 w-6 text-secondary-600" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-gray-900">Our Vision</h2>
            <p className="mt-2 text-sm text-gray-500">
              A financially literate India where every individual can calculate, plan, and make
              confident decisions about loans, investments, and taxes.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
              <Heart className="h-6 w-6 text-accent-600" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-gray-900">Why We Built This</h2>
            <p className="mt-2 text-sm text-gray-500">
              Financial calculations can be confusing. We wanted to create a simple, clean, and
              accurate tool that anyone can use, on any device, for free.
            </p>
          </div>

          <div className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50">
              <Users className="h-6 w-6 text-success-600" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-gray-900">Who It Is For</h2>
            <p className="mt-2 text-sm text-gray-500">
              From salaried professionals to business owners, students to retirees. If you earn,
              spend, save, or invest money in India, MoneyCalc is for you.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <AdSlot variant="horizontal" />
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-gray-900">What We Offer</h2>
          <ul className="mt-4 space-y-3">
            {[
              'EMI Calculator for home, car, and personal loans',
              'SIP Calculator for mutual fund investment planning',
              'Loan Eligibility Calculator to plan your borrowing capacity',
              'Fixed Deposit Calculator with compounding options',
              'Compound Interest Calculator with flexible frequencies',
              'GST Calculator for all Indian GST slabs',
              'Simple Interest Calculator for quick calculations',
              'Income Tax Calculator comparing old and new regimes',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
