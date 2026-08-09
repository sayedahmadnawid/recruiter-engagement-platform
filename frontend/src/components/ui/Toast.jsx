import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed bottom-6 right-6 ${styles[type]} text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in`}
      role="alert"
    >
      <Icon size={18} />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
