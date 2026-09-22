/**
 * PragatiPath — Public Layout
 * Layout shell providing the clean PublicNavbar and PublicFooter for public pages.
 */
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1320] font-sans antialiased flex flex-col selection:bg-[#FF5500]/20 selection:text-[#FF5500]">
      <PublicNavbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <PublicFooter />
    </div>
  );
}
