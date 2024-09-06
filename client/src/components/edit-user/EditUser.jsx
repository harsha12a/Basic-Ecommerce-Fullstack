import './EditUser.css'
import { useContext } from 'react'
import { UserLoginContext } from '../../contexts/userLoginContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
function EditUser() {
    let {curr,setcurr,seterr,setstat,token}=useContext(UserLoginContext)
    let {register,handleSubmit,setValue,formState:{errors}}=useForm()
    let navigate=useNavigate()
    async function onsave(obj){
        let res=await fetch('https://ecommerce-api-six-hazel.vercel.app//user-api/updation',{
            method:"PUT",
            headers:{
              "Content-Type":"application/json",
              "Authorization":  `Bearer ${token}`
            },
            body:JSON.stringify({name:curr.username,update:obj})
        })
        let data=await res.json()
        if(data.message==="User updated"){
            setcurr(obj)
            navigate('/user-profile')
        }
        else if(data.message==="token expired.Plz relogin to continue"){
          setcurr({})
          setstat(false)
          seterr('Expired... Please relogin to continue')
          navigate('/login')
        }
    }
  return (
    <div>
        <div className='row'>
        <div className='col-11 col-sm-10 col-md-6 mx-auto'>
          <form className='mx-auto mt-5 bg-light p-3' onSubmit={handleSubmit(onsave)}>
            <div className="mb-3">
              <label className='form-label' htmlFor="username">Username</label>
              <input className='form-control' type="text" {...register('username',{required:true})} value={setValue('username',curr?.username)} id="username" />
              {errors.username?.type==='required' && <p className='text-danger'>*Username is required</p>}
            </div>
            <div className="mb-3">
              <label className='form-label' htmlFor="password">Password</label>
              <input className='form-control' type="password" {...register('password',{required:true})} value={setValue('password',curr?.password)} disabled id="password" />
              {errors.password?.type==='required' && <p className='text-danger'>*Password is required</p>}
            </div>
            <div className="mb-3">
              <label className='form-label' htmlFor="email">Email</label>
              <input className='form-control' type="email" {...register('email',{required:true})} value={setValue('email',curr?.email)} id="email" />
              {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact number</label>
              <input type="number" {...register('contact',{required:true})} value={setValue('contact',curr?.contact)} id="contact" className="form-control" />
              {errors.contact?.type==="required" && <p className='text-danger'>*Contact number is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="profile" className="form-label">Paste profile img url</label>
              <input type="url" {...register('profile',{required:true})} id="profile" disabled value={setValue('profile',curr?.profile)} className="form-control" />
              {errors.profile?.type==="required" && <p className='text-danger'>*Profile url is required</p>}
            </div>
            <button type="submit" className='btn btn-success'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser