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

React requires preflight request which mean react front will be considered as cross origin not same origin  /path will not point it to the same origin so to enable preflight request we use two header Access-Control-Allow-Origin,Access-Control-Allow-Headers

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

## Integrating REACT and NODE JS AS A SINGLE PAGE APPLICATION
Node js :
```
app.use(function(req,res,next){
// fallback
   if(req.hostname != "your desigered host name"){
      res.status(403).end("Pre flight requests with diffrent origin are not allowed")
return;
}
    res.writeHead(200,{"Access-Control-Allow-Origin":"http://localhost:3000 or *",
     "Access-Control-Allow-Origin":"content-type,accept.... or *"
 })

 app.post("/login",(req,res)=>{
 res.end("hello")
 })
 app.listen(100,()=>{})
```

you can also use port 80 but not 3000 is becuase your react app will use that port
the nodejs server will be running on [](http://localhost:100)

##Your react app
```
npm start -> this will run your react at port 3000
import {redirect} from "react-router-dom"
function LogIn({ toggleSignup, close }) {
  return (
    <div>
      <div className="login-box">
        <p class="close" onClick={close}>x</p>
        <div class="form-hold">
          <h2>Login<br />Welcome back!</h2>
          <form action='#' onSubmit={function(event){
               event.preventDefault()
               // e.text().e.blob(),e.json() -> can be used asper the data given by the server
               let f = fetch("http://localhost/login",{method:"post"}).then(e=>e.text()).then((e)=>{
               // do what ever you want by validating the data from the server
               redirect("/your_browser_router_dashboard_route")
               })
          }}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <p>
              Don't have an account ?{' '}
              <label onClick={toggleSignup}>Sign Up</label>
            </p>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
```
