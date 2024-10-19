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

    // route to get all patients
    app.get('/patients', (req, res) => {
        const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
        db.query(getPatients, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to retrieve data');
            } else {
                return res.render('patients', { results: results });
            }
        });
    });

    // route to filter patients by first name
    app.get('/patients/first_name/:firstName', (req, res) => {
        const firstName = req.params.firstName; // Get the first name from the URL parameters
        const getPatientsByFirstName = 'SELECT * FROM patients WHERE first_name = ?'; // Query to get patients by first name

        db.query(getPatientsByFirstName, [firstName], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to retrieve patients data by first name');
            } else if (results.length === 0) {
                return res.status(404).send('No patients found with this first name');
            } else {
                // Render the patients view with the retrieved results
                return res.render('patients', { results: results });
            }
        });
    });

    // route to get all providers
    app.get('/providers', (req, res) => {
        const getProviders = 'SELECT first_name, last_name, provider_specialty FROM providers';
        db.query(getProviders, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to retrieve providers data');
            } else {
                // Render the providers view with the retrieved results
                return res.render('providers', { results: results });
            }
        });
    });
    // http://localhost:3000/providers

    //  route to get providers by specialty
    app.get('/providers/provider_specialty/:specialty', (req, res) => {
        const specialty = req.params.specialty; // Get the specialty from the URL parameters
        const getProvidersBySpecialty = 'SELECT * FROM providers WHERE provider_specialty = ?'; // Query to get providers by specialty

        db.query(getProvidersBySpecialty, [specialty], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to retrieve providers data by specialty');
            } else if (results.length === 0) {
                return res.status(404).send('No providers found for this specialty');
            } else {
                // Render the providers view with the retrieved results
                return res.render('providers', { results: results });
            }
        });
    });
    // http://localhost:3000/providers/provider_specialty/Cardiology

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