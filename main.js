require('dotenv').config();

const express = require('express');
const { Pool } = require('pg'); // Correctly import Pool from pg
const cors = require('cors');
const app = express();
const ex_port = 8081;


app.use(cors());

// Create a pool of connections to the PostgreSQL database
const db = new Pool({
    host: 'localhost',
    user: 'postgres', // Ensure you specify the user if needed
    password: process.env.PASSWORD,
    database: 'postgres',
    port: 5432
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to fetch stock results
app.get('/stock_results', async (request, response) => {
    const sql = "SELECT * FROM postgres.dbo.stock_results"; // Corrected SQL query

    try {
        // Use the pool to query the database
        const data = await db.query(sql);
        return response.json(data.rows); // Send the rows back to the client
    } catch (err) {
        return response.status(500).json(err); // Return error if query fails
    }
});

// Start the server
app.listen(ex_port, () => {
  console.log(`Example app listening on port ${ex_port}`);
});
