var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/api');

/* GET home page. */
router.get('/', Controllers.getIndex);

module.exports = router;
