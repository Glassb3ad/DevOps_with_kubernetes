import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const COUNTER_ID = 1
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function connectAndInit() {
    try {
        // Connect to the PostgreSQL database
        await client.connect();
        console.log('Connected to PostgreSQL database!');

        await client.query(`
        CREATE TABLE IF NOT EXISTS ping_pong_counter (
          id INT PRIMARY KEY,
          count INTEGER NOT NULL
        );
      `);
        console.log('Table created or already exists.');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
    }
}

const queryCounter = async () => {
    const result = await client.query(`SELECT count FROM ping_pong_counter where id=${COUNTER_ID}`);
    if (isNaN(result?.rows?.[0]?.count)) {
        await client.query('INSERT INTO ping_pong_counter (id, count) VALUES ($1, $2)', [COUNTER_ID, 0]);
        return 0
    }
    return result?.rows?.[0]?.count
}

const updateCounter = async () => {
    await client.query('UPDATE ping_pong_counter SET count = count + 1 WHERE id = $1', [COUNTER_ID]);
    console.log(`Counter with id ${COUNTER_ID} updated successfully`);
}

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', async (req, res) => {
    await updateCounter()
    const counter = await queryCounter()
    res.send(`pong: ${counter}`)
});

app.get('/pingpong', async (req, res) => {
    await updateCounter()
    const counter = await queryCounter()
    res.send(`pong: ${counter}`)
});

app.get('/counter', async (req, res) => {
    const counter = await queryCounter()
    res.send(JSON.stringify(counter))
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectAndInit()
    const counter = await queryCounter()
    console.log(`pong counter: ${counter}`)
});