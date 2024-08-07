import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import { UserLoginContext } from '../../contexts/userLoginContext'
import { MdDeleteOutline } from "react-icons/md";
function Cart() {
  let navigate=useNavigate()
  let {curr,setcurr,seterr,setstat,token}=useContext(UserLoginContext)
  let [cart,setCart]=useState([])

  async function getUserCart(){
    let res=await fetch(`http://localhost:3100/user-api/cart/${curr?.username}`,{
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    })
    let data=await res.json()
    setCart(data.payload?.products)
  }
  useEffect(()=>{
    getUserCart()
  },[])
  
  async function deleteitem(prodid){
    let res=await fetch(`http://localhost:3100/user-api/removeCart/${prodid}`,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "Authorization":  `Bearer ${token}`
      },
      body:JSON.stringify({username:curr.username})
    })
    let data=await res.json()
    if(data.message==='product removed from cart'){
      getUserCart()
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
      {
        cart?.length===0?(<p className='text-center display-1 text-danger'>Cart is empty</p>)
      :(
      <table className="table text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {
            cart?.map((item)=>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <button className="btn btn-danger"><MdDeleteOutline className='fs-4 text-danger' onClick={()=>deleteitem(item.id)}/></button>
              </tr>
            ))
          }
        </tbody>
      </table>
      )
    }
    </div>
  )
}

export default Cart