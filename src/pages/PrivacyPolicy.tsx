import { useSeo } from '@/hooks/useSeo';
import LegalPageLayout from '@/components/LegalPageLayout';

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy',
    description: 'Read the MoneyCalc privacy policy. Learn how we handle your data and protect your privacy.',
    path: '/privacy-policy',
  });

  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">1. Introduction</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            MoneyCalc (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a free financial calculator website.
            We respect your privacy and are committed to protecting your personal data.
            This privacy policy explains how we collect, use, and protect your information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">2. Information We Collect</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            MoneyCalc does not require you to create an account or log in. Our calculators run
            entirely in your browser. We do not store the values you enter into calculators.
            We may collect anonymous usage data such as page views, browser type, and device
            information through analytics services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">3. Cookies</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            We may use cookies and similar technologies to improve your browsing experience,
            analyze website traffic, and serve relevant advertisements. You can control
            cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">4. Third-Party Advertising</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            We may display advertisements from third-party networks such as Google AdSense.
            These networks may use cookies to serve ads based on your prior visits to this
            and other websites. We do not control the data collection practices of these
            third parties. Please review their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">5. Data Security</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            We take reasonable measures to protect your data. Since we do not collect or store
            personal financial data, the risk of data exposure is minimal. All calculations
            are performed locally in your browser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">6. Children&apos;s Privacy</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Our website is not directed at children under 13 years of age. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">7. Changes to This Policy</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted
            on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900">8. Contact Us</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            If you have any questions about this privacy policy, please contact us at
            support@moneycalc.in.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
