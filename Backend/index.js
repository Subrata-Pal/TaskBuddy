const express = require('express');
const connectDB = require('./db/db');
const path = require('path');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
connectDB();
const taskRouter = require('./routes/task.routes')
const _dirname = path.resolve();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/task',taskRouter)
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"))
});




app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})