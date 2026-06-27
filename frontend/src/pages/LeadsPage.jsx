import { useEffect, useState } from "react";
import LeadForm from "../components/leads/LeadForm";
import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
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
      />
    </div>
  );
}
