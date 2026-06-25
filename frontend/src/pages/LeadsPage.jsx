import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import LeadForm from "../components/leads/LeadForm";
import { createLead } from "../services/leadService";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const handleCreateLead = async (leadData) => {
    try {
      await createLead(leadData);
      await loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LeadForm onSubmit={handleCreateLead} />
      <h1>Leads</h1>

      <p>Total Leads: {leads.length}</p>

      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.name} - {lead.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
