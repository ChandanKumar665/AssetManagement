const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');
const config = require('config');
const path = require('path');

//defining routes
const users = require('./routes/api/v1/users');
const assettypes = require('./routes/api/v1/assettypes');
const assets = require('./routes/api/v1/assets');
const auth = require('./routes/api/v1/auth');

//body parser middleware
server.use(bodyParser.json());
//cors middleware
server.use(cors());

//db config
const db_config = config.get('mongoURI');

// use routes
server.use('/api/v1/users',users);
server.use('/api/v1/auth',auth);
server.use('/api/v1/assettypes',assettypes);
server.use('/api/v1/assets',assets);


// step 1
const PORT = process.env.PORT || 4000;

// step 2
//connect to mongo
mongoose.connect(process.env.MONGODB_URI || db_config, {useNewUrlParser:true}).then(()=>{
    console.log('connected');
}).catch(err => console.log(err));

// step 3
//serve static assets if it's in production
if(process.env.NODE_ENV === 'production'){
	//set static folder
	server.use(express.static('client/build'));
	//checking the url host
	// * means all are allowed
	server.get('*',(req, res) => {
		res.sendFile(path.join(__dirname,'client','build','index.html')); //relative path
	})

}else{
//aws
/set static folder
	server.use(express.static('client/build'));
	//checking the url host
	// * means all are allowed
	server.get('*',(req, res) => {
		res.sendFile(path.join(__dirname,'client','build','index.html')); //relative path
	})
}

server.listen(PORT,() => console.log(`server is started at the ${PORT}`));
