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

    } catch (error) {
        console.log(error.name, error.massage);
    }
}
dbConnect();

const questionCollection = client.db('sjQuizDB').collection('questions')

// endpoint

app.get('/', (req, res) => {
    res.send('welcome')
})

app.post('/quiz/question', async (req, res) => {
    try {

        const result = await questionCollection.insertOne(req.body)
        // console.log(result)
        if (result.insertedId) {
            res.send({
                sussess: true,
                massage: "Question Created"
            })
        }
        else {
            res.send({
                sussess: false,
                error: "Not created"
            })
        }
    }
    catch (error) {
        res.send({
            sussess: false,
            error: "Not created"
        })
    }
})

app.get('/quiz/question', async (req, res) => {
    try {

        const cursor = questionCollection.find({})
        const result = await cursor.toArray()
        console.log(result)
        res.send({
            sussess: true,
            massage: "Question Created",
            data: result
        })

    }
    catch (error) {
        res.send({
            sussess: false,
            error: "Not created"
        })
    }
})







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})