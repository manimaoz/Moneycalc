import { useState, useMemo } from 'react';
import { TrendingDown, Wallet, Receipt } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateEMI, generateEMISchedule } from '@/utils/calculations';
import { formatINR, formatINRDecimal } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('emi-calculator')!;

export default function EMICalculator() {
  useSeo({
    title: 'EMI Calculator',
    description: 'Calculate your monthly EMI for home, car, or personal loans. Enter loan amount, interest rate, and tenure to see your monthly payment.',
    path: '/calculators/emi-calculator',
  });

  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(5);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => calculateEMI(principal, rate, years), [principal, rate, years]);
  const schedule = useMemo(
    () => (showSchedule ? generateEMISchedule(principal, rate, years) : []),
    [showSchedule, principal, rate, years]
  );

  return (
    <CalculatorLayout info={info} title="EMI Calculator" description="Calculate your monthly EMI for any loan amount, interest rate, and tenure.">
      <div className="card p-6">
        <div className="space-y-6">
          <SliderInput
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            min={10000}
            max={10000000}
            step={10000}
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
            label="Loan Tenure"
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
            label="Monthly EMI"
            value={formatINRDecimal(result.emi)}
            highlight
            icon={<Wallet className="h-4 w-4" />}
          />
          <ResultCard
            label="Total Interest"
            value={formatINR(result.totalInterest)}
            icon={<TrendingDown className="h-4 w-4" />}
          />
          <ResultCard
            label="Total Payment"
            value={formatINR(result.totalPayment)}
            icon={<Receipt className="h-4 w-4" />}
            subValue={`Principal: ${formatINR(result.principal)}`}
          />
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-100">Principal vs Interest</p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/80"></span>
                  Principal {formatINR(result.principal)}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/40"></span>
                  Interest {formatINR(result.totalInterest)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%</p>
              <p className="text-xs text-primary-100">is interest</p>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="flex h-full">
              <div
                className="bg-white/80"
                style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
              />
              <div
                className="bg-white/40"
                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="mt-4 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
        </button>

        {showSchedule && (
          <div className="mt-4 max-h-96 overflow-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">Month</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">EMI</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Interest</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Principal</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-t border-gray-100">
                    <td className="px-4 py-2.5 text-gray-500">{row.month}</td>
                    <td className="px-4 py-2.5 text-gray-700">{formatINRDecimal(row.emi)}</td>
                    <td className="px-4 py-2.5 text-gray-500">{formatINRDecimal(row.interest)}</td>
                    <td className="px-4 py-2.5 text-gray-700">{formatINRDecimal(row.principal)}</td>
                    <td className="px-4 py-2.5 text-gray-500">{formatINRDecimal(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <FormulaCard
          formula="EMI = P \u00D7 r \u00D7 (1+r)^n / ((1+r)^n \u2212 1)"
          explanation={
            <p>
              P = Principal loan amount, r = monthly interest rate (annual rate \u00F7 12 \u00F7 100),
              n = loan tenure in months. The EMI stays constant throughout the loan, but the interest
              portion decreases while the principal portion increases over time.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
