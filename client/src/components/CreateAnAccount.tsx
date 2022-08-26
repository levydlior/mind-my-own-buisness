import React, { useState } from 'react'
import { Link } from 'react-router-dom'


type createProps = {
  onCreate: CallableFunction
}

interface ErrorType {
  error: String
}

function CreateAnAccount({ onCreate }: createProps) {

  const [createAccountForm, setCreateAccountForm] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [errors, setErrors] = useState<ErrorType[]>([])



  function handleChange(e: any) {
    const target = e.target.name
    const value = e.target.value

    setCreateAccountForm({ ...createAccountForm, [target]: value })
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    fetch('/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(createAccountForm)
    }).then(r => {
      if (r.ok) {
        r.json().then(user => {
          onCreate(user)
          setErrors([])
        })
      } else {
        r.json().then(err => {
          setErrors(err.errors)
        })
      }
    })
  }

console.log(errors)
  function specificError(text: string) {
    let er;
    errors.forEach((error: any) => {
      if (error === text) {
        er = error;
        return er;
      }
    });
    if (er) {
      return (
        <p>{er}</p>
      );
    }
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='username' type='text' required placeholder='username' value={createAccountForm.username} onChange={handleChange} />
        {specificError('Username has already been taken')}
        <input name='password' type='password' required placeholder='password' value={createAccountForm.password} onChange={handleChange} />
        <input name='email' type='text' required placeholder='email' value={createAccountForm.email} onChange={handleChange} />
        {specificError('Email has already been taken')}
        <input type='submit' value='create account' />
      </form>
      <Link to='/login'>Already have an account</Link >
    </div>
  )
}

export default CreateAnAccount