const express = require('express');
require('dotenv').config()
const app = express();

const urlRoutes = require('./routes/url');
const  {connectToMongoDb} = require('./config/dbConnect')

connectToMongoDb('mongodb://127.0.0.1:27017/shortend-url')
.then(() => console.log('MongoDb connected'))
.catch((err) => console.log("Something went wrong while connecting db", err))

app.use(express.json());
app.use('/url', urlRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {console.log(`Server started at ${PORT}`)})