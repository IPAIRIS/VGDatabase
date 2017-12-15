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

	connect.query("SELECT * FROM user WHERE UID = " + req.params.uid, function(error, result, fields) {
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

	connect.query("SELECT * FROM user WHERE Email LIKE '%" + req.params.email + "%'", function(error, result, fields) {
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

exports.getFromLastName = function(req, res) {

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

	connect.query("SELECT * FROM user WHERE LastName LIKE '%" + req.params.lastName + "%'", function(error, result, fields) {
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

	connect.query("SELECT * FROM user", function(error, result, fields) {
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
