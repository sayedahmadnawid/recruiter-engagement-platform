import SelectField from "../../../components/ui/SelectField";
import { STATUS_OPTIONS } from "../../../constants/leads";

export default function LeadStatusBadge({ status, onStatusChange }) {
  const normalizedStatus = status?.toLowerCase() || "new";

  const getBadgeStyles = (state) => {
    switch (state) {
      case "hired":
      case "offer":
        return "bg-green-50 text-green-700 border-green-200 focus:ring-green-500";
      case "contacted":
      case "responded":
      case "interviewing":
        return "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200 focus:ring-red-500";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200 focus:ring-gray-500";
    }
  };

  return (
    <div className="inline-block">
      <SelectField
        name="status"
        value={normalizedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-150 ${getBadgeStyles(normalizedStatus)}`}
        options={STATUS_OPTIONS}
      />
    </div>
  );
}
