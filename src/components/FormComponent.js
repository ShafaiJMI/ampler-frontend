export const Field = ({ label, name, placeholder, ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        {...rest}
      />
    </div>
  );
  
export const TextField = ({ label, name, placeholder, ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        {...rest}
      />
    </div>
  );
  
export const NumberField = ({ label, name, placeholder, ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        {...rest}
      />
    </div>
  );

export const Button = ({ children, onClick, className, ...rest }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
  
export const DynamicFieldGroup = ({ fields, register, onAdd, onRemove }) => (
    <div>
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-4 gap-4">
          <input
            {...register(`fields[${index}].name`)}
            placeholder="Name"
            className="border border-gray-300 rounded-md shadow-sm"
          />
          <input
            {...register(`fields[${index}].value`)}
            placeholder="Value"
            className="border border-gray-300 rounded-md shadow-sm"
          />
          <button onClick={() => onRemove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={onAdd}>Add Field</button>
    </div>
  );

export const MiscellaneousFields = ({ fields, onChange }) => (
    <div>
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name={`field_${index}_name`}
            placeholder="Field Name"
            className="border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            name={`field_${index}_value`}
            placeholder="Field Value"
            className="border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onChange(index, 'value', e.target.value)}
          />
        </div>
      ))}
    </div>
  );