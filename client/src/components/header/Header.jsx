import React from 'react'
import { BiSolidHome } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdInformationCircle } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { UserLoginContext } from '../../contexts/userLoginContext';
import { useContext } from 'react';
import './Header.css'
import {Link} from 'react-router-dom'
function Header() {
  let {logoutuser,stat}=useContext(UserLoginContext)
  let statUser=JSON.parse(sessionStorage.getItem('loginDetails'))===null?false:true
  return (
    <div>
      <div className='d-flex flex-wrap justify-content-around header'>
        <h1 className='text-danger p-3'><GiPerspectiveDiceSixFacesRandom className='fs-1 text-success'/>MyShop</h1>
        <ul className='nav fs-5 p-3'>
          <li className='nav-item'><Link className='nav-link text-white' to={''}><BiSolidHome className='mr-1 fs-3 text-warning' />Home</Link></li>
          <li className='nav-item'><Link className='nav-link text-white' to={'register'}><GiArchiveRegister className='mr-1 fs-3 text-warning'/>Register</Link></li>
          {statUser===false?(
          <li className='nav-item'><Link className='nav-link text-white' to={'login'}><CiLogin className='fs-3 text-warning'/>Login</Link></li>):(
            <li><Link className='nav-link text-white' onClick={logoutuser} to={'login'}><CiLogout className='fs-3 text-warning'/>Logout</Link></li>
          )}
          <li className='nav-item'><Link className='nav-link text-white' to={'about'}><IoMdInformationCircle className='fs-3 text-warning'/>About us</Link></li>
          {
            statUser===true&&
            <li className='nav-item'><Link className='nav-link text-white' to={'user-profile'}><CgProfile className='mr-1 fs-3 text-warning'/>Profile</Link></li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Header