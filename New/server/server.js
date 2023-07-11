const { sign } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();


app.use(function (req, res, next) {

  // Fall back
  //if (req.hostname != "") {
  // res.status(403).end("Pre flight requests with diffrent origin are not allowed")
  //return;
  //}
  next()
})

app.use(express.json())

app.post('/signup', (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Header": "*",
    "Access-Control-Allow-Methods": "post"
  })
  // const name = fs.readFileSync(__dirname + "/package.json")
  // console.log(__dirname)
  // console.log(name)
  // // res.setHeader("content-type", "plain/text")
  // const a = { name: "acs" }
  // res.end(JSON.stringify(a))
  console.log(req.body)
  res.end();
});

app.listen(100, () => {

});
