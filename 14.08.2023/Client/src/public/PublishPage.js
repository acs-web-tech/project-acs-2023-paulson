import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('name');
  const pagetitle = queryParams.get('title');
  const val = { name: username, title: pagetitle };
  const [content, setContent] = useState();

  fetch("http://localhost:100/publish", {
    method: "POST",
    body: JSON.stringify(val),
    headers: { "Content-type": "application/json" },
  }).then(data => {
    return data.json()
  }).then(datas => {
    if (datas.content.length !== 0) {
      setContent(datas.content[0].content)
    } else {
      setContent("404 NOT FOUND")
    }
  })

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default App;