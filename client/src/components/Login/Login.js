import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { LoginForm, LoginDiv, AppButton } from "./Login.styles";
import { loginSubmitRequest } from "./Login.request";
import Alert from "@mui/material/Alert";

const Login = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [target]: value });
  };

  return (
    <LoginDiv>
      <h2>Login:</h2>
      <LoginForm
        onSubmit={(e) =>
          loginSubmitRequest(e, loginForm, onLogin, setErrors, setLoginForm)
        }
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          type="text"
          required
          value={loginForm.username}
          onChange={handleChange}
        />
        <TextField
          name="password"
          type="password"
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={loginForm.password}
          onChange={handleChange}
        />
        <AppButton color="secondary" type="submit" variant="contained">
          Login
        </AppButton>
        {errors &&
          errors.map((err) => <Alert severity="error">{err.error}</Alert>)}
      </LoginForm>
      <Link to="/create-account">Don't have an account</Link>
    </LoginDiv>
  );
};

export default Login;
