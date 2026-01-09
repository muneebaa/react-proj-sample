import React, { type InputHTMLAttributes } from 'react';

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-2 text-text-primary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input-base ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-error">{error}</p>}
      {helperText && !error && (
        <p className="text-text-secondary text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default CommonInput;

