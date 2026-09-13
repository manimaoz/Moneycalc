import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import AdSlot from '@/components/AdSlot';

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description: 'Get in touch with the MoneyCalc team. We are here to answer your questions, hear your feedback, and help with any issues.',
    path: '/contact',
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-50 p-3">
            <Mail className="h-7 w-7 text-primary-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-3 text-gray-500">
            Have a question, suggestion, or feedback? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {submitted ? (
              <div className="card p-8 text-center animate-scale-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50">
                  <CheckCircle className="h-7 w-7 text-success-600" />
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-gray-900">Message Sent!</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for reaching out. We will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6">
                <div className="space-y-4">
                  <div>
                    <label className="input-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tell us what you think..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <MessageSquare className="h-6 w-6 text-primary-600" />
              <h3 className="mt-3 text-sm font-semibold text-gray-900">Feedback</h3>
              <p className="mt-1 text-xs text-gray-500">
                We welcome your suggestions for new calculators or improvements.
              </p>
            </div>
            <div className="card p-5">
              <Mail className="h-6 w-6 text-secondary-600" />
              <h3 className="mt-3 text-sm font-semibold text-gray-900">Email</h3>
              <p className="mt-1 text-xs text-gray-500">
                support@moneycalc.in
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdSlot variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
