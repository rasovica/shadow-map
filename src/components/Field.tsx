import React from "react";
import styled from "styled-components";

interface FieldProps {
  value: any;
  label: string;
  onChange: (event: any) => void;
}

const FieldWrapper = styled.div`
  margin-bottom: 2rem;
  transition: background-color 0.2s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  width: 100%;
  display: flex;

  .input {
    padding: 0.6rem 1rem;
    font-size: 1rem;
    border: #faed27 1px solid;
    color: #faed27;
    transition: border-color 0.2s ease;
    caret-color: #faed27;
    background: transparent;
    flex-grow: 1;
  }

  .label {
    position: absolute;
    top: -8px;
    left: 16px;
    text-transform: capitalize;
    color: #faed27;
    background: #080808;
    padding: 0 8px;
  }
`;

export const Filed: React.FC<FieldProps> = ({ value, onChange, label }) => {
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
    <FieldWrapper>
      <input
        className="input"
        id={label}
        value={value}
        placeholder={label}
        {...props}
      />
      <label className="label" htmlFor={label}>
        <span className="hidden">{label}</span>
      </label>
    </FieldWrapper>
  );
};
