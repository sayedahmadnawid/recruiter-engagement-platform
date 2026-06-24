import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

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

  return (
    <div>
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
