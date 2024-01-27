const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'engine9',
    password: 'ivan6x12',
    database: 'row_information'
});


   // Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');

    // Create table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS row_information (
            id INT AUTO_INCREMENT PRIMARY KEY,
            herb_name VARCHAR(255),
            pain_description VARCHAR(255)
        )
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists');
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/add-row', (req, res) => {
    const { herb_name, pain_description } = req.body;

    const query = "INSERT INTO row_information (herb_name, pain_description) VALUES (?, ?)";
    db.query(query, [herb_name, pain_description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error occurred');
        } else {
            res.status(200).json({ message: 'Row added successfully' });
        }
    });
});



// ... other routes and middleware ...

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
