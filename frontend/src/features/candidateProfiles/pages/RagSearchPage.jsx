import { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { Search, Loader2, User, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { searchCandidateById } from "../services/candidateProfileService";

export default function RagSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.trim().length < 3) {
      setError("Enter at least 3 characters to search.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchCandidateById(query);
      setResults(results);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Search Candidates</h1>
        <p className="text-gray-600 mt-2">
          Describe who you're looking for in plain language — skills,
          experience, role, location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <InputField
              name="query"
              placeholder="e.g. Senior Laravel developer with AWS experience in Charlotte"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </span>
            )}
          </Button>
        </div>

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </form>

      {results !== null && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {results.length} {results.length === 1 ? "match" : "matches"} found
          </p>

          {results.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No matching candidates found. Try rephrasing your search.
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CandidateCard({ candidate }) {
  const matchPercent = Math.round(candidate.score * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <Link
              to={`/leads/${candidate.lead_id}/profile`}
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {candidate.full_name}
            </Link>
            {candidate.current_title && (
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5" />
                {candidate.current_title}
              </p>
            )}
            {candidate.location && (
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {candidate.location}
              </p>
            )}
          </div>
        </div>

        <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
          {matchPercent}% match
        </span>
      </div>

      {candidate.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {candidate.skills.slice(0, 8).map((skill, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700"
            >
              {typeof skill === "string" ? skill : skill.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
