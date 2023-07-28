import React, { useState } from 'react';
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

export function Editing_Page() {



  const [inputValue, setInputValue] = useState('');

  const handleSaveText = () => {
    const editor = document.getElementById('editor');
    const title = inputValue;
    const content = editor.innerText;
    let a = { title: title, content: content }
    console.log(a)
  };


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
          <div className='ep-nav-user-img'>
          </div>
        </nav>
        <GetTitle handleSaveText={handleSaveText} inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      {Edit_Menu()}
    </div>
  )
}

const GetTitle = ({ handleSaveText, inputValue, setInputValue }) => {

  return (
    <div className="ep-get-title">
      <input
        id='title'
        type="Text"
        value={inputValue}
        placeholder="Enter Title"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="ep-get-tit-btn-hlder">
        <button className="ep-btn-hlder-fst" onClick={handleSaveText}>
          <AiFillSave size={20} className='icon-in-tit-btn' />
          Save
        </button>
        <button className="ep-btn-hlder-snd">
          <AiOutlineSend size={20} className='icon-in-tit-btn' />
          Publish
        </button>
      </div>
    </div>
  )
}



const Edit_Menu = () => {

  const [content, setContent] = useState("Start typing here...");

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUndo = () => {
    document.execCommand('undo', false, null);
  };

  const handleRedo = () => {
    document.execCommand('redo', false, null);
  };

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

      <div
        id="editor"
        contentEditable="true"
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Editing_Page;