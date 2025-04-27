import React from 'react';
import { SignUp } from '@clerk/clerk-react';
const Register = () => {


  return (
     <div className='pt-[100px] pb-[120px] flex justify-center m-3'>
          <SignUp signInUrl='/login'/>
    </div>
  )
}

export default Register
