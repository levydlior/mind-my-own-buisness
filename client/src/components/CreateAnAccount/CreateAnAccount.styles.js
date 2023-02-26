import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

export const AccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 22rem;
  align-items: center;
  margin: 2rem;
`;

export const TextFieldCreateAccount = styled(TextField)`
  margin: 1rem;
`;
