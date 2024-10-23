// src/components/InputField.js

import React from 'react';

const InputField = ({ type, placeholder, value, onChange, readOnly = false, ref, ariaLabel }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      ref={ref}
      required
      aria-label={ariaLabel}
    />
  );
};

export default InputField;
