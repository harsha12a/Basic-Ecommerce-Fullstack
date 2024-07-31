import React from 'react'
import { FaAddressBook } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import './Footer.css'
function Footer() {
  return (
    <div className='d-flex justify-content-around bg-dark text-white p-4'>
      <div>
        <FaAddressBook className='fs-1 m-3'/>
        <h3>PVP SIT</h3>
        <h3>Vijayawada</h3>
      </div>
      <div>
      <IoIosContact className='fs-1 m-3'/>
        <h3>pvp@gmil.com</h3>
        <h3>99999999</h3>
      </div>
    </div>
  )
}

export default Footer