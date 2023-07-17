const { sign } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();
const con = require('./connection.js')
const cors = require('cors')
let bcrypt = require('bcrypt');


// app.use( {

//   // Fall back
//   //if (req.hostname != "") {
//   // res.status(403).end("Pre flight requests with diffrent origin are not allowed")
//   //return;
//   //}
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   // res.setHeader("Access-Control-Allow-Headers", "*");
//   // res.setHeader("Access-Control-Allow-Methods", "POST");
//   // next()



// })


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json())

app.get('/', (req, res) => {
  con.query("select * from user_details", function (err, result) {
    res.send(result)
  })
})

app.post('/signup', (req, res) => {
  // const name = fs.readFileSync(__dirname + "/package.json")
  // console.log(__dirname)
  // console.log(name)
  // // res.setHeader("content-type", "plain/text")
  // const a = { name: "acs" }
  // res.end(JSON.stringify(a))

  bcrypt.hash(req.body.password, 10, function (hasherror, hashval) {

    con.query(
      `select email from user_details where email = '${req.body.email}'`,
      function (err, result) {
        if (result.length >= 1) {
          res.json({ sign_msg: "no-signup" })
        }
        else {
          const value = { username: req.body.name, email: req.body.email, password: hashval }
          const sqlcmd = "insert into user_details set ?"
          con.query(sqlcmd, value, function (err, result) {
            if (err) {
              res.json({ message: 0 })
            } else {
              res.json({ message: 1 })
            }
          })
        }
      }
    )
  })
})

app.post('/login', (req, res) => {
  const email_val = { email: req.body.email }
  const sqlcmd = "select password from user_details where email=?"
  con.query(sqlcmd, email_val, function (err, result) {
    if (err) {
      res.json({ message: 0 })
    } else {
      res.json({ message: 1 })
    }
  })
})

app.listen(100, () => {

})
