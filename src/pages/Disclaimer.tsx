import { useSeo } from '@/hooks/useSeo';
import LegalPageLayout from '@/components/LegalPageLayout';

export default function Disclaimer() {
  useSeo({
    title: 'Disclaimer',
    description: 'Read the MoneyCalc disclaimer. Our financial calculators are for informational purposes only and not professional advice.',
    path: '/disclaimer',
  });

  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">General Disclaimer</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            The information and calculators provided on MoneyCalc are for general informational and
            educational purposes only. All calculations are estimates based on the inputs you provide
            and standard mathematical formulas. They do not account for all real-world factors that may
            affect your actual financial outcomes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Not Financial Advice</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Nothing on this website constitutes financial, investment, tax, legal, or professional
            advice. You should consult a qualified financial advisor, tax consultant, or legal
            professional before making any financial decisions. MoneyCalc is not responsible for
            any decisions made based on the results of our calculators.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Tax Calculations</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Our Income Tax Calculator is based on the tax slabs and rules applicable for FY 2024-25.
            Tax laws are subject to change. Actual tax liability may differ based on your specific
            circumstances, additional deductions, surcharges, and other factors not covered by
            this calculator. Always verify with the Income Tax Department or a tax professional.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Investment Returns</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Our SIP and compound interest calculators use assumed rate of returns for illustration
            purposes only. Mutual fund investments are subject to market risks. Actual returns
            may be higher or lower than the assumed rates. Past performance does not guarantee
            future results.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Loan Calculations</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            EMI and loan eligibility calculations are estimates. Actual loan amounts, interest rates,
            and EMIs are determined by the lending bank or financial institution based on their
            criteria, including your credit score, income, and other factors.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Accuracy of Results</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            While we use standard mathematical formulas for all calculations, we do not guarantee
            that results are free from errors. We are not liable for any losses or damages
            resulting from the use of our calculators.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">External Links</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            MoneyCalc may contain links to external websites. We are not responsible for the
            accuracy or reliability of information on these external sites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">Contact</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            For questions about this disclaimer, contact us at support@moneycalc.in.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
