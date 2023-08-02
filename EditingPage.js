// Importing Section

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { AiFillSave } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { BiBold } from "react-icons/bi";
import { BiItalic } from "react-icons/bi";
import { ImUnderline } from "react-icons/im";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import './css/edit.css'
import Logo from './Img/Logo.png'

// Displaying The User's First letter in Top-Right Circle

let ReceivedLetter = "";

const storedData = sessionStorage.getItem('userData');
const userData = storedData ? JSON.parse(storedData) : null;

if (userData !== null) {
  ReceivedLetter = userData.email[0].toUpperCase();
}

// Main Function, Contain Nav and Connects all other Functions.

function Editing_Page() {

  const [value, setValue] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [contentData, setContentData] = useState("");

  // Code For Displaying The Contents in Text Editor, Executes When value is in Session Data.

  let postTitle = sessionStorage.getItem('Title')

  if (postTitle !== null) {

    setValue(postTitle)
    setInputDisabled(true)

    let Email = userData.email;
    let Title = { title: postTitle, email: Email }

    // Connection with Node to send and recieve data.

    fetch("http://localhost:100/sendCon", {
      method: "POST",
      body: JSON.stringify(Title),
      headers: { "Content-type": "application/json" },
    }).then(data => {
      return data.json()
    }).then(datas => {
      //console.log()
      const conVal = datas.content[0].content
      setContentData(conVal)
    })
    sessionStorage.setItem('Title2', postTitle)
    sessionStorage.removeItem('Title')
  }

  // Function to Save Post, Executes When Save Button is clicked, Stored in Gettitle function.

  const [inputValue, setInputValue] = useState('');

  const handleSaveText = () => {

    let sesTitle = sessionStorage.getItem('Title2');

    if (sesTitle !== null) {
      console.log(sesTitle);
    } else {
      console.log("Success");
    }


    const email = userData.email;
    const title = inputValue;
    const content = "";
    let a = { title: title, content: content, email: email }

    // Connection With Node to Save the Post.

    fetch("http://localhost:100/savepost", {
      method: "POST",
      body: JSON.stringify(a),
      headers: { "Content-type": "application/json" },
    }).then(data => {
      return data.json()
    }).then(datas => {
      if (datas.message === 1) {
        alert("Post Already Exist, Enter other Title Name")
      }
    })
  }

  // Function to Publish the post , Executes When Published Button is clicked, Stored in Gettitle function.

  const handlePublishPost = () => {

    const email = userData.email
    const val = { value: value, email: email }

    console.log(val)

    // Connection with Node to Store the title in userPage Database...

    fetch("http://localhost:100/savepage", {
      method: "POST",
      body: JSON.stringify(val),
      headers: { "Content-type": "application/json" },
    })
  }

  return (
    <div className='ep'>
      <div className='ep-fixed-top'>
        <nav className='ep-nav'>
          <div className='ep-nav-fst'>
            <div className='ep-ba-con'>
              <Link to="/content"><BiArrowBack size={30} className='ep-nav-ba' /></Link>
            </div>
            <img src={Logo} alt="" />
          </div>
          <button className='ep-nav-user-img'>
            <p>{ReceivedLetter}</p>
          </button>
        </nav>
        <GetTitle handleSaveText={handleSaveText}
          handlePublishPost={handlePublishPost}
          setInputValue={setInputValue}
          value={value}
          inputDisabled={inputDisabled}
        />
      </div>
      <EDIT_MENU contentData={contentData}
      />
    </div>
  )
}

// Menu That contains TextBox for Title and Save,Publish Button

const GetTitle = ({ handleSaveText, setInputValue, value, inputDisabled, handlePublishPost }) => {

  return (
    <div className="ep-get-title">
      <input
        id='title'
        type="Text"
        value={value}
        placeholder="Enter Title"
        disabled={inputDisabled}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="ep-get-tit-btn-hlder">
        <button className="ep-btn-hlder-fst" onClick={handleSaveText}>
          <AiFillSave size={20} className='icon-in-tit-btn' />
          Save
        </button>
        <button className="ep-btn-hlder-snd" onClick={handlePublishPost}>
          <AiOutlineSend size={20} className='icon-in-tit-btn' />
          Publish
        </button>
      </div>
    </div>
  )
}

// Function For Editing Part 

const EDIT_MENU = ({ contentData }) => {

  const [enteredText, setEnteredText] = useState('');

  const [value, setValue] = useState('')

  // Setting the content came from parameter to the "value"

  useEffect(() => {
    if (contentData !== "") {
      setValue(contentData)
    }
  }, [contentData])

  // Storing the value in Editor in Variable( enteredText )

  const handleInputChange = (event) => {
    setEnteredText(event.target.value)
  };

  // Function to Change text format in Editor ( BOLD, ITALIC, UNDERLINE )

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  // Function For Undo and Redo

  const handleUndo = () => {
    document.execCommand('undo', false, null);
  };

  const handleRedo = () => {
    document.execCommand('redo', false, null);
  };

  // Design Return 

  return (
    <div className="ep-text-editor">
      <div id="toolbar">
        <button onClick={() => handleFormat('bold')}>
          <BiBold />
        </button>
        <button onClick={() => handleFormat('italic')}>
          <BiItalic />
        </button>
        <button onClick={() => handleFormat('underline')}>
          <ImUnderline />
        </button>
        <button onClick={handleUndo}>
          <BiUndo size={20} />
        </button>
        <button onClick={handleRedo}>
          <BiRedo size={20} />
        </button>
      </div>

      <textarea
        id="editor"
        contentEditable="true"
        placeholder="Start Typing Here..."
        value={value + enteredText}
        onInput={handleInputChange}
      // onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}

function dialogBox({ message }) {
  console.log(message)
}

export default Editing_Page;