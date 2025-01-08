import path from 'path';
import fs from "fs/promises";

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'log.txt');

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

const watchFile = async () => {
    try {
        const watcher = fs.watch(filePath);
        for await (const event of watcher) {
            if (event?.eventType === "change") {
                const lastLine = await readLastLine(filePath)
                console.log(lastLine)
            }
        }
    } catch (err) {
        console.error('Error watching file:', err)
    }
}


const startLogging = async () => {
    const exists = await directoryExists()
    if (!exists) {
        await createDirectory()
    }
    return watchFile();
};

console.log("start logging")
startLogging().finally(() => console.log("logging stopped"))

