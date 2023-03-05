import styled from "@emotion/styled";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export const ReceiptForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  padding: 0.5rem;
`;

export const ReceiptPopButton = styled(Button)`
  text-transform: none;
  margin-top: 0.5rem;
`;

export const TextFieldReceipt = styled(TextField)`
  margin-top: 0.5rem;
`;
