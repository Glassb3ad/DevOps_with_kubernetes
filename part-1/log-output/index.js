import { v4 } from 'uuid';
import express from 'express';
import path from 'path';
import fs from "fs/promises";

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'pingpong.txt');

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

const rndStr = v4()
let curLog;

const log = () => {
    curLog = `${(new Date()).toISOString()}: ${rndStr}`
    console.log(curLog)
}

const startLogging = () => {
    log()
    setInterval(log, 5000)
}

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/status', async (req, res) => {
    const pongCount = await readLastLine()
    res.send(`${curLog}<br>ping / pongs: ${pongCount}`)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startLogging()
});

