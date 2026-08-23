import { useEffect, useState } from "react";
import { getDashboardStats } from "../features/leads/services/leadService";
import DashboardStats from "../components/dashboard/DashboardStats";
import StatusChart from "../components/dashboard/StatusChart";
import RecentLeads from "../components/dashboard/RecentLeads";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed executing aggregated dashboard load:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-2 text-gray-400 text-sm">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-2" />
          <span>Assembling metrics canvas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Panel banner block */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, Sayed</p>
      </div>

      {/* Aggregate Cards Layout Section */}
      {dashboardData && <DashboardStats stats={dashboardData} />}

      {/* Data Visuals and Sidebar Dual Grids */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <StatusChart stats={dashboardData} />
          </div>
          <div className="md:col-span-1">
            <RecentLeads leads={dashboardData.recent_leads} />
          </div>
        </div>
      )}
    </div>
  );
}
