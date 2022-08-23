import React, { useState } from 'react'

type loginProps = {
    onLogin: CallableFunction
}

function Login({ onLogin }: loginProps) {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState(null);


    function handleChange(e: any) {
        const target: string = e.target.name
        const value: string = e.target.value

        setLoginForm({ ...loginForm, [target]: value })
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
                    user => onLogin(user)
                )
            } else {
                r.json().then(err => {
                    setLoginForm({
                        username: '',
                        password: ''
                    })
                    setErrors(err)
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
            </form>
        </div>
    )
}

export default Login