import { Outlet } from 'react-router-dom';
import { NavbarAdmin } from '../../pages/admin/NavbarAdmin';

export function LayoutAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavbarAdmin />
      <main className="animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}