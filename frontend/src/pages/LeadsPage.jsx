import { useEffect, useState } from "react";
import LeadForm from "../components/leads/LeadForm";
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

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
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
    <div>
      <LeadForm
        initialData={editingLead}
        onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
        onCancel={() => setEditingLead(null)}
      />
      <LeadTable
        leads={leads}
        onEdit={handleEditLead}
        onDelete={handleDeleteLead}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
