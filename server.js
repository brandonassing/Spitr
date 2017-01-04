// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tweet');

var Tweet = require('./tweet');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// more routes for our API will happen here
// on routes that end in /tweets
// ----------------------------------------------------
router.route('/tweets')

// create a tweet (accessed at POST http://localhost:8080/api/tweets)
.post(function(req, res) {

    var tweet = new Tweet(); // create a new instance of the tweet model
    console.log("post");
    // window.alert("hit");
    tweet.content = req.body.content; // set the tweets name 
    tweet.key = req.body.key;
    // save the tweet and check for errors
    tweet.save(function(err) {
        if (err)
            return res.send(err);

        res.json({
            message: 'Tweet created!'
        });


    });
})

.get(function(req, res) {
    console.log("gotten");
    Tweet.find(function(err, tweet) {
        if (err)
            return res.send(err);

        res.json(tweet);
    });

});

// on routes that end in /tweets/:tweet_id
// ----------------------------------------------------
router.route('/tweets/:tweet_id')

// get the tweet with that id (accessed at GET http://localhost:8080/api/tweets/:tweet_id)
.get(function(req, res) {
        Tweet.findById(req.params.tweet_id, function(err, tweet) {
            if (err)
                res.send(err);
            res.json(tweet);
        });
    })
    .put(function(req, res) {

        // use our tweet model to find the tweet we want
        Tweet.findById(req.params.tweet_id, function(err, tweet) {

            if (err)
                res.send(err);

            tweet.content = req.body.content; // update the tweets info

            // save the tweet
            tweet.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Tweet edited!'
                });
            });

        });
    })
    .delete(function(req, res) {
        Tweet.remove({
            _id: req.params.tweet_id
        }, function(err, tweet) {
            if (err)
                res.send(err);

            res.json({
                message: 'Sucessfully deleted'
            });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/public', express.static('public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
