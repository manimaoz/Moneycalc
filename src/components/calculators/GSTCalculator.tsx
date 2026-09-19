import { useState, useMemo } from 'react';
import { Receipt, Wallet, TrendingUp } from 'lucide-react';
import { getCalculator } from '@/data/calculators';
import { calculateGST } from '@/utils/calculations';
import { formatINRDecimal } from '@/utils/format';
import { useSeo } from '@/hooks/useSeo';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import ResultCard from '@/components/calculator/ResultCard';
import FormulaCard from '@/components/calculator/FormulaCard';

const info = getCalculator('gst-calculator')!;

const gstRates = [0, 3, 5, 12, 18, 28];

export default function GSTCalculator() {
  useSeo({
    title: 'GST Calculator',
    description: 'Add or remove GST from any amount. Calculate GST for all Indian GST slabs - 0%, 3%, 5%, 12%, 18%, and 28%.',
    path: '/calculators/gst-calculator',
  });

  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const result = useMemo(() => calculateGST(amount, rate, mode), [amount, rate, mode]);

  return (
    <CalculatorLayout info={info} title="GST Calculator" description="Add or remove GST from any amount with support for all Indian GST slabs.">
      <div className="card p-6">
        <div className="space-y-6">
          <div>
            <label className="input-label">GST Calculation Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('exclusive')}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  mode === 'exclusive'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                Add GST (Exclusive)
              </button>
              <button
                onClick={() => setMode('inclusive')}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  mode === 'inclusive'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                Remove GST (Inclusive)
              </button>
            </div>
          </div>

          <div>
            <label className="input-label">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">\u20B9</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="input-field pl-8"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <label className="input-label">GST Rate</label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {gstRates.map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    rate === r
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard
            label={mode === 'exclusive' ? 'Base Amount' : 'Net Amount (excl. GST)'}
            value={formatINRDecimal(result.netAmount)}
            highlight
            icon={<Wallet className="h-4 w-4" />}
          />
          <ResultCard
            label={`GST Amount (${rate}%)`}
            value={formatINRDecimal(result.gstAmount)}
            icon={<Receipt className="h-4 w-4" />}
          />
          <ResultCard
            label="Total Amount (incl. GST)"
            value={formatINRDecimal(result.totalAmount)}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <FormulaCard
          formula={
            mode === 'exclusive'
              ? 'GST Amount = Amount \u00D7 (Rate / 100)  |  Total = Amount + GST Amount'
              : 'Net Amount = Amount / (1 + Rate/100)  |  GST Amount = Amount \u2212 Net Amount'
          }
          explanation={
            <p>
              In exclusive mode, GST is added on top of the base amount. In inclusive mode,
              GST is already included in the total, and we extract it. The common GST rates in India are
              0%, 3%, 5%, 12%, 18%, and 28%.
            </p>
          }
        />
      </div>
    </CalculatorLayout>
  );
}
