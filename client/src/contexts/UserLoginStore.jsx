import { UserLoginContext } from './userLoginContext'
import { useState } from 'react'
function UserLoginStore({children}) {
    let [curr,setcurr]=useState(null)
    let [stat,setstat]=useState(false)
    let [token,setToken]=useState('')
    let [err,seterr]=useState('')
    async function loginuser(obj){
        try{
            let res=await fetch('http://localhost:3100/user-api/login',
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
                sessionStorage.setItem('token',data.token)
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
        sessionStorage.removeItem('token')
    }
  return (
    <UserLoginContext.Provider value={{loginuser,logoutuser,stat,setstat,err,seterr,curr,setcurr,token}}>
        {children}
    </UserLoginContext.Provider>
  )
}

export default UserLoginStore