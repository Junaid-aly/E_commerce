import React from 'react';
import { useForm } from 'react-hook-form';
import { use_Auth } from '../use_Auth';
import { Link } from 'react-router-dom';

import Hexagon from "../../../Images/background/Hexagon.svg"
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
 const {onSubmit} = use_Auth()
  
  return (
    <div className="flex items-center justify-center min-h-screen " style={{backgroundImage:`url(${Hexagon})`,backgroundSize:"100vw 100vh" , backgroundRepeat:"no-repeat", }}>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-md w-full bg-gray-800/50 backdrop-blur-lg shadow-md rounded-lg">
        
        {/* Username Field */}  <h1 className='text-center text-white text-lg'>Register form</h1>
        <div className="flex flex-col">
       
          <label htmlFor="displayName" className="mb-2 text-sm font-medium text-white">Username</label>
          <input 
            id="displayName"
            {...register("displayName", { required: "Username is required" })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
          />
          {errors.displayName && <span className="text-red-500 text-sm">{errors.displayName.message}</span>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-white">Email</label>
          <input 
            id="email"
            {...register("email", { 
              required: "Email is required", 
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address"
              }
            })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm font-medium text-white">Password</label>
          <input 
            id="password"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div className="order-2 md:order-3 flex flex-wrap items-center justify-between gap-4">

      
        <button 
          type="submit"
          className="w-28 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
        <Link to="/login">
      <button className="w-32 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Login
      </button>
    </Link>
        </div>
      </form>
    </div>
  )
}

export default Register;
