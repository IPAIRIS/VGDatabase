const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
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

	connect.query("SELECT * FROM purchase PC, game G, Player P WHERE PC.GID = " + req.params.gid + " AND PC.UID = P.UID AND PC.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM purchase PC, game G, Player P WHERE PC.UID = " + req.params.uid + " AND PC.UID = P.UID AND PC.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM purchase PC, game G, Player P WHERE P.Username LIKE '%" + req.params.username + "%' AND PC.UID = P.UID AND PC.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM purchase PC, game G, Player P WHERE G.Title LIKE '%" + req.params.title + "%' AND PC.UID = P.UID AND PC.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM purchase PC, game G, Player P WHERE PC.UID = P.UID AND PC.GID = G.GID", function(error, result, fields) {
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

	var purchaseStatement = "INSERT INTO purchase (GID, UID, PurchaseDate) VALUES (" + req.body.GID + 
				"," + req.body.UID + ", CURTIME())";			

	connect.query(purchaseStatement, function(error, result, fields) {
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