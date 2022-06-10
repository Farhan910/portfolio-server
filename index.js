const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nqqks.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {
      await client.connect();
      console.log('connencted')
      const projectsCollection = await client
        .db("portfolio")
        .collection("projects");
  
      app.get("/project", async (req, res) => {
        const query = {};
      const cursor = projectsCollection.find(query);
      const projects = await cursor.toArray();

      res.send(projects);
      });

      app.get("/project/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await projectsCollection.findOne(query);
        res.send(result);
      
        
      })
    }
    finally {
    }
  }
  run().catch(console.dir);

  app.get("/", (req, res) => {
    res.send("haramain is running ");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port`, port);
  });
  