const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.getDatabase());
mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.log('Error Connecting to DB' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

//Server Start
app.listen(port, () => {
  console.log('Server started on ' + port);
});
