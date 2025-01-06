import express from 'express';
import path from 'path'
const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    console.log(path.resolve('main.html'))
    res.sendFile(path.resolve('main.html'))
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});