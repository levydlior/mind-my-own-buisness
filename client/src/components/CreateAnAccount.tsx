import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "@emotion/styled";

const AccountDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 2rem;
`

const CreateForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 8rem;
align-items: center;
margin: 2rem;
`

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
    <AccountDiv>
      <h2>Create An Account:</h2>
      <CreateForm onSubmit={handleSubmit}>
        <input name='username' type='text' required placeholder='username' value={createAccountForm.username} onChange={handleChange} />
        {specificError('Username has already been taken')}
        <input name='password' type='password' required placeholder='password' value={createAccountForm.password} onChange={handleChange} />
        <input name='email' type='text' required placeholder='email' value={createAccountForm.email} onChange={handleChange} />
        {specificError('Email has already been taken')}
        <input type='submit' value='create account' />
      </CreateForm>
      <Link to='/login'>Already have an account</Link >
    </AccountDiv>
  )
}

export default CreateAnAccount