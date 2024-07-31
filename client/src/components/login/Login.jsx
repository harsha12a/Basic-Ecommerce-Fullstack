import './Login.css'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { UserLoginContext } from '../../contexts/userLoginContext'
import { useNavigate,Link } from 'react-router-dom'
import { useEffect } from 'react'
function Login() {
  let navigate=useNavigate()
  let {register,handleSubmit,formState:{errors}}=useForm()
  let {loginuser,stat,err}=useContext(UserLoginContext)
  function onuserlogin(obj){
    loginuser(obj)
  }
  useEffect(()=>{
    if(stat===true){
      navigate('/user-profile')
    }
  },[stat])

  return (
    <div>
      <h1 className='text-center'>Login</h1>
            {
              err?.length!==0&&<h2 className='text-danger text-center'>{err}</h2>
            }
      <div className='col-11 col-sm-10 col-md-6 mx-auto'>
        <form action="" onSubmit={handleSubmit(onuserlogin)} className='mx-auto mt-5 bg-light p-3'>
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
            <button className='btn btn-success'>Login</button>
        </form>
        <div className='text-center mt-4 fs-4'>Not registered yet?
          <Link to={'../register'} className='text-decoration-none'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login