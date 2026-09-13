import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { calculators } from '@/data/calculators';
import { useSeo } from '@/hooks/useSeo';
import AdSlot from '@/components/AdSlot';

export default function Calculators() {
  useSeo({
    title: 'Financial Calculators',
    description: 'Browse all free financial calculators - EMI, SIP, Loan Eligibility, FD, Compound Interest, GST, Simple Interest, and Income Tax.',
    path: '/calculators',
  });

  const categories = [...new Set(calculators.map((c) => c.category))];

  return (
    <div className="container-app py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          Financial Calculators
        </h1>
        <p className="mt-3 text-gray-500">
          Choose from our collection of free, accurate financial calculators designed for Indian users.
        </p>
      </div>

      <AdSlot variant="horizontal" />

      <div className="mt-10 space-y-10">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {calculators
                .filter((c) => c.category === category)
                .map((calc) => {
                  const Icon = calc.icon;
                  return (
                    <Link
                      key={calc.slug}
                      to={`/calculators/${calc.slug}`}
                      className="card card-hover group p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${calc.bgColor}`}>
                          <Icon className={`h-6 w-6 ${calc.color}`} />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-primary-600">
                            {calc.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{calc.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Open Calculator <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
