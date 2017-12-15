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
router.get('/gid/:gid', controller.getFromGid);
router.get('/email/:email', controller.getFromEmail);
router.get('/all', controller.getAll);
router.post('/insert', controller.insert);

module.exports = router;