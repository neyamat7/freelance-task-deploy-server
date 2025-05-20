const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xrpsmxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const taskCollection = client.db("taskDB").collection("tasks");
    const usersCollection = client.db("taskDB").collection("users");

    app.get("/tasks", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    app.get("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });

    app.get("/user-tasks/:userUid", async (req, res) => {
      const uid = req.params.userUid;
      console.log(uid);
      const query = { userUid: uid };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/add-task", async (req, res) => {
      const newTask = req.body;
      console.log(newTask);
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    });

    app.put("/tasks/:taskId", async (req, res) => {
      const id = req.params.taskId;
      const updatedTask = req.body;
      console.log(updatedTask);
      const options = { upsert: true };
      const filter = { _id: new ObjectId(id) };

      const updateDocument = {
        $set: updatedTask,
      };
      const result = await taskCollection.updateOne(
        filter,
        updateDocument,
        options
      );
      res.send(result);
    });

    app.patch("/tasks/:taskId", async (req, res) => {
      const id = req.params.taskId;
      const { bids } = req.body;

      const filter = { _id: new ObjectId(id) };

      const updateDocument = {
        $set: {
          bids: bids,
        },
      };
      const result = await taskCollection.updateOne(filter, updateDocument);
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;

      await usersCollection.updateMany({ bids: id }, { $pull: { bids: id } });

      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    // user related api

    app.get("/users/:userEmail", async (req, res) => {
      const { userEmail } = req.params;
      const query = { email: userEmail };
      const result = await usersCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const newUserProfile = req.body;
      const result = await usersCollection.insertOne(newUserProfile);
      res.send(result);
    });

    app.patch("/users", async (req, res) => {
      const { email, bids } = req.body;

      const filter = { email: email };
      const updatedDoc = {
        $set: {
          bids: bids,
        },
      };

      const result = await usersCollection.updateOne(filter, updatedDoc);
      console.log(result);
      res.send(result);
    });

    // app.delete("/users/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const { email } = req.body;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await usersCollection.deleteOne(query);

    //     // // delete user from firebase
    //     // const userRecord = await admin.auth().getUserByEmail(email);
    //     // await admin.auth().deleteUser(userRecord.uid);

    //     res.send(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server start");
});

app.listen(port, () => {
  console.log(`my server is running on ${port}`);
});
