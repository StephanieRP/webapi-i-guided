// Imported modules
const express = require("express"); //CommonJs module import
// Data import
const db = require("./data/db.js");

const server = express();
const port = 5000;

//middleware, allows express to use JSON, out of the box it cannot
server.use(express.json());
//get request to server
// req= request, res = response
server.get("/", (req, res) => {
  res.send(`It's alive!`);
});

// Get /hubs => return a list of hubs in JSON format
// .json will convert the data to JSON
server.get("/hubs", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      //send success status and data in json
      res.status(200).json(hubs);
    })
    .catch(err => {
      //handle errors
      res.json({
        error: err,
        message: "Something went wrong"
      });
    });
});

//delete request
server.delete("/hubs/:id", (req, res) => {
  //axios.delete(.../hubs/${id})
  const hubID = req.params.id; //req/params has the URL parameters
  db.hubs
    .remove(hubID)
    .then(deleted => {
      // res.status(200).json(deleted)  -> will send the deleted data
      res.status(204).end(); //send back a response to the client w/o sending any data
    })
    .catch(err => {
      //handle errors
      res.json({
        error: err,
        message: "Something went wrong"
      });
    });
});

// Post request to database
server.post("/hubs", (req, res) => {
  //one way to get data from the client is in the request body
  //axios.post(url,data) => the data shows up as the body on the server
  const hubInfo = req.body;
  db.hubs
    .add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      //handle error
      res.status(500).json({ error: err, message: "Error adding the hub" });
    });
});

server.listen(port, () => {
  console.log(`\n*** API running on port ${port} ***\n`);
});
