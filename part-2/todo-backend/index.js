import express from 'express';
import cors from "cors"
import pkg from 'pg';
import dotenv from 'dotenv'

dotenv.config();
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

const insertTask = async (task) => {
    await client.query('INSERT INTO tasks (task) VALUES ($1)', [task]);
}
app.get('/tasks', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM tasks`);
        console.log({ path: "/tasks", request: "GET", responseStatus: 200 })
        res.json({ tasks: result?.rows })
    } catch (e) {

    }

});

app.post('/tasks', async (req, res) => {
    const { task } = req?.body;

    if (typeof task !== 'string' || task.trim() === '') {
        console.log({ path: "/tasks", request: "POST", body: { task }, responseStatus: 400, error: 'Invalid task. Must be a non-empty string.' })
        return res.status(400).json({ error: 'Invalid task. Must be a non-empty string.' });
    }
    const trimmedTask = task.trim()
    if (trimmedTask.length > 143) {
        console.log({ path: "/tasks", request: "POST", body: { task: trimmedTask }, responseStatus: 400, error: 'Invalid task. Must not exceed 144 characters' })
        return res.status(400).json({ error: 'Invalid task. Must not exceed 144 characters' });
    }
    try {
        await insertTask(trimmedTask)
        console.log({ path: "/tasks", request: "POST", body: { task }, responseStatus: 201 })
        res.status(201).json({ task: trimmedTask });
    } catch (e) {
        console.log({ path: "/tasks", request: "POST", body: { task }, error: e })
    }
});


app.listen(PORT, async () => {
    await connectAndInit()
    console.log(`Server started on port ${PORT}`);
});

