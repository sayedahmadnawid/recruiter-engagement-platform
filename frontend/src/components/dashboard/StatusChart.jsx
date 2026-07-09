export default function StatusChart({ stats }) {
  const chartItems = [
    { label: "New", count: stats.new, color: "bg-blue-500" },
    { label: "Contacted", count: stats.contacted, color: "bg-gray-400" },
    { label: "Interviewing", count: stats.interviewing, color: "bg-amber-500" },
    { label: "Offer", count: stats.offer, color: "bg-emerald-500" },
    { label: "Hired", count: stats.hired, color: "bg-green-600" },
    { label: "Rejected", count: stats.rejected, color: "bg-rose-500" },
  ];

  const maxCount = Math.max(...chartItems.map((item) => item.count), 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
        Leads Distribution
      </h3>
      <div className="space-y-4">
        {chartItems.map((item) => {
          const percentage = (item.count / maxCount) * 100;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-gray-600">
                <span>{item.label}</span>
                <span className="font-semibold text-gray-900">
                  {item.count}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
