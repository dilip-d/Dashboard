import React from "react";

interface InputBlockProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  isTextArea?: boolean;
}

const InputBlock: React.FC<InputBlockProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  isTextArea = false,
}) => (
  <div className="mb-4">
    <label className="block mb-1">{label}:</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border rounded p-2 w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border rounded p-2 w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    )}
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputBlock;
