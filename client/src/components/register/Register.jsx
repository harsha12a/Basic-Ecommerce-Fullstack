import React, { useState } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom'
function Register() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [err,seterr]=useState('')
  let navigate=useNavigate()
  async function handleform(obj){
    try{
      let res=await fetch('https://ecommerce-api-six-hazel.vercel.app/user-api/user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      })
      let data=await res.json()
      if(data.message==="New user created"){
          navigate('/login')
      }
      else{
        seterr(data.message)
      }
    }
    catch(a){
      console.log(a);
      
      seterr(a.message)
    }
  }
  return (
    <div>
      <p className="display-3 text-center">User Registration</p>
      <div className='row'>
        <div className='col-11 col-sm-10 col-md-6 mx-auto'>
          {err?.length!==0&&<h2 className='text-danger text-center'>{err}</h2>}
          <form className='mx-auto mt-5 bg-light p-3' onSubmit={handleSubmit(handleform)}>
            <div className="mb-3">
              <label className='form-label' htmlFor="username">Username</label>
              <input className='form-control' type="text" {...register('username',{required:true})} id="username" />
              {errors.username?.type==='required'&& <p className='text-danger'>*Username is required</p>}
            </div>
            <div className="mb-3">
              <label className='form-label' htmlFor="password">Password</label>
              <input className='form-control' type="password" {...register('password',{required:true})} id="password" />
              {errors.password?.type==='required'&& <p className='text-danger'>*Password is required</p>}
            </div>
            <div className="mb-3">
              <label className='form-label' htmlFor="email">Email</label>
              <input className='form-control' type="email" {...register('email',{required:true})} id="email" />
              {errors.email?.type==='required'&& <p className='text-danger'>*Email is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact number</label>
              <input type="number" {...register('contact',{required:true})} id="contact" className="form-control" />
              {errors.contact?.type==='required'&& <p className='text-danger'>*Contact number is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="profile" className="form-label">Paste profile img url</label>
              <input type="url" {...register('profile',{required:true})} id="profile" className="form-control" />
              {errors.profile?.type==='required'&& <p className='text-danger'>*Profile image is required</p>}
            </div>
            <button type="submit" className='btn btn-success'>Register</button>
          </form>
          <div className='text-center mt-3 fs-4'>Already has an account?<Link className='text-decoration-none' to='/login'>Login</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Register