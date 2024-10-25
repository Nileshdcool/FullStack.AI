import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { getSubscriptionDetailsbyUserid } from '@/services/stripeService';

const ProfilePage: React.FC = () => {
  const { user } = useContext(AppContext); // Get logged-in user from context
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]); // Use the type for billing history
  const [lastLoginTime, setLastLoginTime] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.email) {
      const fetchBillingHistory = async () => {
        try {
          const response = await getSubscriptionDetailsbyUserid(user.email ?? "");
          setBillingHistory(response.results);
        } catch (error) {
          console.error('Error fetching billing history:', error);
        }
      };

      fetchBillingHistory();

      const lastSignInTime = user.metadata.lastSignInTime;
      setLastLoginTime(lastSignInTime ?? null);
    }
  }, [user]);

  const calculateSubscriptionStatus = (endDate: string) => {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(endDate);
    return subscriptionEndDate >= currentDate ? 'Active' : 'Expired';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold mt-4">{user?.displayName || 'User'}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <ul className="text-gray-700 mt-2">
            <li>Email: {user?.email}</li>
            <li>Phone: {user?.phoneNumber || 'Not provided'}</li>
            <li>Location: Not provided</li>
          </ul>
        </div>

        {/* Last Login Information */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Last login</h3>
          {lastLoginTime ? (
            <p>Last login: {new Date(lastLoginTime).toLocaleString()}</p>
          ) : (
            <p>Loading last login time...</p>
          )}
        </div>

        {/* Billing History */}
        <div className="mt-6 w-full">
          <h3 className="text-xl font-semibold mb-4">Billing History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left border">Subscription Type</th>
                  <th className="py-2 px-4 text-left border">Start Date</th>
                  <th className="py-2 px-4 text-left border">End Date</th>
                  <th className="py-2 px-4 text-left border">Payment Status</th>
                  <th className="py-2 px-4 text-left border">Subscription Status</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.SubscriptionType}</td>
                    <td className="border px-4 py-2">
                      {new Date(item.StartDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(item.EndDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{item.PaymentStatus}</td>
                    <td className="border px-4 py-2">
                      {calculateSubscriptionStatus(item.EndDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
