import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 18rem;
  align-items: center;
  margin: 2rem;
`;

export const AppButton = styled(Button)`
  margin: 1rem;
  text-transform: none;
`;
