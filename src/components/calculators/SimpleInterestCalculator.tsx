import { useState, useMemo } from 'react';
import { Wallet, Percent, TrendingUp } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateSimpleInterest } from '@/utils/calculations';
import { formatINR } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('simple-interest-calculator')!;

export default function SimpleInterestCalculator() {
  useSeo({
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on any principal amount, rate, and time period. Quick and easy simple interest calculation.',
    path: '/calculators/simple-interest-calculator',
  });

  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () => calculateSimpleInterest(principal, rate, years),
    [principal, rate, years]
  );

  return (
    <CalculatorLayout info={info} title="Simple Interest Calculator" description="Calculate simple interest on any principal, rate, and time period.">
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
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard
            label="Total Amount"
            value={formatINR(result.totalAmount)}
            highlight
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <ResultCard
            label="Interest Earned"
            value={formatINR(result.interest)}
            icon={<Percent className="h-4 w-4" />}
          />
          <ResultCard
            label="Principal"
            value={formatINR(result.principal)}
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-700 p-5 text-white">
          <p className="text-sm text-secondary-100">Principal vs Interest</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="flex h-full">
              <div
                className="bg-white/80"
                style={{ width: `${(result.principal / result.totalAmount) * 100}%` }}
              />
              <div
                className="bg-white/40"
                style={{ width: `${(result.interest / result.totalAmount) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span>Principal: {formatINR(result.principal)}</span>
            <span>Interest: {formatINR(result.interest)}</span>
          </div>
        </div>

        <FormulaCard
          formula="SI = (P \u00D7 R \u00D7 T) / 100  |  A = P + SI"
          explanation={
            <p>
              SI = Simple Interest, P = Principal, R = annual interest rate (%),
              T = time in years, A = Total amount. Unlike compound interest, simple interest
              is calculated only on the principal and does not earn interest on interest.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
