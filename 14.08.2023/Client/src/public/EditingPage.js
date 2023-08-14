// Importing Section

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { AiFillSave } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { MdThumbUp } from "react-icons/md"
import './css/edit.css'
import Logo from './Img/Logo.png'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Displaying The User's First letter in Top-Right Circle

let ReceivedLetter = "";

const storedData = sessionStorage.getItem('userData');
const userData = storedData ? JSON.parse(storedData) : null;

if (userData !== null) {
  ReceivedLetter = userData.email[0].toUpperCase();
}

// Main Function, Contain Nav and Connects all other Functions.

function Editing_Page() {

  const [value, setValue] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [contentData, setContentData] = useState("");
  const [showDialog, setShowDialog] = useState(false);

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

  const [enteredText, setEnteredText] = useState('');
  const [matter, setMatter] = useState('');

  const handleSaveText = () => {

    let sesTitle = sessionStorage.getItem('Title2');
    setMatter("Saved")

    if (sesTitle !== null) {
      setValue(sesTitle);
      console.log(sesTitle)
    } else {
      setValue(value);
      console.log(value)
    }

    const email = userData.email;
    const title = value;
    const content = enteredText;
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
    setShowDialog(true)
  }

  useEffect(() => {
    // After 2 to 3 seconds (adjust the time as needed), hide the dialog
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 2000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  // Function to Publish the post , Executes When Published Button is clicked, Stored in Gettitle function.

  const handlePublishPost = () => {

    const email = userData.email
    const val = { value: value, email: email }
    setShowDialog(true)
    setMatter("Published")

    console.log(val)

    // Connection with Node to Store the title in userPage Database...

    fetch("http://localhost:100/savepage", {
      method: "POST",
      body: JSON.stringify(val),
      headers: { "Content-type": "application/json" },
    })
  }

  const removeSessionTit = () => {
    sessionStorage.removeItem('Title2')
  }

  return (
    <div className='ep'>
      <div className='ep-fixed-top'>
        <nav className='ep-nav'>
          <div className='ep-nav-fst'>
            <div className='ep-ba-con'>
              <Link to="/content" onClick={removeSessionTit}><BiArrowBack size={30} className='ep-nav-ba' /></Link>
            </div>
            <img src={Logo} alt="" />
          </div>
          <button className='ep-nav-user-img'>
            <p>{ReceivedLetter}</p>
          </button>
        </nav>
        <GetTitle handleSaveText={handleSaveText}
          handlePublishPost={handlePublishPost}
          //setInputValue={setInputValue}
          value={value}
          setValue={setValue}
          inputDisabled={inputDisabled}
        />
      </div>
      <EDIT_MENU contentData={contentData}
        setEnteredText={setEnteredText}
      />
      {showDialog && <DialogBox matter={matter} />}
    </div>
  )
}

// Menu That contains TextBox for Title and Save,Publish Button

const GetTitle = ({ handleSaveText, setValue, value, inputDisabled, handlePublishPost }) => {

  const sendValue = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="ep-get-title">
      <input
        id='title'
        type="Text"
        value={value}
        placeholder="Enter Title"
        disabled={inputDisabled}
        onChange={sendValue}
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

const EDIT_MENU = ({ contentData, setEnteredText }) => {


  const [value, setValue] = useState('')

  // Setting the content came from parameter to the "value"

  useEffect(() => {
    if (contentData !== "") {
      setValue(contentData)
    }
  }, [contentData])

  setEnteredText(value)

  // Design Return 

  return (
    <div className="ep-text-editor">
      <ReactQuill
        id='editor'
        value={value}
        onChange={setValue}
        placeholder="Start Typing Here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        }}
      />
    </div>
  )
}

const DialogBox = (matter) => {

  console.log(matter.matter)

  return (
    <div className='dbox-main'>
      <div className='dbox-con'>
        <MdThumbUp className='Thumb' />
        <p>{matter.matter} successfully</p>
      </div>
    </div>
  )
}

export default Editing_Page;