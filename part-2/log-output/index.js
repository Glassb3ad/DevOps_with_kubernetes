import { v4 } from 'uuid';
import express from 'express';
import axios from "axios"
import path from 'path';
import fs from "fs/promises";

const FILE_PATH = path.join('/', 'config', 'information.txt');
const rndStr = v4()
let curLog;

const readFile = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return data
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

const log = () => {
    curLog = `${(new Date()).toISOString()}: ${rndStr}`
    console.log(curLog)
}

const startLogging = () => {
    log()
    setInterval(log, 5000)
}

const fetchPingPong = async () => {
    const res = await axios.get("http://ping-pong:2346/counter")
    return res.data
}

const app = express();
const PORT = process.env.PORT || 4001;

app.get('/status', async (req, res) => {
    const pongCount = await fetchPingPong()
    const fileContent = await readFile()
    res.send(`${curLog}<br>ping / pongs: ${pongCount}<br>Message: ${process.env.MESSAGE}<br>Information.txt: ${fileContent}`)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startLogging()
});

