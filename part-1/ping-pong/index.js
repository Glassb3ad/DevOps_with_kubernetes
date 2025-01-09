import express from 'express';
import path from 'path';
import fs from "fs/promises";

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'pingpong.txt');
let counter = 0

const createDirectory = () => {
    console.log("Create new directory")
    return fs.mkdir(directory, { recursive: true })
}

const directoryExists = async () => {
    try {
        const stats = await fs.stat(directory)
        return stats?.isDirectory() || false
    } catch (error) {
        return false
    }
}

const readLastLine = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.trim().split('\n');
        return lines[lines.length - 1];
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

const increaseCounter = () => {
    counter++
    fs.writeFile(filePath, JSON.stringify(counter));
}

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    increaseCounter()
    res.send(`pong: ${counter}`)
});

app.get('/pingpong', (req, res) => {
    increaseCounter()
    res.send(`pong: ${counter}`)
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    const exists = await directoryExists()
    if (!exists) {
        await createDirectory()
        await fs.writeFile(filePath, JSON.stringify(counter));
    } else {
        console.log("Reading pong counter")
        try {
            const savedCounter = await readLastLine()
            counter = isNaN(savedCounter) ? 0 : parseInt(savedCounter)
        }
        catch (err) {
            console.log("Cannot read pong counter from file")
            console.log(err)
        }
    }
    console.log(`pong counter: ${counter}`)
});