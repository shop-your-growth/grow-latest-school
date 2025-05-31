'use client';

import { useRouter } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any auth tokens/data
    localStorage.removeItem('auth-token');
    // Redirect to login
    router.push('/pages/login');
  };

  return <AdminDashboard onLogout={handleLogout} />;
}
