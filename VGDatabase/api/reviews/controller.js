const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getFromUid = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT R.UID, R.GID, R.Stars, R.Title as rTitle, G.Title as gTitle, R.CreationDate, R.Body, P.Username FROM review R, game G, player P WHERE R.UID = " + req.params.uid + " AND R.UID = P.UID AND G.GID = R.GID", function(error, result, fields) {
		if (error) {
			console.log('Error in the query', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.getFromUsername = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT R.UID, R.GID, R.Stars, R.Title as rTitle, G.Title as gTitle, R.CreationDate, R.Body, P.Username FROM review R, game G, player P WHERE P.Username LIKE '%" + req.params.username + "%' AND R.UID = P.UID AND G.GID = R.GID", function(error, result, fields) {
		if (error) {
			console.log('Error in the query', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.getFromGid = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT R.UID, R.GID, R.Stars, R.Title as rTitle, G.Title as gTitle, R.CreationDate, R.Body, P.Username FROM review R, game G, player P WHERE G.GID = " + req.params.gid + " AND R.UID = P.UID AND G.GID = R.GID", function(error, result, fields) {
		if (error) {
			console.log('Error in the query', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.getFromGameTitle = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT R.UID, R.GID, R.Stars, R.Title as rTitle, G.Title as gTitle, R.CreationDate, R.Body, P.Username FROM review R, game G, player P WHERE G.Title LIKE '%" + req.params.title + "%' AND R.UID = P.UID AND G.GID = R.GID", function(error, result, fields) {
		if (error) {
			console.log('Error in the query', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.getAll = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT R.UID, R.GID, R.Stars, R.Title as rTitle, G.Title as gTitle, R.CreationDate, R.Body, P.Username FROM review R, game G, player P WHERE R.UID = P.UID AND G.GID = R.GID", function(error, result, fields) {
		if (error) {
			console.log('Error in the query', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.getFromKey = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};	

	connect.query("SELECT * FROM review R WHERE R.UID = " + req.params.uid + " AND R.GID = " + req.params.gid + "", function(error, result, fields) {
		if (error) {
			console.log('Error in the query');
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};

exports.insert = function(req, res) {

	const connect = mysql.createConnection({
		host: 'localhost',
		user: 'brett',
		password: 'password',
		database: 'VideoGameDB',
	});

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database');
		} else {
			console.log('Connected to Database');
		}
	});

	let response = {
		status:  200,
		data: [],
		message: null
	};

	console.log(req.body.foundedDate);

	var reviewStatement = "INSERT INTO review (UID, GID, Stars, Title, CreationDate, Body) VALUES (" + req.body.UID + 
				"," + req.body.GID + "," + req.body.Stars + ",'" + req.body.Title + "', CURTIME(), '" + req.body.Body + "')";			

	connect.query(reviewStatement, function(error, result, fields) {
		if (error) {
			console.log('Error in the query 1', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});
};
