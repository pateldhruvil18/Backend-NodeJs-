const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.json());

// const blogappRoutes = require('./routes/blogapp');
// app.use('/api/v1', blogappRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})

const dbConnect = require('./config/database');
dbConnect()  

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello this is Home Page Baby~</h1>
        <h2>How are you!</h2>
    `)
})
