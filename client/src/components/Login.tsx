import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
        console.log(errors)
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
        <div>
            <form onSubmit={handleLoginSubmit}>
                <input name='username' type='text' required value={loginForm.username} onChange={handleChange} />
                <input name='password' type='password' required value={loginForm.password} onChange={handleChange} />
                <input type='submit' value='Login' />
                {errors ? errors.map(err => <p>{err.error}</p>) : null}
            </form>
            <Link to='/create-account'>Don't have an account</Link>
        </div>
    )
}

export default Login