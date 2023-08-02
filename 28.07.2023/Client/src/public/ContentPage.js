import React, { useEffect, useState } from 'react';
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegGrinBeamSweat } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Logo from './Img/Logo.png'
import PS from './Img/penstand.png';
import { ChromePicker } from 'react-color';
import './css/style.css';
import { Link, useNavigate } from "react-router-dom";


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

  return (
    <div>
      <div className="cp-newpost-btn-hldr">
        <Link to="/edit" className="cp-edit-link">
          <button>
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

  // Connection to Node to Display All Posts...

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
        <NoItems_Post />
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
          <Post_Holder key={index} title={title} handleDeleteButton={handleDeleteButton} />
        ))}
      </div>
    );
  } { }
};

const NoItems_Post = () => {
  return (
    <div className="cp-ni">
      <img src={PS} alt="" />
      <label>No Posts</label>
      <p>Posts that you create will show up here</p>
    </div>
  )
};

const Post_Holder = ({ title, handleDeleteButton }) => {

  const navigate = useNavigate();

  const onDeleteClick = () => {
    handleDeleteButton(title)
  }

  const openPost = () => {
    sessionStorage.setItem('Title', title)
    navigate("/edit")
  }

  return (
    <div className="cp-post-hold">
      <div className="cp-items-post" onClick={openPost}>
        <div className="cp-items-post-frnt">
          <div className="cp-ip-head">
            <h1>{title[0]}
            </h1>
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

  const [ch, setCh] = useState(-1);
  const [a, setA] = useState([]);

  // Connection with Node to check whether data is Existis..

  const fetchPage = () => {
    fetch('http://localhost:100/pagebar', {
      method: 'POST',
      body: JSON.stringify({ validEmail: ReceivedEmail }),
      headers: { "Content-type": "application/json" },
    }).then(data => {
      return data.json();
    }).then(datas => {
      if (datas.message !== 0) {
        setA(datas.message.map(item => item.title))
        setCh(1)
      } else {
        console.log(datas.message)
        setCh(0);
      }
    }).catch(error => { })
  }

  if (ch === -1) {
    fetchPage();
  } else if (ch === 0) {
    return (
      <div className="cp-post-page-con">
        <NoItems_Page />
      </div>
    );
  } else if (ch === 1) {

    return (
      <div>
        {a.map((title, index) => (
          <Page_Holder key={index} title={title} />
        ))}
      </div>
    )
  }

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

function Page_Holder({ title }) {

  const openPage = () => {
    console.log("OKay")
  }

  // Function to Delete a Page...

  const onDeletePage = () => {

    // Connection with Node to send Data to Delete page...

    fetch('http://localhost:100/deletepage', {
      method: 'POST',
      body: JSON.stringify({ validEmail: ReceivedEmail, title: title }),
      headers: { "Content-type": "application/json" },
    })

    window.location.reload()
  }

  return (
    <div className="cp-post-hold">
      <div className="cp-items-post" onClick={openPage}>
        <div className="cp-items-post-frnt">
          <div className="cp-ip-head">
            <h1>{title[0]}
            </h1>
          </div>
          <div>
            <p>{title}</p>
          </div>
        </div>
        <div className="cp-items-post-dlt">
          <MdDelete className="cp-ip-dlt" size={25} onClick={onDeletePage} />
        </div>
      </div>
    </div>
  )
}


function ThemeBar() {

  const [showCus, setShowCus] = useState(false);
  const [selectedFColor, setSelectedFColor] = useState('#000000');
  const [selectedBColor, setSelectedBColor] = useState('#E7F8FF');
  const [backcolor, setBackcolor] = useState("")

  const handletogglecustom = () => {
    setShowCus(!showCus)
  }

  const close_tc = () => {
    setShowCus(false)
  }

  const handleFontColorChange = (event) => {
    const selectedFColor = event.target.value;
    setSelectedFColor(selectedFColor);
  };

  const handleBackColorChange = (event) => {
    const selectedBColor = event.target.value;
    setSelectedBColor(selectedBColor)
  }

  const changeCus = () => {
    console.log("Font : ", selectedFColor)
    console.log("Back : ", selectedBColor)
    setShowCus(false)
  }

  const cancelCus = () => {
    setSelectedFColor('#000000')
    setSelectedBColor('#E7F8FF')
  }

  return (
    <div>
      <div className="cp-theme-top-con">
        <div className="cp-except-myimg" style={{ background: selectedBColor }}></div>
        <div className="cp-theme-mydet-con">
          <label>My Theme</label>
          <button onClick={handletogglecustom}>Customise</button>
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
        <div>
          {showCus && <ThemeCustomise
            close_tc={close_tc}
            changeCus={changeCus}
            cancelCus={cancelCus}
            selectedBColor={selectedBColor}
            selectedFColor={selectedFColor}
            handleBackColorChange={handleBackColorChange}
            handleFontColorChange={handleFontColorChange}
          />}
        </div>
      </div>
    </div >
  )
}

const ThemeCustomise = ({
  close_tc, changeCus, selectedBColor, selectedFColor,
  handleFontColorChange, handleBackColorChange, cancelCus }) => {

  return (
    < div className='tc-main' >
      <div className='tc-con'>
        <div className='tc-close'>
          <label>Set Your Custom Theme</label>
          <p onClick={close_tc}>X</p>
        </div>
        <div className='tc-mid'>
          <div className='tc-mid-fst'>
            <p>Select Your Font Colour : </p>
            <input type='color'
              value={selectedFColor}
              onChange={handleFontColorChange} />
          </div>
          <div className='tc-mid-snd'>
            <p>Select Your Background : </p>
            <input type='color'
              value={selectedBColor}
              onChange={handleBackColorChange} />
          </div>
          <div className='tc-btn-hldr'>
            <button className='btn1' onClick={cancelCus}>Cancel</button>
            <button className='btn2' onClick={changeCus}>Okay</button>
          </div>
        </div>
      </div>
    </div >
  );
}

function SettingBar() {
  return (
    <div className='set-main'>
      <div className='set-top'>
        <h2>Settings</h2>
      </div>
      <div className='set-con'>
        <FaRegGrinBeamSweat className='sweaticon' />
        <p>Page Not Build Yet !!!</p>
      </div>
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