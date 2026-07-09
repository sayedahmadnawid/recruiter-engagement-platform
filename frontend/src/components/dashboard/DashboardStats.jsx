import StatCard from "./StatCard";
export default function DashboardStats({ stats }) {
  // Response Rate Calculation = ((Responded + Interviewing + Offer + Hired) / Total Leads) * 100
  const totalInteractions =
    stats.responded + stats.interviewing + stats.offer + stats.hired;
  const responseRate =
    stats.total_leads > 0
      ? Math.round((totalInteractions / stats.total_leads) * 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* Top Row Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={stats.total_leads}
          colorClass="bg-indigo-600 text-white border-transparent"
        />
        <StatCard
          title="New Leads"
          value={stats.new}
          colorClass="bg-white text-gray-900 border-gray-100"
        />
        <StatCard
          title="Contacted"
          value={stats.contacted}
          colorClass="bg-white text-gray-900 border-gray-100"
        />
        <StatCard
          title="Interviewing"
          value={stats.interviewing}
          colorClass="bg-amber-50 border-amber-100 text-amber-800"
        />
      </div>

      {/* Bottom Row Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Offers Received"
          value={stats.offer}
          colorClass="bg-emerald-50 border-emerald-100 text-emerald-800"
        />
        <StatCard
          title="Hired"
          value={stats.hired}
          colorClass="bg-green-600 text-white border-transparent"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          colorClass="bg-rose-50 border-rose-100 text-rose-800"
        />
        <StatCard
          title="Response Rate"
          value={`${responseRate}%`}
          colorClass="bg-indigo-50 border-indigo-100 text-indigo-800"
        />
      </div>
    </div>
  );
}
