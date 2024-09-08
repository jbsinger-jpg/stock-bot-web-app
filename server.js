require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const ex_port = 8081;
const fs = require('fs').promises
const path = require('path')

app.use(cors());

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'postgres',
    port: 5432
});

// Test valid conenction
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/stock_results/top_10_bullish_stocks', async (request, response) => {
    const file_path = path.join(
        __dirname, 
        'sql_scripts', 
        'top_10_bullish_stocks.sql'
    );

    try {
        const sql = await fs.readFile(file_path, 'utf-8');
        const data = await db.query(sql);

        return response.json(data.rows);
    } catch (err) {
        console.error('Error:', err);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/stock_results/all_bullish_stocks', async (request, response) => {
    const file_path = path.join(
        __dirname, 
        'sql_scripts', 
        'all_bullish_stocks.sql'
    )

    const sql = await fs.readFile(file_path, 'utf-8')
    
    try {
        const data = await db.query(sql);
        return response.json(data.rows);
    } catch (err) {
        return response.status(500).json(err);
    }
});

app.get('/stock_results/top_10_bearish_stocks', async (request, response) => {
    const file_path = path.join(
        __dirname, 
        'sql_scripts', 
        'top_10_bearish_stocks.sql'
    )
    const sql = await fs.readFile(file_path, 'utf-8');

    try {
        const data = await db.query(sql);
        return response.json(data.rows);
    } catch (err) {
        return response.status(500).json(err);
    }
});

app.get('/stock_results/all_bearish_stocks', async (request, response) => {
    const file_path = path.join(
        __dirname, 
        'sql_scripts', 
        'all_bearish_stocks.sql'
    )    
    const sql = await fs.readFile(file_path, 'utf-8');;

    try {
        const data = await db.query(sql);

        return response.json(data.rows);
    } catch (err) {
        return response.status(500).json(err);
    }
});

// Start the server
app.listen(ex_port, () => {
  console.log(`Listening on port ${ex_port}`);
});
