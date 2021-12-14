const express = require("express")
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const authRouter = require("./authRouter")
const englishRouter = require("./englishRouter")
const app = express()
const cors = require('cors');

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use("/auth", authRouter)
app.use("/english", englishRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://sklevzhic:6303nokiA@cluster0.lw5fe.mongodb.net/databasr?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
