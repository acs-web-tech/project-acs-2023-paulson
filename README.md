# STYLE SHEET CLASH ISSUE 
avoid Stylesheet clash by using modular css and avoid using tag name until then the style is going to be common for all components

## Example of Modular css 

```
import * as style from './style.module.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
function App() {
  return <h1 className={style.acs}>Hello world</h1>;
}

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
This will prevent clashing of class names it act as a namespace and avoid using tag name selector which will give more problem in production 
if not use modular css

# Note :
     Change css file name to style.module.css
