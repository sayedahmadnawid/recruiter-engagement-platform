export default function StatCard({
  title,
  value,
  colorClass = "bg-white border-gray-100 text-gray-900",
}) {
  return (
    <div
      className={`p-5 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${colorClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider opacity-75">
        {title}
      </p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}
