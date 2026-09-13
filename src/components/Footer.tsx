import { Link } from 'react-router-dom';
import { Calculator, Mail, Heart } from 'lucide-react';
import { calculators } from '@/data/calculators';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-gray-900">
                Money<span className="text-primary-600">Calc</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Smart Financial Calculators. Simple Decisions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Calculators</h3>
            <ul className="space-y-2">
              {calculators.slice(0, 4).map((calc) => (
                <li key={calc.slug}>
                  <Link
                    to={`/calculators/${calc.slug}`}
                    className="text-sm text-gray-500 transition-colors hover:text-primary-600"
                  >
                    {calc.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Finance Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-gray-500 transition-colors hover:text-primary-600">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MoneyCalc. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-400">
            Made with <Heart className="h-3 w-3 fill-error-500 text-error-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
