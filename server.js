const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
 
const users = require('./routes/api/users.routes');
const servers = require('./routes/api/servers.routes');
const messages = require('./routes/api/messages.routes');

const app = express()

// Bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys.config').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));

// Passsport Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport.config')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/servers', passport.authenticate('jwt', { session: false }), servers);
app.use('/api/messages', passport.authenticate('jwt', { session: false }), messages);

const port = process.env.PORT || 8080; 

app.listen(port, () => console.log(`Server up and running on port ${port}!`));