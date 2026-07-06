// components/ui/SelectField.jsx
export default function SelectField({
  label,
  name,
  value,
  onChange,
  required = false,
  options = [],
  ...props
}) {
  const selectClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 shadow-sm cursor-pointer";
  const labelClasses = "block text-xs font-semibold text-gray-700 uppercase tracking-wider";

  return (
    <div>
      <label htmlFor={name} className={labelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClasses}
        required={required}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}