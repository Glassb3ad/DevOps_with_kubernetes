import { v4 } from 'uuid';
import path from 'path';
import fs from "fs/promises";

const rndStr = v4();

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

const log = async () => {
    try {
        const curLog = `${new Date().toISOString()}: ${rndStr}`;
        console.log(curLog)
        await fs.writeFile(filePath, `${curLog}\n`, { flag: 'a+' });
    } catch (err) {
        console.log(err);
    }
};

const startLogging = async () => {
    const exists = await directoryExists()
    if (!exists) {
        await createDirectory()
    }
    log();
    setInterval(log, 5000);
};

console.log("Starting logging")
startLogging()