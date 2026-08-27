export default function InputField({
  label,
  name,
  error,
  value,
  onChange,
  required = false,
  textarea = false,
  ...props
}) {
  const inputClasses = "w-full rounded-md px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
  const labelClasses =
    "block text-xs font-semibold text-gray-700 uppercase tracking-wider";

  return (
    <div>
      <label htmlFor={name} className={labelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {textarea ? (
        <div className="w-full">
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${inputClasses} resize-none`}
            {...props}
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      ) : (
        <div className="w-full">
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${inputClasses} ${
              error
                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
            required={required}
            {...props}
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
