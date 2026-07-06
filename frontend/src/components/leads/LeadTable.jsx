import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadTable({ leads = [], onEdit, onDelete, onStatusChange }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 shadow-md bg-white my-12">
      <table className="w-full min-w-[800px] border-collapse text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 border-b border-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Company
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {leads.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-10 text-center text-gray-400 bg-gray-50/50"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4h16z"
                    />
                  </svg>
                  <span>No leads found. Start by adding a new lead.</span>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50/70 transition-colors duration-150"
              >
                {/* Name */}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {lead.name}
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {lead.email}
                </td>

                {/* Company */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {lead.company || <span className="text-gray-300">—</span>}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <LeadStatusBadge
                    status={lead.status}
                    onStatusChange={(newStatus) =>
                      onStatusChange(lead.id, newStatus)
                    }
                  />
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(lead)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1 rounded-md transition-colors duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100/80 px-3 py-1 rounded-md transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
