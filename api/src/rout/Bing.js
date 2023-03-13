
var express = require('express');
var app = express();
var db = require('./db');

app.use(express.json());

// import routes
var userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

// start server
var port = 3000;
app.listen(port, function() {
console.log('Server listening on port ' + port);
});

// db.js
var Sequelize = require('sequelize');

// create database connection
var sequelize = new Sequelize('mydatabase', 'user', 'password', {
host: 'localhost',
dialect: 'mysql'
});

// define user model
var User = sequelize.define('user', {
name: Sequelize.STRING,
email: Sequelize.STRING,
password: Sequelize.STRING
});

// sync database tables with models
sequelize.sync();

module.exports = {
User: User
};

// user.routes.js
var express = require('express');
var router = express.Router();
var db = require('../db');

// create user endpoint
router.post('/', function(req, res) {
// get user data from request body
var userData = req.body;

// create user in database using sequelize
db.User.create(userData)
.then(function(user) {
// send success response with created user data
res.status(201).json(user);
})
.catch(function(error) {
// send error response with message
res.status(500).json({ message: error.message });
});
});

// read user endpoint by id
router.get('/:id', function(req, res) {
// get user id from request params
var userId = req.params.id;

// find user by id in database using sequelize
db.User.findByPk(userId)
.then(function(user) {
if (user) {
// send success response with found user data 
res.status(200).json(user);
} else {
// send not found response if no user found 
res.status(404).json({ message: 'User not found' });
}
})
.catch(function(error) {
// send error response with message 
res.status(500).json({ message: error.message });
});
});

// update user endpoint by id 
router.put('/:id', function(req, res) {
// get user id from request params 
var userId = req.params.id;

// get updated user data from request body 
var userData = req.body;

// find and update user by id in database using sequelize 
db.User.update(userData, { where: { id: userId } })
.then(function(rowsUpdated) {
if (rowsUpdated[0] > 0) {
// send success response if update successful 
res.status(200).json({ message: 'User updated' });
} else {
// send not found response if no rows updated 
res.status(404).json({ message: 'User not found' });
}
})
.catch(function(error) {
// send error response with message 
res.status(500).json({ message: error.message });
});
});

// delete user endpoint by id 
router.delete('/:id', function(req, res) {  
// get user id from request params  
var userId = req.params.id;

// delete user by id in database using sequelize  
db.User.destroy({ where: { id: userId } })
.then(function(rowsDeleted) {      
if (rowsDeleted > 0) {        
// send success response if delete successful        
res.status(200).json({ message: 'User deleted' });      
} else {        
// send not found response if no rows deleted        
res.status(404).json({ message: 'User not found' });      
}    
})    
.catch(function(error) {      
// send error response with message      
res.status(500).json({ message: error.message });    
});});

