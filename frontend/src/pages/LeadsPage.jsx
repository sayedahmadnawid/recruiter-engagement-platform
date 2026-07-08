import { useEffect, useState } from "react";
import LeadForm from "../components/leads/LeadForm";
import { STATUS_OPTIONS } from "../constants/leads"; // Importing your single source of truth
import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
  updateLeadStatus,
} from "../services/leadService";
import LeadTable from "../components/leads/LeadTable";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, [searchTerm, statusFilter, currentPage]);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const params = {
        search: searchTerm,
        status: statusFilter,
        page: currentPage,
      };

      const response = await getLeads(params);

      // Laravel paginate metadata maps results to data key
      setLeads(response.data || []);
      setPaginationData({
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total,
      });
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLead = async (leadData) => {
    try {
      await createLead(leadData);
      await loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
  };

  const handleUpdateLead = async (leadData) => {
    try {
      await updateLead(editingLead.id, leadData);
      setEditingLead(null);
      await loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;

    try {
      await deleteLead(id);
      await loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const originalLeads = [...leads];

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead,
      ),
    );

    try {
      await updateLeadStatus(leadId, newStatus);
    } catch (error) {
      console.error("Status update failed:", error);
      setLeads(originalLeads);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Form Area */}
      <LeadForm
        initialData={editingLead}
        onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
        onCancel={() => setEditingLead(null)}
      />

      {/* Control Panel: Search & Filtering Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-8">
        <h2 className="text-lg font-bold text-gray-900">Lead Database</h2>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Dynamic Global Input Search Box */}
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page context back to 1
            }}
            className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />

          {/* Dynamic Global Dropdown Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset page context back to 1
            }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer text-gray-700"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section with Opacity loading feedback */}
      <div
        className={
          isLoading
            ? "opacity-50 pointer-events-none transition-opacity duration-150"
            : "transition-opacity duration-150"
        }
      >
        <LeadTable
          leads={leads}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Bottom Interface Pagination Control System */}
      {paginationData && paginationData.lastPage > 1 && (
        <div className="flex items-center justify-between border border-gray-100 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm">
          <div className="text-sm text-gray-700">
            Showing page{" "}
            <span className="font-semibold">{paginationData.currentPage}</span>{" "}
            of <span className="font-semibold">{paginationData.lastPage}</span>
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1.5 border text-sm font-medium rounded-md bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              disabled={currentPage === paginationData.lastPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1.5 border text-sm font-medium rounded-md bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
