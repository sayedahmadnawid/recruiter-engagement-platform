import LeadStatusBadge from "../../features/leads/components/LeadStatusBadge";

export default function RecentLeads({ leads = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
        Recent Inbound Leads
      </h3>
      <div className="divide-y divide-gray-50 max-h-[340px] overflow-y-auto pr-1">
        {leads.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No records cataloged yet.
          </p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
            >
              <div className="truncate">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {lead.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {lead.company || "No Company Specified"}
                </p>
              </div>
              <div className="flex-shrink-0 scale-90 origin-right">
                <LeadStatusBadge
                  status={lead.status}
                  onStatusChange={() => {}}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
