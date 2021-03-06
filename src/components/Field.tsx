import React from "react";
import styled from "styled-components";

const FieldWrapper = styled.div<{ fullWidth: boolean }>`
  margin-bottom: 2rem;
  transition: background-color 0.2s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  display: flex;

  ${({ fullWidth }) => fullWidth && "width: 100%;"}

  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  .input {
    padding: 0.6rem 1rem;
    font-size: 14px;
    border: #faed27 1px solid;
    color: #faed27;
    transition: border-color 0.2s ease;
    caret-color: #faed27;
    background: transparent;
    flex-grow: 1;
  }

  .label {
    position: absolute;
    font-size: 14px;
    top: -8px;
    left: 16px;
    text-transform: capitalize;
    color: #faed27;
    background: #080808;
    padding: 0 8px;
  }
`;

interface FieldProps {
  value: any;
  label: string;
  onChange: (event: any) => void;
  readOnly: boolean;
  fullWidth?: boolean;
}

export const Filed: React.FC<FieldProps> = ({
  value,
  onChange,
  label,
  readOnly = false,
  fullWidth = true,
}) => {
  const props =
    typeof value === "number"
      ? {
          type: "number",
          onChange: (event: any) => onChange(parseFloat(event.target.value)),
        }
      : {
          type: "text",
          onChange: (event: any) => onChange(event.target.value),
        };

  return (
    <FieldWrapper fullWidth={fullWidth}>
      <input
        className="input"
        id={label}
        value={value}
        placeholder={label}
        readOnly={readOnly}
        {...props}
      />
      <label className="label" htmlFor={label}>
        <span className="hidden">{label}</span>
      </label>
    </FieldWrapper>
  );
};
