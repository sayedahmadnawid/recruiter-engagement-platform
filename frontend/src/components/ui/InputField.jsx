export default function InputField({
  label,
  name,
  value,
  onChange,
  required = false,
  textarea = false,
  ...props
}) {
  const inputClasses =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900";
  const labelClasses =
    "block text-xs font-semibold text-gray-700 uppercase tracking-wider";

  return (
    <div>
      <label htmlFor={name} className={labelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          required={required}
          {...props}
        />
      )}
    </div>
  );
}
