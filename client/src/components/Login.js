import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const LoginDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2rem;
`

const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 18rem;
align-items: center;
margin: 2rem;
`


function Login({onLogin}) {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    function handleChange(e) {
        const target = e.target.name
        const value  = e.target.value

        setLoginForm({ ...loginForm, [target]: value })
    }

    if (errors) {
    }

    function handleLoginSubmit(e) {
        e.preventDefault()

        fetch('/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(loginForm)
        }).then(r => {
            if (r.ok) {
                r.json().then(
                    user => {
                        onLogin(user)
                        setErrors([])
                    }
                )
            } else {
                r.json().then(err => {
                    setLoginForm({
                        username: '',
                        password: ''
                    })
                    setErrors([err])
                })
            }
        })
    }

    return (
        <LoginDiv>
            <h2>Login:</h2>
            <LoginForm onSubmit={handleLoginSubmit}>
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username' type='text' required value={loginForm.username} onChange={handleChange} />
                <TextField name='password' type='password' required id="outlined-basic" label="Password" variant="outlined" value={loginForm.password} onChange={handleChange} />
                <Button color="secondary"
                    sx={{ margin: '1rem', "text-transform": "none" }} type='submit' variant="contained" >Login</Button>
                {errors ? errors.map(err => <p>{err.error}</p>) : null}
            </LoginForm>
            <Link to='/create-account'>Don't have an account</Link>
        </LoginDiv>
    )
}

export default Login