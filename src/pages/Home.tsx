import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Smartphone, TrendingUp } from 'lucide-react';
import { calculators } from '@/data/calculators';
import { useSeo } from '@/hooks/useSeo';
import AdSlot from '@/components/AdSlot';

export default function Home() {
  useSeo({
    title: 'Smart Financial Calculators for India',
    description: 'Free online financial calculators for Indian users. Calculate EMI, SIP, FD, GST, income tax, compound interest, and more. Make smarter financial decisions.',
    path: '/',
  });

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-secondary-400 blur-3xl"></div>
        </div>
        <div className="container-app relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              100% Free &amp; No Sign-up Required
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Smart Financial Calculators.
              <br />
              <span className="text-secondary-300">Simple Decisions.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-100 sm:text-xl">
              Calculate your EMI, SIP returns, tax liability, GST, and more.
              Built for Indian users with \u20B9 INR formatting.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 active:scale-[0.98]"
              >
                Explore Calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                Finance Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-12">
        <div className="container-app grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: 'Instant Results', desc: 'Real-time calculations as you type. No waiting, no page reloads.' },
            { icon: Smartphone, title: 'Mobile-First Design', desc: 'Works perfectly on your phone, tablet, and desktop.' },
            { icon: TrendingUp, title: 'Accurate & Reliable', desc: 'Bank-grade formulas with clear breakdowns and explanations.' },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                <f.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900">All Calculators</h2>
            <p className="mt-2 text-gray-500">Eight powerful financial calculators at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.slug}
                  to={`/calculators/${calc.slug}`}
                  className="card card-hover group p-5"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${calc.bgColor}`}>
                    <Icon className={`h-6 w-6 ${calc.color}`} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-gray-900 group-hover:text-primary-600">
                    {calc.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{calc.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Try Now <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 pb-8">
        <div className="container-app">
          <AdSlot variant="horizontal" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-app">
          <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to take control of your finances?
            </h2>
            <p className="mt-3 text-primary-100">
              Start with any of our free calculators. No sign-up, no downloads, just answers.
            </p>
            <Link
              to="/calculators"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 active:scale-[0.98]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
