import React from "react";
import Logo from './Img/Logo.png'
import './css/ContentPage.css'


function contentPage() {

  return (
    <div>
      {navBar()}
    </div>
  )
}

function navBar() {
  return (
    <nav>
      <img src={Logo} alt="" />
    </nav>
  )
}

export default contentPage;