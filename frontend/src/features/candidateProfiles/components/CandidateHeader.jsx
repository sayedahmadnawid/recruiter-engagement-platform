import Button from '../../../components/ui/Button';

export default function CandidateHeader({ candidate, onEdit, onViewResume }) {
  const initials = candidate.full_name
    ? candidate.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'C';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
            {initials}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{candidate.full_name || 'Unnamed Candidate'}</h1>
            <p className="text-lg font-medium text-indigo-600">{candidate.current_title || 'No Title Specified'}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-1">
              {candidate.location && <span>📍 {candidate.location}</span>}
              {candidate.email && <a href={`mailto:${candidate.email}`} className="hover:text-indigo-600">✉️ {candidate.email}</a>}
              {candidate.phone && <span>📞 {candidate.phone}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onEdit}>Edit Profile</Button>
          <Button variant="primary" onClick={onViewResume}>View Resume</Button>
        </div>
      </div>
    </div>
  );
}