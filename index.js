const express = require('express');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 3000;


// MiddleWare
app.use(cors())
app.use(express.json())


// Mongo DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r0dgoug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const coffeesCollection = client.db("coffeeDB").collection("coffees");

        //show in the browser
        app.get('/coffees', async (req, res) => {
            const result = await coffeesCollection.find().toArray()
            res.send(result)
        })
        // dynamic id in dynamic routes
        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await coffeesCollection.findOne(query)
            res.send(result)
        })

        // add new coffee from the client site
        app.post('/coffees', async (req, res) => {
            const newCoffees = req.body;
            const result = await coffeesCollection.insertOne(newCoffees)
            res.send(result)
        })

        // delete coffee from client site
        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await coffeesCollection.deleteOne(query)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello Boss! This is Espresso Emporium Website Server')
})

app.listen(port, () => {
    console.log(`Espresso Emporium Server is Running On Port ${port}`)
})