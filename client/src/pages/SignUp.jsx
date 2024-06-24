import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      dispatch(signUpSuccess(data));
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-5 max-w-lg mx-auto shadow-xl mt-20 rounded-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='username'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='password'
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 focus:outline-none disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 justify-center my-3'>
        <p>Have an account?</p>
        <Link to='/sign-in' className='text-blue-700'>
          Sign in
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignUp;
