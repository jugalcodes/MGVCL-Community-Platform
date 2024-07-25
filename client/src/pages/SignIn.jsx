import { Button, Label, TextInput } from 'flowbite-react'
import { set } from 'mongoose';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import { Spinner } from 'flowbite-react';

import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {

  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //is there is space before username then "trim" will handle this
  };
  

  {/* ============================ HANDLES ON SUBMISSION AND MAIN SIGNIN FUNCTIONALITY ============================= */}
  const handleSubmit = async (e) => {
    e.preventDefault(); //when we are submitting the info then the page is refreshing so this avoids refreshing of the page

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please will in all details'));
    }
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
  
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };



  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7'>
        {/* FOR LEFT SIDE */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>

            {/* in this below it means we are using gradient from _ to right in which the left will be indigo then mid purple and at right it will be pink */}
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>MGVCL's</span>
            Blog
          </Link>
          <h1 className='text-2xl font-semibold mt-5'>
            Welcome to MGVCL Knowledge sharing Platform.
          </h1>
          <p className='text-md mt-5'>You can Sign-In here with your email and password Or with Google authorization</p>
        </div>


        {/* FOR RIGHT SIDE */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>

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

                ) : ('Sign In'
                )}
            </Button>

            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span>Don't Have an Account?</span>
            <Link to="/sign-up" className='text-blue-500' >
              Sign-Up
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
