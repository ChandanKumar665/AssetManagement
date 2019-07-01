const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');
const fs = require('fs')

//defining routes
const users = require('./routes/api/v1/users');
const assettypes = require('./routes/api/v1/assettypes');
const assets = require('./routes/api/v1/assets');

//body parser middleware
server.use(bodyParser.json());
//cors middleware
server.use(cors());

//db config
const db_config = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db_config,{useNewUrlParser:true}).then(()=>{
    console.log('connected')
}).catch(err => console.log(err))

// use routes
server.use('/api/v1/users',users);
server.use('/api/v1/assettypes',assettypes);
server.use('/api/v1/assets',assets);

const port = process.env.PORT || 4000

server.listen(port,() => console.log(`server is started at the ${port}`));
// fs.open('index.txt','w',function(err,file){
//     console.log(file);
// })