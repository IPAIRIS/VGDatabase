const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var config = require('config');
var squel = require("squel");

const sqlConfig = config.get('mySQL.Config');

const connect = mysql.createConnection({
	host: sqlConfig.host,
	user: sqlConfig.user,
	password: sqlConfig.password,
	database: sqlConfig.database,
});

let response = {
	status:  200,
	data: [],
	message: null
};	

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getFromUid = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("developer", "D")
        .from("user","U")
        .where("D.UID = " + params.uid)
        .where("D.UID = U.UID")
        .toString();	

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting developer from uid', error);
		} else {
			console.log('Get developer from uid');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.getFromName = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("developer", "D")
        .from("user","U")
        .where("D.Name LIKE '%" + params.name.replace(/["']/g, "") + "%'")
        .where("D.UID = U.UID")
        .toString();	

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting developer from name', error);
		} else {
			console.log('Get developer from name');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.getFromEmail = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("developer", "D")
        .from("user","U")
        .where("U.Email LIKE '%" + params.name.replace(/["']/g, "") + "%'")
        .where("D.UID = U.UID")
        .toString();	

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting developer from email', error);
		} else {
			console.log('Get developers from emails');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();

	connect.query("SELECT * FROM developer D, user U WHERE U.Email LIKE '" + req.params.email + "' AND D.UID = U.UID", function(error, result, fields) {
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

	connect.query("SELECT * FROM developer D, user U WHERE U.UID = D.UID", function(error, result, fields) {
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
	var developerStatement = "INSERT INTO developer (UID, Description, Founded, Name) VALUES (LAST_INSERT_ID(), '" + req.body.Description + 
				"','" + req.body.Founded + "','" + req.body.Name + "')";				

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
	connect.query(developerStatement, function(error, result, fields) {
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