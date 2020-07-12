'use strict';

require('dotenv').config();

/////////////////////// DEPENDENCIES
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const {
    response
} = require('express');
const {
    post
} = require('superagent');

/////////////////////// APPLICATION SETUP
const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

/////////////////////// APPLICATION MIDDLEWARE (HELPERS)
/////////////////////// CORS
app.use(cors());

/////////////////////// MORGAN - REQUEST LOGGER - SHOWS MORE DETAIL ON EVERY PAGE LOAD.
app.use(morgan("dev"));

/////////////////////// NEED THIS IN ORDER TO DEAL WITH FORMS.
app.use(express.urlencoded({
    extended: true
}));

/////////////////////// ROUTE DEFINITIONS
app.use(express.static('./public'));

app.get('/', serverHandler);
// app.get('/other-stuff', handleOtherStuff);
// app.get('/hi', handleHi );
app.get('/searches/new', searchesHandler);
app.post('/searches', searchResultHandler);
// app.post('/searches', (req,res) => {
//     console.log('////////////////////////// NEW SEARCH //////////////////////////')
//     console.log(req.body);
//     res.send(`The book title that you searched for was: ${req.body.title} by author: ${req.body.author} `);
// });



// app.post('/searches/new', searchesHandler );
// app.get('/example', handleExample );
// app.get('/example', handleExample );
// app.get('/example', handleExample );
// app.get('/example', handleExample );

// app.use('*', handleNotFound);
// app.use(handleError);

/////////////////////// ROUTE HANDLERS



function serverHandler(req, res) {
    res.status(200).send('This server is working!');
};



function handleHi(req, res) {
    res.render('hello');
};

// function searchesHandler(req,res){
//     app.post() something like this??
// };



function searchesHandler(req, res) {
    res.render('pages/searches/new');
};



// function APIsearchHandler(userSearch, response) {
//     const API = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}`;

//     console.log('//////// Searching API... ////////')
//     superagent
//         .get(API)
//         .then(APIdata => {
//             response.status(200).send(APIdata);
//             console.log(APIdata);
//         })
//         .then(console.log('//////// API Search Completed... ////////'))
// };


//////////// SEARCH RESULT HANDLER
function searchResultHandler(req, res) {
    // console.log('////////////////////////// NEW SEARCH //////////////////////////')
    // console.log(req.body);
    
    const API = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}`;
    
    // console.log('//////// Searching API... ////////')
    superagent
    .get(API)
    // .then(console.log(API))
    .then(data => {
        let bookItems = data.body.items;
        // let bookRoot = data.body.items.volumeInfo;

        //make a .map or forEach loop that loops through each Item/book, send it through the constructor.
        
        // console.log(bookItems);
        // response.status(200).send(bookItems);
        
        //MADE A COUNTER FOR HOW MANY BOOKS WERE FOUND. IT COUNTS HOW MANY OBJECTS THERE WERE. NOT SURE IF 10 IS THE LIMIT.
        
        // let i = 0;
        let filteredSearchResults = [];
        bookItems.forEach(data => {
            let constructedBookItems = new bookSearch(data);
            // console.log('///////////////////constructed book items: /////////////////', constructedBookItems);
            filteredSearchResults.push(constructedBookItems);
            // i++;
        });
        // console.log('number of searches found: ',i);
        res.send(`The book title that you searched for was: ${req.body.title} by author: ${req.body.author}`);
    })
    // .then(console.log('//////// API Search Completed... ////////'))
    };



function notFoundHandler(req, res) {
    response.status(404).send('Error 404: Something went wrong yo!');
};

//constructor function 

function bookSearch(obj) {
    this.title = obj.volumeInfo.title;
    this.author = obj.volumeInfo.authors;
    this.description = obj.volumeInfo.description;
    this.image = obj.volumeInfo.imageLinks.thumbnail;
    // this.isbn = obj.volumeInfo.industryIdentifiers.identifiers.identifier;
    this.isbn = ((obj.volumeInfo.industryIdentifiers) ? obj.volumeInfo.industryIdentifiers : 'no isbn') || 'error no isbn';
    // this.isbn = obj.volumeInfo.industryIdentifiers.[{identifiers,identifiers}];

};

// BTW, the route is "data.body.items", that's how the data populates. That should probably automatically be passed through the 'obj', like you have it.
// It will turn into data.body.items.title, data.body.items.authors.. etc... Nice Work!

// BRB 

// Stopped at https://frontrowviews.com/Home/Event/Play/5ec5bc82d28f0a0cf8044a4b @ 00:54:35 YSS 8:12:56PM 07/09/2020



app.listen(PORT, () => console.log(`App is listening on ${PORT}`));