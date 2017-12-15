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
router.get('/uid/:uid', controller.getFromUid);
router.get('/email/:email', controller.getFromEmail);
router.get('/lastName/:lastName', controller.getFromLastName);
router.get('/all', controller.getAll);

module.exports = router;