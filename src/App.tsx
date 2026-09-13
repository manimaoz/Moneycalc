import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Calculators from '@/pages/Calculators';
import Guides from '@/pages/Guides';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import Disclaimer from '@/pages/Disclaimer';
import NotFound from '@/pages/NotFound';
import EMICalculator from '@/components/calculators/EMICalculator';
import SIPCalculator from '@/components/calculators/SIPCalculator';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import FDCalculator from '@/components/calculators/FDCalculator';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import GSTCalculator from '@/components/calculators/GSTCalculator';
import SimpleInterestCalculator from '@/components/calculators/SimpleInterestCalculator';
import IncomeTaxCalculator from '@/components/calculators/IncomeTaxCalculator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/emi-calculator" element={<EMICalculator />} />
          <Route path="/calculators/sip-calculator" element={<SIPCalculator />} />
          <Route path="/calculators/loan-calculator" element={<LoanCalculator />} />
          <Route path="/calculators/fd-calculator" element={<FDCalculator />} />
          <Route path="/calculators/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/calculators/gst-calculator" element={<GSTCalculator />} />
          <Route path="/calculators/simple-interest-calculator" element={<SimpleInterestCalculator />} />
          <Route path="/calculators/income-tax-calculator" element={<IncomeTaxCalculator />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
