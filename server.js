'use strict';

require('dotenv').config();


/////////////////////// DEPENDENCIES
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const { response } = require('express');

/////////////////////// APPLICATION SETUP
const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

/////////////////////// APPLICATION MIDDLEWARE (HELPERS)
/////////////////////// CORS
app.use(cors());

/////////////////////// MORGAN - REQUEST LOGGER - SHOWS MORE DETAIL ON EVERY PAGE LOAD.
app.use(morgan("dev"));

/////////////////////// ROUTE DEFINITIONS
app.use(express.static('./public'));

app.get('/', serverHandler);
app.get('/other-stuff', handleOtherStuff);
app.get('/hi', handleHi );
app.get('/example', handleExample );
app.get('/example', handleExample );
app.get('/example', handleExample );
app.get('/example', handleExample );
app.get('/example', handleExample );

app.use('*', handleNotFound);
app.use(handleError);

/////////////////////// ROUTE HANDLERS
function serverHandler(req,res){
    res.status(200).send('This server is working!');
};

function handleHi(req,res){
    res.render('hello');
};

function notFoundHandler(req,res) {
    response.status(404).send('Error 404: Something went wrong yo!');
};



// Stopped at https://frontrowviews.com/Home/Event/Play/5ec5bc82d28f0a0cf8044a4b @ 00:54:35 YSS 8:12:56PM 07/09/2020



app.listen(PORT, () => console.log(`App is listening on ${PORT}`));




