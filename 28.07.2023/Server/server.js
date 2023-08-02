const { sign } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();
const con = require('./connection.js')
const cors = require('cors')
let bcrypt = require('bcrypt');
const { error } = require('console');
const { title } = require('process');


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
              let tab_name = req.body.email.substring(0, req.body.email.indexOf("@"))
              let tab_name2 = req.body.email.substring(0, req.body.email.indexOf("@")) + "page"
              con.query(
                `CREATE TABLE ${tab_name} (con_num INT(10) PRIMARY KEY AUTO_INCREMENT,title VARCHAR(50),content LONGTEXT)`
              )
              con.query(
                `CREATE TABLE ${tab_name2} (title VARCHAR(50))`
              )
            }
          })
        }
      }
    )
  })
})

app.post('/login', (req, res) => {
  con.query(
    `select email from user_details where email = '${req.body.email}'`,
    function (err, result) {
      if (result.length >= 1) {
        const validation_email = result[0].email
        con.query(
          `select password from user_details where email= '${validation_email}'`,
          function (error, pwdres) {
            if (error) {
              console.log(error);
            } else {
              const validation_pw = pwdres[0].password
              bcrypt.compare(req.body.pass, validation_pw,
                function (hasherr, match) {
                  if (hasherr) {
                    console.error(hasherr)
                  } else {
                    if (match) {
                      res.json({ login: 1 })
                    } else {
                      res.json({ login: 0 })
                    }
                  }
                }
              )
            }
          }
        )
      }
      else {
        res.json({ message: 0 })
        console.log('Cannot Login')
      }
    })
})


app.post('/postbar', (req, res) => {

  const validEmail = req.body.validEmail;
  let TableName = validEmail.substring(0, validEmail.indexOf("@"))

  con.query(
    `select title from ${TableName}`
    , function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result.length >= 1) {
        res.json({ value: result })
      }
      else {
        res.json({ value: 1 })
      }
    })
})

app.post('/savepost', (req, res) => {

  let contentTitle = ''
  let emailId = req.body.email
  let TableName = emailId.substring(0, emailId.indexOf("@"))
  let content = req.body.content
  let Untitled = "Untitled"

  if (req.body.title.length < 1) {
    contentTitle = Untitled
  } else {
    contentTitle = req.body.title
  }

  con.query(
    `select title from ${TableName} where title= '${contentTitle}'`,
    function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result.length >= 1) {
        con.query(
          `update ${TableName} set content="${content}" where title = '${contentTitle}'`
        )
      } else {
        con.query(
          `insert into ${TableName} values (null,'${contentTitle}','${content}')`
        )
      }
    }
  )

})

app.post('/deletepost', (req, res) => {
  let validEmail = req.body.validEmail
  let TitleName = req.body.titleName
  let TableName = validEmail.substring(0, validEmail.indexOf("@"))

  con.query(
    `delete from ${TableName} where title = '${TitleName}'`,
    function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log("Post deleted successfully")
      }
    }
  )
})

app.post('/sendCon', (req, res) => {
  let Title = req.body.title
  let validEmail = req.body.email
  let TableName = validEmail.substring(0, validEmail.indexOf("@"))

  con.query(
    `select content from ${TableName} where title = '${Title}'`,
    function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.json({ content: result })
      }
    }
  )
})

app.post('/pagebar', (req, res) => {
  const validEmail = req.body.validEmail;
  let TableName = validEmail.substring(0, validEmail.indexOf("@")) + "page"

  con.query(
    `select title from ${TableName}`,
    function (err, result) {
      if (result.length >= 1) {
        res.json({ message: result })
      } else {
        res.json({ message: 0 })
      }
    }
  )
})

app.post('/savepage', (req, res) => {
  const validEmail = req.body.email;
  const value = req.body.value;

  let TableName = validEmail.substring(0, validEmail.indexOf("@")) + "page"

  con.query(
    `select title from ${TableName} where title='${value}'`,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        if (result.length >= 1) {
          console.log("There is Value");
        } else {
          con.query(
            `insert into ${TableName} values ('${value}')`
          )
        }
      }
    }
  );
})

app.post('/deletepage', (req, res) => {
  let validEmail = req.body.validEmail
  let TitleName = req.body.title
  let TableName = validEmail.substring(0, validEmail.indexOf("@")) + "page";

  con.query(
    `delete from ${TableName} where title = '${TitleName}'`
  )
})

app.listen(100, () => { })
