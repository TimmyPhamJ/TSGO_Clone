var express = require('express');
var router = express.Router();
router.use(`/`, require(`./yard`));

module.exports = router;