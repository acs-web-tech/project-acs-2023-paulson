const { sign } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();
let bcrypt = require('bcrypt');


app.use(function (req, res, next) {

  // Fall back
  //if (req.hostname != "") {
  // res.status(403).end("Pre flight requests with diffrent origin are not allowed")
  //return;
  //}
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  next()
})

app.use(express.json())

app.post('/signup', (req, res) => {
  // const name = fs.readFileSync(__dirname + "/package.json")
  // console.log(__dirname)
  // console.log(name)
  // // res.setHeader("content-type", "plain/text")
  // const a = { name: "acs" }
  // res.end(JSON.stringify(a))

  bcrypt.hash(req.body.password, 10, function (hasherr, hash) {
    if (hasherr) return;
    console.log("Name:", req.body.name);
    console.log("Email:", req.body.email);
    console.log("Hashed Password:", hash);
    res.redirect("/loginpage");
  });
});

app.listen(100, () => {

});
