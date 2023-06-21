import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors("*"))


const moviesSchema = new mongoose.Schema({movieName: {type :  String, required: true}})
const moviesModel = mongoose.model("movie", moviesSchema) 

app.get("/movies", async(req, res) => {
    const movies = await moviesModel.find()
    res.status(200).json({movies: movies})
})

app.post('/movies', async (req, res) => {
    
    const movie = await moviesModel.create({movieName: req.body.movieName})
    res.status(201).send('Movie added')
})
app.get("/", async(req, res) => {
    res.send("Reached backend")
})
mongoose.connect(MONGO_URI)
    .then(res => console.log("Data base connected"))
    .catch(err => console.log(err.message))
app.listen(PORT, ()=>{
    console.log(`Backend server running at port ${PORT}`)
})