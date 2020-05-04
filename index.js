const express = require('express')

// const shortid = require('shortid');
const server = express();

server.use(express.json()); //teaches express how to read JSON from the body


let users = [{
    id: 1,
    name: "Jane Doe", //string required
    bio: "Not Tarzan's Wife, another Jane" //string
},
];
//GET requests
server.get("/", (req, res) => {
    res.json({ api: "Uppp and running!" });
});

// server.get("/api/lessons", function (req, res) {
//     //return an array of lessons
// })

server.get("/api/users", function (req, res) {
    // const users = [{
    //     id: 1,
    //     name: "Jane Doe",
    //     bio: "Not Tarzan's Wife, another Jane"
    // },
    // ];
    users ?

        res.json(users) : res.status(404).json({ message: "The users information could not be retrieved. " });
});

server.get("/api/users/:id", (req, res) => {
    const userInformation = req.body;


    if (userInformation.id === null) {
        res.status(500).json(`{
            errorMessage: "The users with information could not be retrieved."
        }`)
    }
    users.push(userInformation);


})

server.post("/api/users", function (req, res) {
    const userInformation = req.body;

    // if (userInformation.name === null || userInformation.bio === null || userInformation.name === '' || userInformation.bio === "") {
    //     res.status(400).json(`{
    //     errorMessage: "Please provide name and bio for the user."
    // }.`)
    // } else if (!userInformation) {
    //     res.status(500).json(`{errorMessage: "There was an error while saving the user to the database"}`)

    // } else {
    //     users.push(userInformation);



    res.status(201).json(userInformation);
    //MY API SHOULD ALWAYS RETURN THE CORRECT STATUS CODE!!
}
);


server.delete("/api/users/:id", function (req, res) {
    const id = Number(req.params.id)

    users = users.filter(user => user.id != id);

    res.status(200).json(users);
});

server.listen(8000, () => console.log("\n== API is up ==\n"));

