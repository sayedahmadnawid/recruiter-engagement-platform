import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .all([
          api.get("/dashboard/stats"),
          api.get("/messages"),
          api.get("/recruiter-events"),
        ])
        .then(
          axios.spread((statsRes, messagesRes, eventsRes) => {
            setStats(statsRes.data);
            setMessages(messagesRes.data.data || messagesRes.data);
            setEvents(eventsRes.data.data || eventsRes.data);
          }),
        );
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard title="Messages" value={stats?.messages} />
        <StatCard title="Events" value={stats?.events} />
        <StatCard title="Message Events" value={stats?.message_events} />
      </div>

      {/* Messages */}
      <Section title="Messages">
        <Table
          headers={["Name", "Email", "Company", "Message"]}
          rows={messages.map((m) => [
            m.name,
            m.email,
            m.company || "-",
            m.message?.slice(0, 50),
          ])}
        />
      </Section>

      {/* Events */}
      <Section title="Recruiter Events">
        <Table
          headers={["Type", "Email", "Date"]}
          rows={events.map((e) => [
            e.event_type,
            e.email,
            new Date(e.created_at).toLocaleString(),
          ])}
        />
      </Section>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value ?? 0}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((h) => (
            <th key={h} className="text-left p-3 border">
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="p-3 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
