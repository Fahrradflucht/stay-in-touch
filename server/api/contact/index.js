'use strict';

var express = require('express');
var controller = require('./contact.controller');

var router = express.Router();

var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/interactions', auth.isAuthenticated(), controller.createInteraction);
router.delete('/:id/interactions/:interactionId', auth.isAuthenticated(), controller.destroyInteraction);

module.exports = router;
