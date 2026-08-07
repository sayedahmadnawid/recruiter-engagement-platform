export default function CandidateSkills({ skills = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Skills ({skills.length})</h2>
      {skills.length === 0 ? (
        <p className="text-gray-400 text-sm">No skills extracted.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}