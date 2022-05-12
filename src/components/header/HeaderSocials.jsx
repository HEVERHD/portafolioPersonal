import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {FaGithub,FaInstagramSquare} from "react-icons/fa"


const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href='https://www.linkedin.com/in/hever-gdesing/' target="_blank"> <BsLinkedin /> </a>
        <a href='https://github.com/HEVERHD' target="_blank"> <FaGithub /> </a>
        <a href='https://www.instagram.com/hever72/' target="_blank"> <FaInstagramSquare /> </a>
    </div>
    
  )
}

export default HeaderSocials