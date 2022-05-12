import React from 'react'
import "./header.css"
import CTA from './CTA'
import ME from "../../assets/HEVERTPNGADDREACT.png"
import HeaderSocials from './HeaderSocials'

const Header = () => {
  return (
    <header>
      <div className='container header__container'>
          <h5> Hello I´m</h5>
          <h1>Hevert Gelis</h1>
          <h5 className='text-ligth'> Fullstack Developer</h5>
          <CTA />
          <HeaderSocials />
          <div className='me'>
              <img src={ME} alt='miperfil' />
          </div>
              <a href='#contact' className='scroll__down'> Scroll Down </a>
      </div>
    </header>
  )
}

export default Header