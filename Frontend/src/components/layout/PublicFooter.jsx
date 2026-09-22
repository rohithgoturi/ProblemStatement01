/**
 * PragatiPath — Public Website Footer (Clienter-inspired)
 * Deep navy/near-black background, warm stone typography, orange accents.
 */
import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1320] text-stone-300 border-t border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Logo size="md" variant="white" to="/" />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              PragatiPath connects infrastructure project schedules with real site progress reports so planners and engineers can see what is actually happening.
            </p>
            <p className="text-xs text-stone-500">
              Civil & Infrastructure Project Management · Planning-to-Execution Layer
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About PragatiPath
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Product & Legal Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Access & Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-[#FF5500] font-bold hover:text-[#FF7733] transition-colors"
                >
                  Get Started (Login) →
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {currentYear} PragatiPath. All rights reserved.</p>
          <p>
            Designed for Civil Infrastructure Engineers, Project Planners & Site Supervisors.
          </p>
        </div>
      </div>
    </footer>
  );
}
