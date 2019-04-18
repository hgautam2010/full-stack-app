const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const threads = require('./routes/api/threads');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Connection
const db = require('./config/keys').mongoURI;
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected.'))
	.catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/threads', threads);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));