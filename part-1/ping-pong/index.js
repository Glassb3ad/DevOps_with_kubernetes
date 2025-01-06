import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

let counter = 0

app.get('/', (req, res) => {
    res.send(`pong: ${counter}`)
    counter++
});

app.get('/pingpong', (req, res) => {
    res.send(`pong: ${counter}`)
    counter++
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});