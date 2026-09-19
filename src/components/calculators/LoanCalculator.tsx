import { useState, useMemo } from 'react';
import { Landmark, Wallet, Receipt } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateLoanEligibility } from '@/utils/calculations';
import { formatINR, formatINRDecimal } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('loan-calculator')!;

export default function LoanCalculator() {
  useSeo({
    title: 'Loan Eligibility Calculator',
    description: 'Find out how much loan you are eligible for based on your monthly income, existing EMIs, interest rate, and tenure.',
    path: '/calculators/loan-calculator',
  });

  const [income, setIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () => calculateLoanEligibility(income, existingEMI, rate, years),
    [income, existingEMI, rate, years]
  );

  const maxEMIRatio = ((result.maxEMI / income) * 100).toFixed(0);

  return (
    <CalculatorLayout info={info} title="Loan Eligibility Calculator" description="Find out how much loan you can get based on your income and existing EMIs.">
      <div className="card p-6">
        <div className="space-y-6">
          <SliderInput
            label="Monthly Income"
            value={income}
            onChange={setIncome}
            min={10000}
            max={1000000}
            step={5000}
            display={formatINR(income)}
          />
          <SliderInput
            label="Existing EMIs"
            value={existingEMI}
            onChange={setExistingEMI}
            min={0}
            max={500000}
            step={1000}
            display={formatINR(existingEMI)}
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

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard
            label="Maximum Loan Amount"
            value={formatINR(result.maxLoanAmount)}
            highlight
            icon={<Landmark className="h-4 w-4" />}
          />
          <ResultCard
            label="Maximum Monthly EMI"
            value={formatINRDecimal(result.maxEMI)}
            icon={<Wallet className="h-4 w-4" />}
            subValue={`${maxEMIRatio}% of your income`}
          />
        </div>

        {result.maxEMI <= 0 && (
          <div className="mt-4 rounded-xl border border-warning-200 bg-warning-50 p-4">
            <p className="text-sm text-warning-700">
              Your existing EMIs exceed 50% of your monthly income. Consider reducing existing debt before applying for a new loan.
            </p>
          </div>
        )}

        <FormulaCard
          formula="Max Loan = (Max EMI \u00D7 ((1+r)^n \u2212 1)) / (r \u00D7 (1+r)^n)"
          explanation={
            <p>
              Max EMI = (Monthly Income \u00D7 50%) \u2212 Existing EMIs. r = monthly rate, n = tenure in months.
              Banks typically allow total EMIs up to 40-50% of your net monthly income.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
