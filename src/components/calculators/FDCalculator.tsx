import { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateFD } from '@/utils/calculations';
import { formatINR } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('fd-calculator')!;

const compoundingOptions = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 },
];

export default function FDCalculator() {
  useSeo({
    title: 'Fixed Deposit Calculator',
    description: 'Calculate the maturity value of your Fixed Deposit (FD) with compound interest. See how much your FD will grow.',
    path: '/calculators/fd-calculator',
  });

  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState(4);

  const result = useMemo(
    () => calculateFD(principal, rate, years, compounding),
    [principal, rate, years, compounding]
  );

  return (
    <CalculatorLayout info={info} title="Fixed Deposit Calculator" description="Calculate the maturity value of your fixed deposit with compound interest.">
      <div className="card p-6">
        <div className="space-y-6">
          <SliderInput
            label="Deposit Amount"
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
            max={15}
            step={0.1}
            display={`${rate}%`}
          />
          <SliderInput
            label="Tenure"
            value={years}
            onChange={setYears}
            min={1}
            max={20}
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
            icon={<PiggyBank className="h-4 w-4" />}
          />
          <ResultCard
            label="Deposit Amount"
            value={formatINR(result.principal)}
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-success-600 to-success-700 p-5 text-white">
          <p className="text-sm text-success-100">Your FD Growth</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white/80 transition-all"
              style={{ width: `${(result.principal / result.maturityValue) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span>Deposit: {formatINR(result.principal)}</span>
            <span>Maturity: {formatINR(result.maturityValue)}</span>
          </div>
        </div>

        <FormulaCard
          formula="A = P \u00D7 (1 + r/n)^(n\u00D7t)"
          explanation={
            <p>
              A = Maturity value, P = Principal, r = annual interest rate (in decimal),
              n = compounding frequency per year, t = tenure in years.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
