/**
 * PragatiPath — Public Layout
 * Layout shell providing the clean PublicNavbar and PublicFooter for public pages.
 */
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
