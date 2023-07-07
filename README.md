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
```
function App() {
 let styles  = {marginLeft:50px,color:"red"}
  return <h1 style={styles} className={style.acs}>Hello world</h1>;
}
```

## SERVER SIDE SCRIPTING  | Pre flight request
create a seprate folder for nodejs app and update essentials follow the following. below code is just for an idea and recommandation 
its not mandatory to follow it in an redundant manner

React requires preflight request which mean react front will be considered as cross origin not same origin  /path will not point it to the same origin so to enable preflight request we use two header Access-Control-Allow-Origin,Access-Control-Allow-Header

Learn more about http headers [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) \
Learn more about Preflight request [Read more](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request) 
```
Middleware function 
app.use(function(req,res,next){
// fallback
   if(req.hostname != "your desigered host name"){
      res.status(403).end("Pre flight requests with diffrent origin are not allowed")
return;
}
    res.writeHead(200,{"Access-Control-Allow-Origin":"http://localhost:3000 or *",
     "Access-Control-Allow-Origin":"content-type,accept.... or *"
 })
// If you forgeet to call next the routes after the middleware funtion will not work
next()
})
app.post("/getaccesstoken",(req,res)=>{
// validate session token and send the access token generated with the help of session token and send it to the client
})
app.post("/validateaccesstoken",(req,res)=>{
// validate the access token with the session token and send a flag to the client the the token is valid
})
``
