import React, { useEffect, useState } from 'react';
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Logo from './Img/Logo.png'
import PS from './Img/penstand.png';
import './css/style.css';
import { Link, useNavigate } from "react-router-dom";
import { Editing_Page } from './EditingPage.js'


let ReceivedLetter = "";
let ReceivedEmail = "";

const storedData = sessionStorage.getItem('userData');
const userData = storedData ? JSON.parse(storedData) : null;

if (userData !== null) {
  ReceivedLetter = userData.email[0].toUpperCase();
  ReceivedEmail = userData.email
}

function ContentPage() {

  const nav = useNavigate();

  useEffect(() => {
    if (ReceivedLetter.length === 0) {
      nav("/")
    }
  }, [])

  if (ReceivedLetter.length === 1) {
    return (
      <div>
        {MainCon()}
      </div>
    )
  }
}

function MainCon() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserup, setShowUserup] = useState(false);

  const handleMenuItemClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleMenuIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUser = () => {
    setShowUserup(!showUserup)
  }

  return (
    <div>
      <nav className="cp-nav">
        <div>
          <HiMenu size={30} className="menu-icon" onClick={handleMenuIconClick} />
          <Link to="/"><img src={Logo} alt="" /></Link>
        </div>
        <button className="nav-aftr-btn" onClick={toggleUser}>{ReceivedLetter}</button>
      </nav>
      {showUserup && <UserUp />}
      <div className="cp-main-con">
        {isMenuOpen && (
          <div className="cp-menubar">
            <MenuBar activeMenu={activeMenu} handleMenuItemClick={handleMenuItemClick} />
          </div>
        )}
        <div className="cp-con-box">
          {activeMenu === null || activeMenu === 'posts' ? <PostBar /> : null}
          {activeMenu === 'page' && <PageBar />}
          {activeMenu === 'theme' && <ThemeBar />}
          {activeMenu === 'settings' && <SettingBar />}
        </div>
      </div>
    </div>
  );
}




function MenuBar({ activeMenu, handleMenuItemClick }) {

  const newContent = () => {
    console.log("Okay")
  }

  return (
    <div>
      <div className="cp-newpost-btn-hldr">
        <Link to="/edit" className="cp-edit-link">
          <button onClick={(newContent)}>
            <p>+</p> New Project
          </button>
        </Link>
      </div>
      <div className="cp-menustrip">
        <div
          className={`cp-postmenu ${activeMenu === 'posts' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('posts')}
        >
          <label><MdOutlinePostAdd size={25} className=" icon " />  Posts</label>
        </div>
        <div
          className={`cp-pagemenu ${activeMenu === 'page' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('page')}
        >
          <label><AiOutlineCopy size={25} className=" icon " />Page</label>
        </div>
        <div
          className={`cp-thememenu ${activeMenu === 'theme' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('theme')}
        >
          <label><AiOutlineFormatPainter size={25} className=" icon " />Theme</label>
        </div>
        <div
          className={`cp-settingmenu ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('settings')}
        >
          <label><AiOutlineSetting size={25} className=" icon " />Settings</label>
        </div>
      </div>
    </div>
  );
}


// Program to display the posts that we have 

const PostBar = () => {
  const [ch, setCh] = useState(-1);
  const [a, setA] = useState([]);

  // Fetch Function

  const fetchPosts = () => {
    fetch('http://localhost:100/postbar', {
      method: 'POST',
      body: JSON.stringify({ validEmail: ReceivedEmail }),
      headers: { "Content-type": "application/json" },
    }).then(response => {
      return response.json()
    }).then(datas => {
      if (datas.value !== 1) {
        setA(datas.value.map(item => item.title));
        setCh(1);
      } else {
        setCh(0);
      }
    })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  // Displaying NoItems_Page or Posts_Holder

  if (ch === -1) {
    fetchPosts();
  } else if (ch === 0) {
    return (
      <div className="cp-post-page-con">
        <NOITEMS_POST />
      </div>
    );
  } else if (ch === 1) {

    const handleDeleteButton = (title) => {

      fetch('http://localhost:100/deletepost', {
        method: 'POST',
        body: JSON.stringify({ validEmail: ReceivedEmail, titleName: title }),
        headers: { "Content-type": "application/json" },
      })
      window.location.reload()

      const updatedPosts = a.filter((postTitle) => postTitle !== title);
      console.log(updatedPosts)
    }

    return (
      <div className="cp-post-page-con">
        {a.map((title, index) => (
          <POSTS_HOLDER key={index} title={title} handleDeleteButton={handleDeleteButton} />
        ))}
      </div>
    );
  }
};

const NOITEMS_POST = () => {
  return (
    <div className="cp-ni">
      <img src={PS} alt="" />
      <label>No Posts</label>
      <p>Posts that you create will show up here</p>
    </div>
  )
};

const POSTS_HOLDER = ({ title, handleDeleteButton }) => {

  const onDeleteClick = () => {
    handleDeleteButton(title)
  }

  return (
    <div className="cp-post-hold">
      <div className="cp-items-post">
        <div className="cp-items-post-frnt">
          <div className="cp-ip-head">
            <h1>U</h1>
          </div>
          <div>
            <p>{title}</p>
          </div>
        </div>
        <div className="cp-items-post-dlt">
          <MdDelete className="cp-ip-dlt" size={25} onClick={onDeleteClick} />
        </div>
      </div>
    </div>
  )
};

function PageBar() {
  return (
    <div>
      {NoItems_Page()}
    </div>
  )
}

function ThemeBar() {
  return (
    <div>
      <div className="cp-theme-top-con">
        <div className="cp-except-myimg"></div>
        <div className="cp-theme-mydet-con">
          <label>My Theme</label>
          <button>Customise</button>
        </div>
      </div>
      <div className="cp-other-theme-con">
        <div className="cp-theme-title"><h2>Themes</h2></div>
        <div className="cp-other-theme-con-fst">
          <div className="light-theme"></div>
          <div className="dark-theme"></div>
          <div className="orange-theme"></div>
        </div>
        <div className="cp-other-theme-con-snd">
          <div className="aqua-theme"></div>
          <div className="red-theme"></div>
        </div>
      </div>
    </div>
  )
}

function SettingBar() {
  return (
    <div>
      <h2>Settings</h2>
    </div>
  )
}

function NoItems_Page() {
  return (
    <div className="cp-ni">
      <img src={PS} alt="" />
      <label>No Pages</label>
      <p>Page that you create will show up here</p>
    </div>
  )
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


export default ContentPage;