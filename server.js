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
const PORT = process.env.PORT || 3000;

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
app.get('/searches/new', searchesPageHandler);
app.post('/searches', searchResultHandler);
app.get('/bad', (req, res) => {
    throw new Error('Testing Forced Errors');
  });

// app.get('/example', handleExample );
app.use('*', handleNotFound);
app.use(handleError);



/////////////////////// ROUTE HANDLERS

//////////// SERVER HANDLER
function serverHandler(req, res) {
    res.status(200).send('This server is working!');
};

//////////// SEARCH PAGE HANDLER
function searchesPageHandler(req, res) {
    res.render('pages/searches/new');
};

//////////// SEARCH RESULT HANDLER
function searchResultHandler(req, res) {
    console.log('////////////////////////// NEW SEARCH //////////////////////////')
    const API = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}`;

    superagent
        .get(API)
        .then(data => {
            let bookItems = data.body.items;
            
            ////////.map Method
            let filteredSearchResults = bookItems.map((data) => new bookSearch(data));
            
            //////////// forEach Method
            // let filteredSearchResults = [];
            // bookItems.forEach(data => {
            //     let constructedBookItems = new bookSearch(data);
            //     filteredSearchResults.push(constructedBookItems);
            // });

            //////////// CONSOLE LOG CHECK
            console.log(filteredSearchResults);
            // res.json(filteredSearchResults);
            // let objTitle = filteredSearchResults[0].title;
            let searchTitle = req.body.title;
            let searchAuthor = req.body.author;
            res.render('pages/searches/show',
            {books: filteredSearchResults, searchTitle, searchAuthor},
            );
            // console.log('//////////////// Line 87 /////////////////: ',books.filteredSearchResults);
            //  {formdata: req.body} 
            // , 
            //constructor function 

            function bookSearch(obj) {
                this.title = obj.volumeInfo.title;
                this.author = ((obj.volumeInfo.authors) ? obj.volumeInfo.authors : 'No author provided') || 'Error, no author';
                this.description = ((obj.volumeInfo.description) ? obj.volumeInfo.description : 'No description provided') || 'Error, no description';
                this.image = ((obj.volumeInfo.imageLinks) ? obj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg') || 'error no thumbnail';
                this.isbn = ((obj.volumeInfo.industryIdentifiers) ? obj.volumeInfo.industryIdentifiers[0] : 'no isbn') || 'error no isbn';
                // this.author = obj.volumeInfo.authors;
                // this.description = obj.volumeInfo.description;
                // this.image = obj.volumeInfo.imageLinks.thumbnail;
                //need to make an isbn filter
                // this.isbn = ((obj.volumeInfo.industryIdentifiers) ? obj.volumeInfo.industryIdentifiers : 'no isbn') || 'error no isbn';
            };
            
        })
};
    

//////////// SEARCH NO FOUND HANDLER
function handleNotFound(req, res) {
    response.status(404).send('Error 404: Something went wrong yo!');
};

//////////// SEARCH NO FOUND HANDLER
function handleError(error, req, res, next) {
    let errorMessage = 'this is a test';
    res.render('pages/error')
    // response.status(500).send('Error 500: Some error occured');
};

    
//////////// PORT LISTENER
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
    



    
    /////////////////////// OLD CODE SAVED FOR EXAMPLES ///////////////////////
    
    // res.send(`The book title that you searched for was: ${req.body.title} by author: ${req.body.author}`);
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

// app.post('/searches', (req,res) => {
//     console.log('////////////////////////// NEW SEARCH //////////////////////////')
//     console.log(req.body);
//     res.send(`The book title that you searched for was: ${req.body.title} by author: ${req.body.author} `);
// });