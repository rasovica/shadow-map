import styled from "styled-components";

export const SaveButton = styled.button`
  color: #faed27;
  border: 1px solid #faed27;
  padding: 4px 8px;
  width: fit-content;
  text-transform: uppercase;
  background: transparent;
`;

export const CloseButton = styled.button`
  color: #faed27;
  font-size: 20px;
  background: transparent;
  border: none;
  text-align: right;
  width: 100%;
  margin-bottom: 2rem;
  float: right;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
