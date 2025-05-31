import { useEffect, useState } from 'react';

// Define proper types
interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

const Tenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  // Enhanced tenant management
  useEffect(() => {
    // TODO: Fetch tenants from API
    const fetchTenants = async () => {
      try {
        // Mock data for now
        const mockTenants: Tenant[] = [
          {
            id: '1',
            name: 'Demo School District',
            slug: 'demo-school',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ];
        setTenants(mockTenants);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tenant Management</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Add Tenant</button>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading tenants...</span>
          </div>
        ) : (
          <>
            <p className="text-gray-600">Tenant management interface will be implemented here.</p>
            <p className="text-sm text-gray-500 mt-2">Current tenants: {tenants.length}</p>

            {tenants.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Active Tenants:</h3>
                <ul className="space-y-2">
                  {tenants.map((tenant) => (
                    <li key={tenant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>{tenant.name} ({tenant.slug})</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                        tenant.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tenant.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tenants;
