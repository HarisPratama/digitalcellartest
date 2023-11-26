import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './styles.scss'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const res = await axios.post('/api/register', formData);
      setLoading(false)
      setResponse(res.data); // Handle successful registration
    } catch (err) {
      setLoading(false)
      setResponse(err.response.data); // Handle validation errors
    }
  };

  const responseMessage = () => {
    return Object.keys(response).map((key, i) => {
      if(key === 'errors') return (
        <div key={i} className='px-2 py-4 bg-red-600 rounded-md'>
          {Object.keys(response[key]).map(errKey => (
              <p className='text-white' key={errKey}>{response[key][errKey]}</p>
          ))}
        </div>
      )
      if(key === 'message') return (
        <div key={i} className='px-2 py-4 bg-green-600 rounded-md'>
          <p className='text-white'>{response[key]}</p>
        </div>
      )
    })
  }

  return (
    <div className='container mx-auto  h-screen flex flex-row justify-center items-start'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-auto'>
        <h1 className='font-bold text-xl'>Sign Up</h1>
        
        { responseMessage() }
        <div className='flex flex-col gap-2 w-72'>
          <label>Name</label>
          <input className="rounded-md py-2 px-2 bg-slate-200" type="text" name="name" value={name} onChange={handleChange} placeholder="Enter your name" />
        </div>
        <div className='flex flex-col gap-2 w-72'>
          <label>Email</label>
          <input className='rounded-md py-2 px-2 bg-slate-200' type="email" name="email" value={email} onChange={handleChange} />
        </div>
        <div className='flex flex-col gap-2 w-72'>
          <label>Password</label>
          <input className='rounded-md py-2 px-2 bg-slate-200' type="password" name="password" value={password} onChange={handleChange} />
        </div>
        <div className='w-72'>
          <button disabled={loading} className='bg-cyan-400 w-full h-10 rounded-md' type="submit">{loading ? "Loading..." : "Register"}</button>
        </div>

        <NavLink
          to="/login"
          className="underline"
        >
          Login
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
