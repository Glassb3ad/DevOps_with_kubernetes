const axios = require("axios")

const fetchAndPost = async () => {
    const res = await axios.get("https://en.wikipedia.org/wiki/Special:Random")
    const article = JSON.stringify(res.request?._redirectable._options.href)
    await axios.post(process.env.URL, { task: `Read ${article}` })
    console.log(`Read ${article}`)
}

fetchAndPost()