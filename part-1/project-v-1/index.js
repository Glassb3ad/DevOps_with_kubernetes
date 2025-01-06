import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Hi');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});