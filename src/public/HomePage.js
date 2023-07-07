import React, { useState, useEffect } from 'react';
import './css/style.css';
import first from './Img/First.jpg';
import second from './Img/Second.png'
import Logo from './Img/Logo.png';
import Full_Logo from './Img/Logo1.png';
import { Link } from "react-router-dom";



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
          <nav class="hp-nav">
            <img src={Logo} alt="" />
            <div>
              <button class="nav-fst-btn" onClick={toggleLogin}>Log In</button>
            </div>
          </nav>
          {showLogin && <LogIn toggleSignup={toggleSignup} close={close} />}
          {showSignup && <SignUp toggleLogin={toggleLogin} close={close} />}
          {firstCon()}
          {secondCon()}
          {end()}
        </>
      )}
    </div>

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
    <div class="first-con">
      <div class="first-con-left">
        <div class="first-con-word">
          <h1>Creating website is<br />easy with Us.<br />You can do it</h1>
        </div>
        <div class="first-con-button">
          <Link to="/content"><button class="first-con-fst-btn">Start for free</button></Link>
        </div>
      </div>
      <div class="first-con-right">
        <img src={first} alt="" />
      </div>
    </div>
  )
}

function secondCon() {
  return (
    <div class="second-con">
      <div class="second-con-left">
        <img src={second} alt="" />
      </div>
      <div class="second-con-right">
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut ligula tempus, consectetur nisi sed, blandit sem. Phasellus efficitur nisl viverra massa accumsan, id iaculis odio tincidunt. Duis lobortis neque id aliquet tristique. Vivamus ac blandit mauris, in eleifend ex. Phasellus porttitor malesuada tortor.</p>
      </div>
    </div>
  )
}

function end() {
  return (
    <div class="end-con">
      <div class="end-log-con">
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
 let submitData = async()=>{
   // the follwing node /login route should assign a session
   let status = await(fecth("/login",{method:"post",headers:{"Accept":"application/json"}}))
 }
  return (
    <div>
      <div className="login-box">
        <p class="close" onClick={close}>x</p>
        <div class="form-hold">
          <h2>Login<br />Welcome back!</h2>
          <form>
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
  
  return (
    <div>
      <div className="signup-box">
        <p class="close" onClick={close}>x</p>
        <div class="fomm-hold">
          <h2>Welcome!<br />Create New Account</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <p>
              Already have an account ? <label onClick={toggleLogin}>Log In</label>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
