var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router();

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride()); 

const { Sequelize, Model, DataTypes } = require('sequelize');
// simulate DELETE and PUT
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
class User extends Model {}
User.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();
// router.get('/', function(req, res, next) {
//     // User.create({
//     //     name: req.query.id
//     // });
//     console.log('asdsd', req.query.id)
//     // res.render('index.html');
// });

 
// router.get('/all',function(req, res, next) {
//     User.findAll().then(users => {
//         res.json(users);
//     });
// })

// app.use('/', router);


app.listen(port);
console.log('App running on port', port);