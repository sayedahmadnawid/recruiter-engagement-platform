import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadTable({
  leads = [],
  onEdit,
  onDelete,
  onView,
  onStatusChange,
}) {
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
                  <div className="flex justify-end items-center gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => onView(lead)}
                      title="View Details"
                      className="p-1.5 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(lead)}
                      title="Edit"
                      className="p-1.5 text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 rounded-md transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>

                    {/* Trash/Delete Button */}
                    <button
                      onClick={() => onDelete(lead.id)}
                      title="Delete"
                      className="p-1.5 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100/80 rounded-md transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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
