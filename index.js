const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())


// DB Connection 
const uri = process.env.MONGO_DB_URI;


const client = new MongoClient(uri);

async function dbConnect() {
    try {
        await client.connect();
        console.log("Database connected");
    } catch (error) {
        console.log(error.name);
    }
}

dbConnect();




// endpoint

app.get('/', (req, res) => {
    res.send('Hello World!!')
})


app.get('/quiz/category', async (req, res) => {


    res.send('all category data is loading');
})







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})