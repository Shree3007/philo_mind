import React from 'react'
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className='flex justify-center m-3'>
      <SignIn/>
    </div>
  )
}

export default Login
