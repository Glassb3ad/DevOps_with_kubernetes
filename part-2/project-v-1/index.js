import express from 'express';
import path from 'path'
import fsP from "fs/promises";
import fs from "fs"
import axios from "axios"

const app = express();
app.use(express.static(path.resolve('build')));

const PORT = process.env.PORT || 4000;

const PATH_TO_RANDOM_IMAGE = path.join('/', 'usr', 'src', 'app', 'files', 'random-image.jpg');

const randomImageExists = async () => {
    try {
        const stats = await fsP.stat(PATH_TO_RANDOM_IMAGE)
        return stats?.isFile() || false
    } catch (error) {
        return false
    }
}

const fetchAndSaveImage = async () => {
    try {
        const response = await axios({
            url: 'https://picsum.photos/1200',
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(PATH_TO_RANDOM_IMAGE);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log('Image updated:', new Date().toLocaleString());
    } catch (error) {
        console.error('Error fetching the image:', error);
    }
}

const startUpdatingRandomImage = async () => {
    if (!(await randomImageExists())) {
        console.log("Random image does not initially exist")
        await fetchAndSaveImage()
    }
    setInterval(fetchAndSaveImage, 60 * 60 * 1000)
    console.log("Random image is updated every hour")
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join('build', 'index.html')));
});

app.get('/hourly-image', (req, res) => {
    res.sendFile(path.resolve(PATH_TO_RANDOM_IMAGE));
});

app.listen(PORT, () => {
    startUpdatingRandomImage()
    console.log(`Server started on port ${PORT}`);
});