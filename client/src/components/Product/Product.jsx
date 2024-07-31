import React from 'react'
import './Product.css'
import { useContext } from 'react'
import {UserLoginContext} from '../../contexts/userLoginContext'
import {useNavigate} from 'react-router-dom'
function Product(props) {
  let prod=props.x
  let navigate=useNavigate()
  let {curr,setcurr,seterr,setstat,token}=useContext(UserLoginContext)
  async function addToCart(obj) {
    let username=curr?.username
    let res=await fetch(`http://localhost:3100/user-api/addToCart/${username}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(obj)
    })
    let data=await res.json()
    console.log(data);
    if(data.message==='product added to cart'){
      navigate('/user-profile/cart')
    }
    else if(data.message==='token expired.Plz relogin to continue'){
      setcurr({})
      setstat(false)
      seterr('Expired... Please relogin to continue')
      navigate('/login')
    }
  }
  return (
    <div className='card text-center h-100 bg-light'>
      <div className="card-body d-flex flex-column justify-content-between">
        <img src={prod.thumbnail} alt="" />
        <p className="text-secondary fs-4">{prod.title}</p>
        <p className="fs-6 text-danger">${prod.price}</p>
        <p className="lead">{prod.description}</p>
        <p className="fs-3 text-warning">{prod.brand}</p>
        <button className="btn btn-success" onClick={()=>addToCart(prod)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Product