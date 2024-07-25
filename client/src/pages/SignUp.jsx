import { Button, Label, TextInput } from 'flowbite-react'
import { set } from 'mongoose';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //is there is space before username then "trim" will handle this
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //when we are submitting the info then the page is refreshing so this avoids refreshing of the page

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill all the details")
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  }



  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7'>
        {/* for left side */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>

            {/* in this below it means we are using gradient from _ to right in which the left will be indigo then mid purple and at right it will be pink */}
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>MGVCL's</span>
            Blog
          </Link>
          <h1 className='text-2xl font-semibold mt-5'>
            Welcome to MGVCL Knowledge sharing Platform.
          </h1>
          <p className='text-md mt-5'>You can Sign-Up here with your email and password Or Google authorization</p>
        </div>


        {/* for right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <div>
                <Label value="Your Username" />
                <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
              </div>
              <div>
                <Label value="Your Email" />
                <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
              </div>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>

                ) : 'Sign Up'
              }
            </Button>

            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span>Have an Account?</span>
            <Link to="/sign-in" className='text-blue-500' >
              Sign-In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
