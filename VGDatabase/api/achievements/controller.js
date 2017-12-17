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
exports.getFromGid = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("achievement", "A")
        .from("game","G")
        .where("A.GID = " + params.gid.replace(/["']/g, ""))
        .where("A.GID = G.GID")
        .toString();

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting achievements from GID', error);
		} else {
			console.log('get achievements from gid');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.getFromGameTitle = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("achievement", "A")
        .from("game","G")
        .where("G.Title LIKE '%" + params.gid.replace(/["']/g, "") + "%'")
        .where("A.GID = G.GID")
        .toString();

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting achievements from Title', error);
		} else {
			console.log('get achievements from game title');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.getFromKey = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("achievement", "A")
        .from("game","G")
        .where("A.GID = " + params.gid)
        .where("A.Number = " + params.number)
        .where("A.GID = G.GID")
        .toString();

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting achievements grom gid/number', error);
		} else {
			console.log('get achievements from key');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.getAll = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.select()
        .from("achievement", "A")
        .from("game","G")
        .where("A.GID = G.GID")
        .toString();

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error getting all achievements', error);
		} else {
			console.log('get all achievements');
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};

exports.insert = function(req, res) {

	connect.connect(function(error) {
		if (error) {
			console.log('Error Connecting to Database', error);
		} else {
			console.log('Connected to Database');
		}
	});

	var params = req.params;

	var query = squel.insert()
        .into("achievement")
        .set("Number", params.Number)
        .set("GID", params.GID)
        .set("Title", params.Title.replace(/["']/g, ""))
        .set("Description", params.Description.replace(/["']/g, ""))
        .set("Points", params.Points)
        .toString();              			

	connect.query(query, function(error, result, fields) {
		if (error) {
			console.log('Error inserting into achievement', error);
		} else {
			console.log('Inserting into achievement: ', query);
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			response.data = json;
			res.json(response);
		}
	});

	connect.end();
};