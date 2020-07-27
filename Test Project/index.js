require('dotenv').config();
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const twsRouter = require('./routes/web/tws');
const twsApiRouter = require('./routes/api/tws');

const connectDB = require('./middlewares/db');
connectDB.connect();

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/tws', twsRouter);
app.use('/api/tws', twsApiRouter);

app.get('/', function(req, res) {
    res.send('It works !');
});

app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 404;
    next(error);
});

app.listen(process.env.PORT, function() {
    console.log('Server running on localhost:' + process.env.PORT);
});

// connectDB.close();