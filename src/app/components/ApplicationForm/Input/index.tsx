"use client";
import React from "react";
type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
};

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  textarea = false,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value ?? ""} // <-- Always a string
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ""} // <-- Always a string
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
    </div>
  );
}
