import React from 'react'
import './UserProfile.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserLoginContext} from '../../contexts/userLoginContext'
import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa6";
import {CiEdit} from "react-icons/ci"
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function UserProfile() {
  let curr = JSON.parse(sessionStorage.getItem('loginDetails'))
  let navigate=useNavigate()
  function edituser(){
    navigate('../edit-user')
  }
  return (
    <div>
      <div className="fle px-5">
        <div className='d-flex flex-column'>
          <img src={curr?.profile} alt="" width='150px' className='' />
          <button onClick={edituser} className='btn btn-warning'>Edit User - <CiEdit className='text-white fs-3'/></button>
        </div>
        <div>
          <p className='mt-5 fs-3 text-start'>Name - {curr?.username}</p>
          <p className='fs-4 mt-4'>Email - {curr?.email}</p>
          <p className="fs-5">Description - Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consequatur.</p>
        </div>
      </div>
      <ul className='nav fs-5 p-3 justify-content-around my-4'>
        <li className='nav-item'><Link className='nav-link text-info' to={'products'}><AiFillProduct className='mr-1 fs-3 text-warning' />Products</Link></li>
        <li className='nav-item'><Link className='nav-link text-info' to={'cart'}><FaCartPlus className='mr-1 fs-3 text-warning'/>Cart
          {/* <span className='mx-3 badge bg-dark'>{curr?.products?.length}</span> */}
        </Link></li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default UserProfile