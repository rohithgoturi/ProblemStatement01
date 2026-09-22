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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Description (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <Logo size="md" variant="white" to="/" />
            </div>
            <p className="text-sm text-stone-300 leading-relaxed max-w-md">
              PragatiPath connects infrastructure project schedules with real site progress reports so planners and engineers can see what is actually happening.
            </p>
            <p className="text-xs text-stone-400">
              Civil & Infrastructure Project Management &middot; Planning-to-Execution Layer
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-stone-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-300 hover:text-white transition-colors">
                  About PragatiPath
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-300 hover:text-white transition-colors">
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-stone-300 hover:text-white transition-colors">
                  Help & Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-white transition-colors">
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
                  Get Started (Login) &rarr;
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-stone-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-stone-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Developer & Support
            </h4>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">
                  Developed by
                </span>
                <span className="text-white font-extrabold tracking-tight text-sm block mt-0.5">
                  TEAM OG DEVELOPERS
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">
                  Contact
                </span>
                <a
                  href="mailto:pragatipath6@gmail.com"
                  className="text-[#FF5500] hover:text-[#FF7733] font-bold transition-colors break-all block mt-0.5 text-xs"
                >
                  pragatipath6@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>&copy; {currentYear} PragatiPath. All rights reserved.</p>
          <div className="flex items-center gap-3 text-stone-400 text-xs">
            <span>Developed by <strong className="text-stone-200">TEAM OG DEVELOPERS</strong></span>
            <span>&bull;</span>
            <a href="mailto:pragatipath6@gmail.com" className="text-[#FF5500] hover:underline">
              pragatipath6@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
