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

	connect.query("SELECT * FROM player P, user U WHERE P.UID = " + req.params.uid + " AND P.UID = U.UID", function(error, result, fields) {
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

	connect.query("SELECT * FROM player P, user U WHERE P.Username LIKE '%" + req.params.username + "%' AND U.UID = P.UID", function(error, result, fields) {
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

exports.getFromEmail = function(req, res) {

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

	connect.query("SELECT * FROM player P, user U WHERE U.Email LIKE '" + req.params.email + "' AND U.UID = P.UID", function(error, result, fields) {
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

	connect.query("SELECT * FROM player P, user U WHERE U.UID = P.UID", function(error, result, fields) {
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

	var userStatement = "INSERT INTO user (UID, Email, FirstName, LastName, Password) VALUES (NULL, '" + req.body.Email + 
				"','" + req.body.FirstName + "','" + req.body.LastName + "','" + req.body.Password + "')";
	var playerStatement = "INSERT INTO player (UID, Username) VALUES (LAST_INSERT_ID(), '" + req.body.Username + "')";				

	connect.query(userStatement, function(error, result, fields) {
		if (error) {
			console.log('Error in the query 1', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
		}
	});

	connect.query(playerStatement, function(error, result, fields) {
		if (error) {
			console.log('Error in the query 2', error);
		} else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			console.log(json);
			res.json(response);
		}
	});	
};