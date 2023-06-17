var express = require('express');
var router = express.Router();
router.use(`/`, require(`./tally`));

module.exports = router;