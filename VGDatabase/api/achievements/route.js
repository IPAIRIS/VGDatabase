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
router.get('/gameTitle/:title', controller.getFromGameTitle);
router.get('/key/:gid/:number', controller.getFromKey);
router.get('/all', controller.getAll);
router.post('/insert', controller.insert);

module.exports = router;