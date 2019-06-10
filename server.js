const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();

//defining routes
const users = require('./routes/api/v1/users');

//body parser middleware
server.use(bodyParser.json());

//db config
const db_config = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db_config,{useNewUrlParser:true}).then(()=>{
    console.log('connected')
}).catch(err => console.log(err))

// use routes
server.use('/api/v1/users',users);

const port = process.env.PORT || 4000

server.listen(port,() => console.log(`server is started at the ${port}`));