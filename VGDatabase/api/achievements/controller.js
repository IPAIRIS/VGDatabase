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

	connect.query("SELECT * FROM achievement A, game G WHERE A.GID = " + req.params.gid + " AND A.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM achievement A, game G WHERE G.Title LIKE '%" + req.params.title + "%' AND A.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM achievement A, game G WHERE A.GID = " + req.params.gid + " AND  A.Number = " + req.params.number + " AND A.GID = G.GID", function(error, result, fields) {
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

	connect.query("SELECT * FROM achievement", function(error, result, fields) {
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

	var achievementStatement = "INSERT INTO achievement (Number, GID, Title, Description, Points) VALUES (" + req.body.Number + 
				"," + req.body.GID + ", '" + req.body.Title + "', '" + req.body.Description + "', " + req.body.Points + ")";			

	connect.query(achievementStatement, function(error, result, fields) {
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