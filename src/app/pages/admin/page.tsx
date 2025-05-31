'use client';

import AdminDashboard from '@/app/pages/admin/AdminDashboard';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Simple logout - redirect to login
    router.push('/pages/simple-login');
  };

  // Show admin dashboard directly - no auth check for now
  return (
    <div className="min-h-screen">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
}
