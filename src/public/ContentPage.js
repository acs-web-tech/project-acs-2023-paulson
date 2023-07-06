import React, { useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import Logo from './Img/Logo.png'
import PS from './Img/penstand.png';
import './css/style.css';


function ContentPage() {
  return (
    <div>
      {MainCon()}
    </div>
  )
}

function MainCon() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleMenuIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="cp-nav">
        <div>
          <HiMenu size={30} className="menu-icon" onClick={handleMenuIconClick} />
          <img src={Logo} alt="" />
        </div>
        <button className="nav-btn">Sign Up</button>
        <div className="user-image-display"></div>
      </nav>
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

  return (
    <div>
      <div className="cp-newpost-btn-hldr">
        <button>
          <p>+</p> New Project
        </button>
      </div>
      <div className="cp-menustrip">
        <div
          className={`cp-postmenu ${activeMenu === 'posts' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('posts')}
        >
          <label><MdOutlinePostAdd size={25} class=" icon " />  Posts</label>
        </div>
        <div
          className={`cp-pagemenu ${activeMenu === 'page' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('page')}
        >
          <label><AiOutlineCopy size={25} class=" icon " />Page</label>
        </div>
        <div
          className={`cp-thememenu ${activeMenu === 'theme' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('theme')}
        >
          <label><AiOutlineFormatPainter size={25} class=" icon " />Theme</label>
        </div>
        <div
          className={`cp-settingmenu ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('settings')}
        >
          <label><AiOutlineSetting size={25} class=" icon " />Settings</label>
        </div>
      </div>
    </div>
  );
}

function PostBar() {
  return (
    <div className="cp-post-page-con">
      {NoItems_Post()}
    </div>
  );
}

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

function NoItems_Post() {
  return (
    <div className="cp-ni">
      <img src={PS} alt="" />
      <label>No Posts</label>
      <p>Posts that you create will show up here</p>
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



export default ContentPage;