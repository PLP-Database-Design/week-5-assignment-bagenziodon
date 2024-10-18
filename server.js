//declare dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

// config environment variables
app.use(express.json());
app.use(cors());
dotenv.config();

// connect to database
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
});

// check if connection with db works
db.connect((err) =>{
    // if database connection doesn't work
    if(err)return console.log('database connection failed!');

    // if database connection works
    console.log('database connected successfully! id:', threadId);

    // server listening
    app.listen(process.env.PORT, () =>{
        console.log(`Server is listening on port: ${process.env.PORT}`);
    });

    // send a message to the browser
    console.log('Sending a message to the browser...');

    // start the server
    app.get('/',(req,res) => {
        res.send('Server started successfully!');
    });
});