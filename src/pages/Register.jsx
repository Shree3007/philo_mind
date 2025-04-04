import React, { useEffect } from 'react';
import { SignUp, useUser } from '@clerk/clerk-react';
import axios from 'axios'; // Import Axios

const Register = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Send user ID to backend using Axios
      axios.post('http://localhost:5000/api/register', {
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
      })
      .then(response => {
        console.log('User registered successfully:', response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });

      // Optional: redirect to homepage
      // router.push('/');
    }
  }, [isSignedIn, user]);
  return (
     <div className='flex justify-center m-3'>
          <SignUp signInUrl='/login'/>
    </div>
  )
}

export default Register
