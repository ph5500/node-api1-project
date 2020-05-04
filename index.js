const express = require('express')

const server = express();

server.use(express.json()); //teaches express how to read JSON from the body

server.get("/", (req, res) => {
    res.json({ api: "Up and running!" });
});

// server.get("/api/lessons", function (req, res) {
//     //return an array of lessons
// })

server.listen(8000, () => console.log("\n== API is up ==\n"));