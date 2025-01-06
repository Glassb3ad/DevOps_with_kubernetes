import { v4 } from 'uuid';
import express from 'express';

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

app.get('/status', (req, res) => {
    res.send(curLog)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startLogging()
});

