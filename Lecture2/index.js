const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.json());

const todoRoutes = require('./routes/todos');
app.use('/api/v1', todoRoutes);

app.listen(PORT, () => {
    console.log(`server run on  ${PORT} port`)
})

const dbConnect = require('./config/database');
dbConnect()  

app.get('/', (req, res) => {
    res.send(`<h1>Hello this is Home page</h1>`)
})
