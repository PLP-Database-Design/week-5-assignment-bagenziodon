// Declare dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Config middleware
app.use(express.json());
app.use(cors());

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check if connection with the database works
db.connect((err) => {
    // If database connection doesn't work
    if (err) {
        return console.error('Database connection failed!', err);
    }

    // If database connection works
    console.log('Database connected successfully!');

    // Set view engine
    app.set('view engine', 'ejs');
    // Views folder is expected to be named 'views'
    app.set('views', __dirname + '/views');

    // Define routes
    app.get('/data', (req, res) => {
        // Retrieve data from the database
        const getPatients = 'SELECT * FROM patients'; // Corrected to SELECT
        db.query(getPatients, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to retrieve data');
            } else {
                // Display the records to the browser
                return res.render('data', { results: results });
            }
        });
    });

    // Server listening
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port: ${process.env.PORT}`);
    });

    // Start the server
    app.get('/', (req, res) => {
        res.send('Server started successfully!');
    });
});

// these are the 2 commands to run
// npm init -y
// npm install express mysql2 nodemon cors dotenv ejs