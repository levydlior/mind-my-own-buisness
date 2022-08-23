import React, { useState } from 'react'


type createProps = {
  onCreate: CallableFunction
}

function CreateAnAccount({ onCreate }: createProps) {

  const [createAccountForm, setCreateAccountForm] = useState({
    username: '',
    password: '',
    email: ''
  })

  const [errors, setErrors] = useState(null)

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
        })
      } else {
        r.json().then(err => {
          setErrors(err)
          console.log(errors)
        })
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='username' type='text' required placeholder='username' value={createAccountForm.username} onChange={handleChange} />
        <input name='password' type='password' required placeholder='password' value={createAccountForm.password} onChange={handleChange} />
        <input name='email' type='text' required placeholder='email' value={createAccountForm.email} onChange={handleChange} />
        <input type='submit' value='create account' />
      </form>
    </div>
  )
}

export default CreateAnAccount