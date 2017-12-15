// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var Q 			= require('q');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/games', require('./api/games/route'));
app.use('/api/users', require('./api/users/route'));
app.use('/api/players', require('./api/players/route'));
app.use('/api/developers', require('./api/developers/route'));
app.use('/api/moderators', require('./api/moderators/route'));
app.use('/api/reviews', require('./api/reviews/route'));
app.use('/api/purchases', require('./api/purchases/route'));
app.use('/api/achievements', require('./api/achievements/route'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));