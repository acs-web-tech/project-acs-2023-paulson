import React, { useState, useEffect } from 'react';
import './css/style.css';
import first from './Img/First.jpg';
import second from './Img/Second.png'
import Logo from './Img/Logo.png';
import Full_Logo from './Img/Logo1.png';
import { redirect } from "react-router-dom"



function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const close = () => {
    setShowLogin(false);
    setShowSignup(false);
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <nav className="hp-nav">
            <img src={Logo} alt="" />
            <div>
              <button className="nav-fst-btn" onClick={toggleLogin}>Log In</button>
            </div>
          </nav>
          {showLogin && <LogIn toggleSignup={toggleSignup} close={close} />}
          {showSignup && <SignUp toggleLogin={toggleLogin} close={close} />}
          {firstCon()}
          {secondCon()}
          {end()}
        </>
      )
      }
    </div >

  )
}

function Loader() {
  return (
    <div className="home-page-loader-container">
      <div className="hp-loader"></div>
    </div>
  );
}

function firstCon() {
  return (
    <div className="first-con">
      <div className="first-con-left">
        <div className="first-con-word">
          <h1>Creating website is<br />easy with Us.<br />You can do it</h1>
        </div>
        <div className="first-con-button">
          <button className="first-con-fst-btn">Start for free</button>
        </div>
      </div>
      <div className="first-con-right">
        <img src={first} alt="" />
      </div>
    </div>
  )
}

function secondCon() {
  return (
    <div className="second-con">
      <div className="second-con-left">
        <img src={second} alt="" />
      </div>
      <div className="second-con-right">
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut ligula tempus, consectetur nisi sed, blandit sem. Phasellus efficitur nisl viverra massa accumsan, id iaculis odio tincidunt. Duis lobortis neque id aliquet tristique. Vivamus ac blandit mauris, in eleifend ex. Phasellus porttitor malesuada tortor.</p>
      </div>
    </div>
  )
}

function end() {
  return (
    <div className="end-con">
      <div className="end-log-con">
        <img src={Full_Logo} alt="" />
      </div>
      <div>
        <label>Phone</label>
        <p>+91 8734328956</p>
        <label>Email</label>
        <p>info@contentcreater.in</p>
      </div>
      <div>
        <label>Twitter</label>
        <p>@content_creater</p>
        <label>Github</label>
        <p>@content_creater</p>
      </div>
    </div>
  )
}

function LogIn({ toggleSignup, close }) {
  return (
    <div>
      <div className="login-box">
        <p className="close" onClick={close}>x</p>
        <div className="form-hold">
          <h2>Login<br />Welcome back!</h2>
          <form action='#'>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <p>
              Don't have an account ?{' '}
              <label onClick={toggleSignup}>Sign Up</label>
            </p>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}


function SignUp({ toggleLogin, close }) {

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const name = event.target.childNodes[0].value;
    const email = event.target.childNodes[1].value;
    const password = event.target.childNodes[2].value;

    if (isValidEmail(email) && isValidPassword(password)) {
      const signin_val = {
        name: name,
        email: email,
      }
      signin_val.password = password


      let f = fetch("http://localhost:100/signup", {
        method: "post", body: JSON.stringify(signin_val), headers: {
          "content-type": "application/json"
        }
      }).then((e) => {

        redirect("/content")
        //console.log(e.body.getReader())
        /* 
        e.body.getReader().read().then(function (user) {
          console.log(user.value.buffer.toString())
        })
        */
        // e.json().then(function (user) {
        //   console.log(user)
        // })
      }).catch(error => { })
    }
    else {
      if (!isValidEmail(email)) {
        alert("Invalid Email, Enter a Proper Email \n Eg : example@gmail.com")
      }
      else if (!isValidPassword(password)) {
        alert("Password must be above 8 Characters.")
      }
    }
  }

  return (
    <div>
      <div className="signup-box">
        <p className="close" onClick={close}>x</p>
        <div className="fomm-hold">
          <h2>Welcome!<br />Create New Account</h2>

          <form action='#' onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" required />
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <p>
              Already have an account ? <label onClick={toggleLogin}>Log In</label>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div >
  );
}



export default HomePage;