'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var express = require('express');
var controller = require('./controller');
var router = express.Router();


/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
router.get('/title/:title', controller.getFromTitle);
router.get('/gid/:gid', controller.getFromGid);
router.get('/developerName/:dName', controller.getFromDeveloperName);
router.get('/all', controller.getAll);
router.post('/insert', controller.insert);

module.exports = router;