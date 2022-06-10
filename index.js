const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.6izgs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    client.connect();
    const projectsCollection = client.db("Portfolio").collection("projects");

    app.get("/projects", async (req, res) => {
      const query = {};
      const cursor = projectsCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const project = await projectsCollection.findOne(query);
      res.send(project);
    });
  } finally {
    //
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(port, () => {
  console.log("Port is: ", port);
});

// DVmBvKSqBV99Rhbm
// salehAhmed
