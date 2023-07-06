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

# BEM (BLOCK ELEMENT MODIFIER)
The following standard recommends to strt each class name by the module name or the project name example Project name : mywebapp then each
class name of the element starts with mywebapp__yourname

# React Inline Styles 
function App() {
 let styles  = {marginLeft:50px,color:"red"}
  return <h1 style={styles} className={style.acs}>Hello world</h1>;
}
