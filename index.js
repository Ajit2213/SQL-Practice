const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

// const { v4: uuidv4 } = require('uuid');

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
//temple engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//public or static file
app.use(express.static(path.join(__dirname, "public")));

// reading json data or unlearn data by exress
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log("app is listing");
});

app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]["count(*)"]);
    });
  } catch (err) {
    console.log(err);
  }
  res.send("its working");
});

//main /home page rendering

app.get("/main", (req, res) => {
  let q = "select * from user ";

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result.length);
      let values = result;
      res.render("main.ejs", { values });
    });
  } catch (err) {
    console.log(err);
    res.send("something error in db");
  }
});

//edit formation 

app.get("/main/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let q = `select * from user where id='${id}'`; //always passing argumetn/parameter/value in curely braces should on qutes

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      let value = result[0];
      res.render("edit.ejs", { value });
    });
  } catch (err) {
    console.log(err);
    res.send("something error in db");
  }
});

//update formation 
app.patch("/main/:id", (req, res) => {
  let { id } = req.params;
  let { password, username } = req.body;
  console.log(id);

  let q = `select * from user where id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log(result[0].password);

      if (result[0].password != password) {
        res.send("its wrong password");
      } else {
        let q4 = `update user set username='${username}' where id='${id}'`;
        try {
          connection.query(q4, (err, result) => {
            if (err) throw err;
            console.log(result);
            //  res.send(result);
            res.redirect("/main");
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.send("something error in db");
  }
});

//delete formation

app.delete("/main/:id/del", (req, res) => {
  let { id } = req.params;

  let q5 = `delete from user where id='${id}'`;

  try {
    connection.query(q5, (err, result) => {
      if (err) throw err;
      console.log(result);
      // res.send("its working");
      res.redirect("/main");
    });
  } catch (err) {
    console.log(err);
    res.send("error");
  }

  //end
});

app.get("/main/new", (req, res) => {
  res.render("new.ejs");
});

//Added new data

app.post("/main", (req, res) => {
  // let {id}=uuidv4();
  // console.log(id);
  let { id, username, email, password } = req.body;
  console.log(req.body);

  let q = "insert into user (id,username,email,password) Values (?,?,?,?)";
  let uses = [id, username, email, password];

  try {
    connection.query(q, uses, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect("/main");
    });
  } catch (err) {
    console.log(err);
    res.send("something error");
  }
});

const { faker } = require("@faker-js/faker");

//node sql main connection build use package mysql2
const mysql = require("mysql2");

//connection build node to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Ajit123#",
});

// let createRandomUser=()=>{
//     return [
//       faker.string.uuid(),
//       faker.internet.userName(),
//       faker.internet.email(),
//       faker.internet.password(),

//     ];
//   }

//   let q3="insert into user(id,username,email,password) VALUES ?"
//   let data=[];

//   for(let i=0;i<=100;i++){
//   let resem=  createRandomUser();

//   data.push(resem);
//   }

//   try{
//     connection.query(q3,[data],(err,result)=>{
//       if(err)throw(err);
//       console.log(result);
//     })
//   }catch(err){
//     console.log(err);
//   }

// console.log(createRandomUser());
