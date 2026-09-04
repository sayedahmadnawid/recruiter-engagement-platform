import { useState } from "react";
import LeadForm from "../components/LeadForm";
import { STATUS_OPTIONS } from "../../../constants/leads";
import LeadTable from "../components/LeadTable";
import { useLeads } from "../hooks/useLeads";
import { FileText, Sparkles, Database, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    leads,
    isLoading,
    editingLead,
    setEditingLead,
    paginationData,
    handleCreateLead,
    handleEditLead,
    handleViewLead,
    handleUpdateLead,
    handleDeleteLead,
    handleStatusChange,
  } = useLeads({ searchTerm, statusFilter, currentPage });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Left: explanation */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              What happens after you upload
            </h2>
            <p className="text-sm text-gray-600">
              Your resume is automatically processed in the background — no
              manual data entry required.
            </p>
          </div>

          <div className="space-y-5">
            <PipelineStep
              icon={FileText}
              title="Text is extracted"
              description="The uploaded resume is queued and parsed to pull out raw text content."
            />
            <PipelineStep
              icon={Sparkles}
              title="Fields are structured"
              description="AI identifies name, title, skills, experience, and education from the raw text."
            />
            <PipelineStep
              icon={Database}
              title="Profile is stored"
              description="The structured data is saved as a candidate profile linked to this lead."
            />
            <PipelineStep
              icon={Search}
              title="Made searchable"
              description={
                <>
                  A vector embedding is generated so this candidate can be found
                  by{" "}
                  <Link
                    to="/rag-search"
                    className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                  >
                    semantic search
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="md:col-span-3">
          <LeadForm
            initialData={editingLead}
            onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
            onCancel={() => setEditingLead(null)}
          />
        </div>
      </div>

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
              setCurrentPage(1);
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
          onView={handleViewLead}
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
function PipelineStep({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3">
      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 h-fit shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
