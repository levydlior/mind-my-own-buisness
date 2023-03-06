import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreateForm,
  AccountDiv,
  TextFieldCreateAccount,
} from "./CreateAnAccount.styles";
import { AppButton } from "../Login/Login.styles";
import { handleCreateAccountSubmit } from "./CreateAnAccount.request";
import { Alert } from "@mui/material";

const CreateAnAccount = ({ onCreate }) => {
  const [createAccountForm, setCreateAccountForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setCreateAccountForm({ ...createAccountForm, [target]: value });
  };

  const renderSpecificError = (text) => {
    let currentError = undefined;
    errors.forEach((error) => {
      if (error === text) {
        currentError = error;
        return currentError;
      }
    });
    if (currentError) {
      return <Alert severity="error">{currentError}</Alert>;
    }
  };

  return (
    <AccountDiv>
      <h2>Create An Account:</h2>
      <CreateForm
        onSubmit={(e) =>
          handleCreateAccountSubmit(e, createAccountForm, onCreate, setErrors)
        }
      >
        <TextFieldCreateAccount
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          type="text"
          required
          value={createAccountForm.username}
          onChange={handleChange}
        />
        {renderSpecificError("Username has already been taken")}
        <TextFieldCreateAccount
          name="password"
          type="password"
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={createAccountForm.password}
          onChange={handleChange}
        />
        <TextFieldCreateAccount
          name="email"
          type="text"
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={createAccountForm.email}
          onChange={handleChange}
        />
        {renderSpecificError("Email has already been taken")}
        <AppButton color="secondary" type="submit" variant="contained">
          Create Account
        </AppButton>
      </CreateForm>
      <Link to="/login">Already have an account</Link>
    </AccountDiv>
  );
};

export default CreateAnAccount;
