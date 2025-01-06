import { v4 } from 'uuid';

const rndStr = v4()
const log = () => console.log(`${(new Date()).toISOString()}: ${rndStr}`)

log()
setInterval(log, 5000)