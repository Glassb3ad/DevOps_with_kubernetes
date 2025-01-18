import express from 'express';
import cors from "cors"
import pkg from 'pg';
// import dotenv from 'dotenv'

// dotenv.config();
const { Client } = pkg;

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
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          task text NOT NULL
        );
      `);
        console.log('Table created or already exists.');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
    }
}

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 4000;

const tasks = ["Task 1"]

const insertTask = async (task) => {
    await client.query('INSERT INTO tasks (task) VALUES ($1)', [task]);
}
app.get('/tasks', async (req, res) => {
    const result = await client.query(`SELECT * FROM tasks`);
    res.json({ tasks: result?.rows })
});

app.post('/tasks', async (req, res) => {
    const { task } = req?.body;

    if (typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ error: 'Invalid task. Must be a non-empty string.' });
    }
    const trimmedTask = task.trim()
    await insertTask(trimmedTask)
    tasks.push(trimmedTask)
    res.status(201).json({ task: trimmedTask });
});


app.listen(PORT, async () => {
    await connectAndInit()
    console.log(`Server started on port ${PORT}`);
});

