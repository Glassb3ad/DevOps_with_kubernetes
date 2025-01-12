import express from 'express';
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 4000;

const tasks = ["Task 1"]

app.get('/tasks', async (req, res) => {
    res.json({ tasks })
});

app.post('/tasks', (req, res) => {
    const { task } = req?.body;

    if (typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ error: 'Invalid task. Must be a non-empty string.' });
    }
    const trimmedTask = task.trim()
    tasks.push(trimmedTask)
    res.status(201).json({ task: trimmedTask });
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

