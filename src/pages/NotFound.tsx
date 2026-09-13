import { Link } from 'react-router-dom';
import { Home, Calculator } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';

export default function NotFound() {
  useSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    path: '/404',
  });

  return (
    <div className="container-app flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-primary-600">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-gray-500">
          The page you are looking for might have been moved or deleted.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link to="/calculators" className="btn-secondary">
            <Calculator className="h-4 w-4" /> Browse Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
