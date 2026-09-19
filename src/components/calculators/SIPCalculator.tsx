import { useState, useMemo } from 'react';
import { TrendingUp, PiggyBank, Wallet } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateSIP } from '@/utils/calculations';
import { formatINR, formatINRDecimal } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('sip-calculator')!;

export default function SIPCalculator() {
  useSeo({
    title: 'SIP Calculator',
    description: 'Calculate the future value of your Systematic Investment Plan (SIP). See how your monthly mutual fund investments grow over time.',
    path: '/calculators/sip-calculator',
  });

  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateSIP(monthly, rate, years), [monthly, rate, years]);

  const investedPct = (result.totalInvested / result.maturityValue) * 100;

  return (
    <CalculatorLayout info={info} title="SIP Calculator" description="See how your monthly SIP investments grow over time with the power of compounding.">
      <div className="card p-6">
        <div className="space-y-6">
          <SliderInput
            label="Monthly Investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={1000000}
            step={500}
            display={formatINR(monthly)}
          />
          <SliderInput
            label="Expected Return Rate (Annual)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            display={`${rate}%`}
          />
          <SliderInput
            label="Investment Period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            display={`${years} yr`}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard
            label="Maturity Value"
            value={formatINR(result.maturityValue)}
            highlight
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <ResultCard
            label="Total Invested"
            value={formatINR(result.totalInvested)}
            icon={<Wallet className="h-4 w-4" />}
          />
          <ResultCard
            label="Estimated Returns"
            value={formatINR(result.totalReturns)}
            icon={<PiggyBank className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-700 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-100">Invested vs Returns</p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/80"></span>
                  Invested {formatINR(result.totalInvested)}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/40"></span>
                  Returns {formatINR(result.totalReturns)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{(result.maturityValue / result.totalInvested).toFixed(2)}x</p>
              <p className="text-xs text-secondary-100">your money</p>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="flex h-full">
              <div className="bg-white/80" style={{ width: `${investedPct}%` }} />
              <div className="bg-white/40" style={{ width: `${100 - investedPct}%` }} />
            </div>
          </div>
        </div>

        <FormulaCard
          formula="M = P \u00D7 ((1 + i)^n \u2212 1) / i \u00D7 (1 + i)"
          explanation={
            <p>
              M = Maturity value, P = Monthly SIP amount, i = monthly interest rate (annual rate \u00F7 12 \u00F7 100),
              n = number of months. SIP returns are computed assuming monthly compounding.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
