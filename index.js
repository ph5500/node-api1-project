const express = require('express');
const shortid = require('shortid');

// const shortid = require('shortid');
const server = express();

server.use(express.json()); //teaches express how to read JSON from the body


let users = [{
    id: 1,
    name: "Jane Doe", //string required
    bio: "Not Tarzan's Wife, another Jane" //string
},

{
    id: 2,
    name: "Philippe",
    bio: "Ruler of the galaxy"
}
]

//GET requests
server.get("/", (req, res) => {
    res.json({ api: "Uppp and running!" });
});

// server.get("/api/lessons", function (req, res) {
//     //return an array of lessons
// })

server.get("/api/users", function (req, res) {
    if (!users) {
        res.status(500).json({ errorMessage: "This user information could not be retrieved." })
    } else {
        res.json(users)
    };
})

server.get("/api/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let userId = users.filter((userG) => userG.id === id)


    if (!id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else {
        res.status(200).json(userId)
    }


})

//POST requests

server.post("/api/users", function (req, res) {
    const userInformation = {
        id: Number(shortid.generate()),
        ...req.body
    };
    if (userInformation.name === null || userInformation.bio === null || userInformation.name === '' || userInformation.bio === "") {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } else if (!userInformation) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })

    } else {
        users.push(userInformation);



        res.status(201).json(userInformation);
        //MY API SHOULD ALWAYS RETURN THE CORRECT STATUS CODE!!
    }
});

//DELETE request 

server.delete("/api/users/:id", function (req, res) {
    letid = (req.params.id)

    let usersDelete = users.filter(usersDelete => usersDelete.id != id);

    if (id === undefined) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else if (!users.id) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
    else {



        res.status(200).json(usersDelete);
    }
});

//patch request
server.patch('/api/users/:id', (req, res) => {
    let patchID = Number(req.params.id);
    let userInformation = req.body;


    userInformation.id = shortid.generate();
    const userId = users.filter((id) => id.id === id);

    if (userInformation.id === users.id) {
        res.status(404).json({ errorMessage: 'Please provide a name and bio for user.' })
    }
    else if (userInformation.name === null || userInformation.name === '' || userInformation.bio === "" || userInformation.bio === null) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    else if (!userInformation.id) {
        res.status(500).json({ errorMessage: "The user information could not be modified" })
    }
    else {
        users.push(userInformation)
        res.status(200).json(userInformation);
    }
})
server.listen(8000, () => console.log("\n== API is up ==\n"));

