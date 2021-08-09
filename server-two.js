const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const mysql = require('mysql');

const DB_NAME = "student_test_db";
const TABLE_NAME = "student_info";

app.use(bodyParser.json());
app.use(express.json());

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : DB_NAME,
});

connection.connect((error) => {
  if(error){
    console.log("Error in connecting SQL Server", error);
    return;
  }

  console.log('Successfully connected the SQL Server')
});

app.post('/api/create/db', (request, response) => {
  connection.query('CREATE DATABASE ${DB_NAME}', (error, result) => {
    if(error){
      response.status(500).send({
        message : "Problem in creating new database",
        error
      });
      return;
    }

    response.status(200).send({
      message : "Created a new Database",
      result
    });
  })
});


app.post('/api/create/table', (request, response) => {
 const query = 'CREATE TABLE ${TABLE_NAME} (first_name varchar(255), last_name varchar(255), age int(3), id int(3) NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))';

 connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
      return;
    }

    response.status(200).send("Table has been created successfully");
 })
})

app.post('/api/student/create', (request, response) => {
  const firstName = request.body.first_name;
  if(!firstName){
    response.status(400).send("Invalid or Missing First Name");
    return;
  }

  const lastName = request.body.last_name;
  if(!lastName){
    response.status(400).send("Invalid or Missing Last Name");
    return;
  }

  const age = request.body.age;
  if(!age){
    response.status(400).send("Invalid or Missing Age");
    return;
  }

  const query = "INSERT INTO ${TABLE_NAME} (first_name, last_name, age) VALUES ('${firstName}', '${lastName}', ${age})";

  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
      return;
    }

    response.status(200).send("New user profile has been created successfully");
  })

});

app.get('/api/students', (request, response) =>{
  const query = 'SELECT * FROM ${TABLE_NAME}'

  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
      return;
    }

    response.status(200).send(result);
  })
});

app.put('/api/student/update/:id', (request, response) => {

});

app.delete('/api/student/delete/:id', (request, response) => {

})


const port = process.env.port || 8080;

http.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT 8080");
})