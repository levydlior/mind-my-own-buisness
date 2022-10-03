import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";

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
justify-content: space-between;
height: 8rem;
align-items: center;
margin: 2rem;
`

type loginProps = {
    onLogin: CallableFunction
}

interface ErrorType {
    error: String
}

function Login({ onLogin }: loginProps) {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState<ErrorType[]>([])

    function handleChange(e: any) {
        const target: string = e.target.name
        const value: string = e.target.value

        setLoginForm({ ...loginForm, [target]: value })
    }

    if (errors) {
    }

    function handleLoginSubmit(e: React.SyntheticEvent) {
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
                <input name='username' type='text' required value={loginForm.username} onChange={handleChange} />
                <input name='password' type='password' required value={loginForm.password} onChange={handleChange} />
                <input type='submit' value='Login' />
                {errors ? errors.map(err => <p>{err.error}</p>) : null}
            </LoginForm>
            <Link to='/create-account'>Don't have an account</Link>
        </LoginDiv>
    )
}

export default Login