import { useState, useMemo } from 'react';
import { TrendingUp, Percent, Wallet } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateCompoundInterest } from '@/utils/calculations';
import { formatINR } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('compound-interest-calculator')!;

const compoundingOptions = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 },
];

export default function CompoundInterestCalculator() {
  useSeo({
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest on any principal amount with flexible compounding frequencies. See how compounding grows your money.',
    path: '/calculators/compound-interest-calculator',
  });

  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState(12);

  const result = useMemo(
    () => calculateCompoundInterest(principal, rate, years, compounding),
    [principal, rate, years, compounding]
  );

  const yearlyData = useMemo(() => {
    const data = [];
    let balance = principal;
    for (let y = 1; y <= years; y++) {
      const r = rate / 100 / compounding;
      const n = compounding;
      const newBalance = principal * Math.pow(1 + r, n * y);
      data.push({
        year: y,
        balance: newBalance,
        interest: newBalance - balance,
      });
      balance = newBalance;
    }
    return data;
  }, [principal, rate, years, compounding]);

  const maxBalance = Math.max(...yearlyData.map((d) => d.balance));

  return (
    <CalculatorLayout info={info} title="Compound Interest Calculator" description="Compute compound interest on any principal with flexible compounding frequency.">
      <div className="card p-6">
        <div className="space-y-6">
          <SliderInput
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={10000000}
            step={1000}
            display={formatINR(principal)}
          />
          <SliderInput
            label="Interest Rate (Annual)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.1}
            display={`${rate}%`}
          />
          <SliderInput
            label="Time Period"
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            step={1}
            display={`${years} yr`}
          />
          <div>
            <label className="input-label">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {compoundingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCompounding(opt.value)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    compounding === opt.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard
            label="Maturity Value"
            value={formatINR(result.maturityValue)}
            highlight
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <ResultCard
            label="Total Interest"
            value={formatINR(result.totalInterest)}
            icon={<Percent className="h-4 w-4" />}
          />
          <ResultCard
            label="Principal"
            value={formatINR(result.principal)}
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Year-by-Year Growth</h3>
          <div className="space-y-2">
            {yearlyData.map((d) => (
              <div key={d.year} className="flex items-center gap-3">
                <span className="w-12 text-xs font-medium text-gray-500">Year {d.year}</span>
                <div className="flex-1">
                  <div className="h-7 overflow-hidden rounded-lg bg-gray-100">
                    <div
                      className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-2 transition-all"
                      style={{ width: `${(d.balance / maxBalance) * 100}%` }}
                    >
                      <span className="text-xs font-medium text-white">{formatINR(d.balance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FormulaCard
          formula="A = P \u00D7 (1 + r/n)^(n\u00D7t)"
          explanation={
            <p>
              A = Final amount, P = Principal, r = annual interest rate (in decimal),
              n = number of times interest is compounded per year, t = time in years.
              Compound interest means you earn interest on your interest, leading to exponential growth.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
