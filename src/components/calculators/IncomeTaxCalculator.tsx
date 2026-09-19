import { useState, useMemo } from 'react';
import { FileText, Check, TrendingDown } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateIncomeTax } from '@/utils/calculations';
import { formatINR, formatINRDecimal } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import SliderInput from '@/components/calculator/SliderInput';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('income-tax-calculator')!;

export default function IncomeTaxCalculator() {
  useSeo({
    title: 'Income Tax Calculator',
    description: 'Compare old vs new income tax regimes for FY 2024-25. Calculate your income tax liability and find the better regime.',
    path: '/calculators/income-tax-calculator',
  });

  const [income, setIncome] = useState(1000000);
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(25000);
  const [hra, setHra] = useState(0);
  const [other, setOther] = useState(0);

  const result = useMemo(
    () => calculateIncomeTax(income, { section80C, section80D, hra, other }),
    [income, section80C, section80D, hra, other]
  );

  return (
    <CalculatorLayout info={info} title="Income Tax Calculator" description="Compare old vs new tax regimes and find out your income tax liability for FY 2024-25.">
      <div className="card p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Income Details</h3>
        <div className="space-y-6">
          <SliderInput
            label="Annual Income (Gross)"
            value={income}
            onChange={setIncome}
            min={100000}
            max={50000000}
            step={50000}
            display={formatINR(income)}
          />
        </div>

        <h3 className="mb-4 mt-6 text-sm font-semibold text-gray-700">Deductions (Old Regime Only)</h3>
        <div className="space-y-6">
          <SliderInput
            label="Section 80C (PF, ELSS, LIC, etc.)"
            value={section80C}
            onChange={setSection80C}
            min={0}
            max={150000}
            step={5000}
            display={formatINR(section80C)}
          />
          <SliderInput
            label="Section 80D (Health Insurance)"
            value={section80D}
            onChange={setSection80D}
            min={0}
            max={100000}
            step={5000}
            display={formatINR(section80D)}
          />
          <SliderInput
            label="HRA Exemption"
            value={hra}
            onChange={setHra}
            min={0}
            max={500000}
            step={10000}
            display={formatINR(hra)}
          />
          <SliderInput
            label="Other Deductions"
            value={other}
            onChange={setOther}
            min={0}
            max={500000}
            step={10000}
            display={formatINR(other)}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className={`rounded-xl border-2 p-5 transition-all ${
              result.betterRegime === 'old'
                ? 'border-success-400 bg-success-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-sm font-bold text-gray-800">Old Regime</h3>
              </div>
              {result.betterRegime === 'old' && (
                <span className="flex items-center gap-1 rounded-full bg-success-600 px-2 py-0.5 text-xs font-medium text-white">
                  <Check className="h-3 w-3" /> Better
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-700">{formatINRDecimal(result.oldRegimeTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cess (4%)</span>
                <span className="font-medium text-gray-700">{formatINRDecimal(result.oldRegimeCess)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="font-semibold text-gray-700">Total Tax</span>
                <span className="font-display text-xl font-bold text-gray-900">
                  {formatINRDecimal(result.oldRegimeTotal)}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border-2 p-5 transition-all ${
              result.betterRegime === 'new'
                ? 'border-success-400 bg-success-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-sm font-bold text-gray-800">New Regime</h3>
              </div>
              {result.betterRegime === 'new' && (
                <span className="flex items-center gap-1 rounded-full bg-success-600 px-2 py-0.5 text-xs font-medium text-white">
                  <Check className="h-3 w-3" /> Better
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-700">{formatINRDecimal(result.newRegimeTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cess (4%)</span>
                <span className="font-medium text-gray-700">{formatINRDecimal(result.newRegimeCess)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="font-semibold text-gray-700">Total Tax</span>
                <span className="font-display text-xl font-bold text-gray-900">
                  {formatINRDecimal(result.newRegimeTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-100">Recommended Regime</p>
              <p className="mt-1 font-display text-2xl font-bold capitalize">
                {result.betterRegime} Regime
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-100">You Save</p>
              <p className="font-display text-2xl font-bold">
                {formatINR(Math.abs(result.oldRegimeTotal - result.newRegimeTotal))}
              </p>
            </div>
          </div>
        </div>

        <FormulaCard
          title="Tax Calculation"
          formula="Tax = \u03A3 (Taxable Income in Slab \u00D7 Rate) \u2212 Rebate \u00A787A + 4% Cess"
          explanation={
            <p>
              Tax is computed slab-by-slab. The old regime allows deductions (80C, 80D, HRA, etc.)
              and has a rebate up to \u20B912,500 for income up to \u20B95L. The new regime has wider slabs
              and a rebate up to \u20B925,000 for income up to \u20B97L. A 4% health & education cess applies on both.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
