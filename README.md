# Database Interacation in Web Applications

This demonstrates the cconnection of MySQL database and Node.js to create a simple API

## Requirements
- [Node.js](https://nodejs.org/) installed
-  MySQL installed and running
-  A code editor, like [Visual Studio Code](https://code.visualstudio.com/download)

## Setup
1. Clone the repository
2. Initialize the node.js environment
   ```
   npm init -y
   ```
3. Install the necessary dependancies
   ```
   npm install express mysql2 dotenv nodemon
   ```
4. Create a ``` server.js ``` and ```.env``` files
5. Basic ```server.js``` setup
   <br>
   
   ```js
   const express = require('express')
   const app = express()

   
   // Question 1 goes here


   // Question 2 goes here


   // Question 3 goes here


   // Question 4 goes here

   

   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })
   ```
<br><br>

## Run the server
   ```
   nodemon server.js
   ```
<br><br>

## Setup the ```.env``` file
```.env
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

<br><br>

## Configure the database connection and test the connection
Configure the ```server.js``` file to access the credentials in the ```.env``` to use them in the database connection

<br>

## 1. Retrieve all patients
Create a ```GET``` endpoint that retrieves all patients and displays their:
- ```patient_id```
- ```first_name```
- ```last_name```
- ```date_of_birth```
<!-- GET Method -->
// Set view engine
    app.set('view engine', 'ejs');
    // Views folder is expected to be named 'views'
    app.set('views', __dirname + '/views');

    // Define routes
    app.get('/data', (req, res) => {
        // Retrieve data from the database
        const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
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

<br>

## 2. Retrieve all providers
Create a ```GET``` endpoint that displays all providers with their:
- ```first_name```
- ```last_name```
- ```provider_specialty```

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
</table>

<br>

## 3. Filter patients by First Name
Create a ```GET``` endpoint that retrieves all patients by their first name

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

## 4. Retrieve all providers by their specialty
Create a ```GET``` endpoint that retrieves all providers by their specialty
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

    // Example
    http://localhost:3000/providers/provider_specialty/Cardiology
<br>


## NOTE: Do not fork this repository
=