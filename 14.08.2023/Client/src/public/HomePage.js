import React, { useState, useEffect } from 'react';
import './css/style.css';
import first from './Img/First.jpg';
import second from './Img/Second.png'
import Logo from './Img/Logo.png';
import Full_Logo from './Img/Logo1.png';
import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showUserup, setShowUserup] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [signupLetter, setSignupLetter] = useState('');

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

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    if (storedData !== null) {
      const userData = JSON.parse(storedData);
      if (userData.email) {
        const letter = userData.email[0];
        setIsSignedUp(true);
        setSignupLetter(letter.toUpperCase());
      }
    }
  }, []);

  const handleNextPage = () => {
    if (isSignedUp) {
      navigate("/content")
    }
    else {
      setShowLogin(true);
    }
  }

  const toggleUser = () => {
    setShowUserup(!showUserup)
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
              {isSignedUp ? (
                <button className="nav-aftr-btn" onClick={toggleUser}>{signupLetter}</button>
              ) : (
                <button className="nav-fst-btn" onClick={toggleLogin}>Log In</button>
              )}
            </div>
          </nav>
          {showLogin && <LogIn toggleSignup={toggleSignup} close={close} />}
          {showSignup && <SignUp toggleLogin={toggleLogin} close={close} />}
          {showUserup && <UserUp />}
          {firstCon({ handleNextPage })}
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

function firstCon({ handleNextPage }) {
  return (
    <div className="first-con">
      <div className="first-con-left">
        <div className="first-con-word">
          <h1>Creating website is<br />easy with Us.<br />You can do it</h1>
        </div>
        <div className="first-con-button">
          <button className="first-con-fst-btn" onClick={handleNextPage}>Start for free</button>
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

  const [email, setEmail] = useState('')
  const [pass, setPassword] = useState('')

  function handleLogin(event) {
    event.preventDefault();

    const login_val = {
      email: email,
    }

    login_val.pass = pass;

    if (isValidEmail(email) && isValidPassword(pass)) {
      fetch("http://localhost:100/login", {
        method: "POST",
        body: JSON.stringify(login_val),
        headers: { "Content-type": "application/json" },
      }).then(data => {
        return data.json();
      }).then(datas => {
        if (datas.message === 0) {
          console.log('Cannot Login')
          alert('There is no Account, Create a New Account')
        } else {
          console.log('Can Login');
          if (datas.login === 0) {
            console.log("Wrong Password")
            alert('Wrong Password')
          } else {
            console.log("Correct password")
            sessionStorage.setItem('userData', JSON.stringify(login_val));
            window.location.reload()
            close();
          }
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      if (!isValidEmail(email)) {
        alert("Invalid Email, Enter a Proper Email \n Eg : example@gmail.com")
      }
      else if (!isValidPassword(pass)) {
        alert("Password must be above 8 Characters.")
      }
    }
  }

  return (
    <div>
      <div className="login-box">
        <p className="close" onClick={close}>x</p>
        <div className="form-hold">
          <h2>Login<br />Welcome back!</h2>
          <form action='#' onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password)
}

function SignUp({ toggleLogin, close }) {


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

      // fetch("http://localhost:100/signup", {
      //   method: "post", body: JSON.stringify(signin_val), headers: {
      //     "content-type": "application/json"
      //   }
      // }).then((e) => {
      //   console.log(e.message)
      // })

      fetch("http://localhost:100/signup", {
        method: "POST",
        body: JSON.stringify(signin_val),
        headers: { "Content-type": "application/json" },
      }).then(data => {
        return data.json();
      }).then(datas => {
        if (datas.sign_msg) {
          alert("Email Already Used")
        } else {
          if (datas.message) {
            console.log("Account Created")
            close();
          } else {
            alert("Problem in creating an account, please try again later.");
          }
        }
      }).catch(err => {
        console.log(err);
      })

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

function UserUp() {

  const Logout = () => {
    sessionStorage.removeItem('userData')
    window.location.reload()
  }

  return (
    <div className='userUp-con'>
      <div className='userUp-display'>
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  )
}

export default HomePage;