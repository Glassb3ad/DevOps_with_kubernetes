import { v4 } from 'uuid';
import express from 'express';
import axios from "axios"

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

const fetchPingPong = async () => {
    const res = await axios.get("http://ping-pong:2346/counter")
    return res.data
}

const app = express();
const PORT = process.env.PORT || 4001;

app.get('/status', async (req, res) => {
    const pongCount = await fetchPingPong()
    res.send(`${curLog}<br>ping / pongs: ${pongCount}`)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startLogging()
});

