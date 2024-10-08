import { UserLoginContext } from './userLoginContext'
import { useState } from 'react'
function UserLoginStore({children}) {
    let [curr,setcurr]=useState(null)
    let [stat,setstat]=useState(false)
    let [token,setToken]=useState('')
    let [err,seterr]=useState('')
    async function loginuser(obj){
        try{
            let res=await fetch('https://basic-ecommerce-fullstack-vwwt.vercel.app/user-api/login',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(obj)
                }
            )
            let data=await res.json()
            if(data.message==='login success'){
                setcurr(data.user)
                setstat(true)
                seterr('')
                localStorage.setItem('loginDetails',JSON.stringify(data.user))
                setToken(data.token)
            }
            else{
                seterr(data.message)
                setcurr({})
                setstat(false)
            }
        }catch(errs){
            seterr(errs.message)
        }
    }
    function logoutuser(){
        setcurr({})
        setstat(false)
        seterr('')
        localStorage.removeItem('loginDetails')
    }
  return (
    <UserLoginContext.Provider value={{loginuser,logoutuser,stat,setstat,err,seterr,curr,setcurr,token}}>
        {children}
    </UserLoginContext.Provider>
  )
}

export default UserLoginStore