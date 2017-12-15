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
router.get('/gid/:gid', controller.getFromGid);
router.get('/uid/:uid', controller.getFromUid);
router.get('/username/:usename', controller.getFromUsername);
router.get('/gameTitle/:title', controller.getFromGameTitle);
router.get('/all', controller.getAll);
router.post('/insert', controller.insert);

module.exports = router;