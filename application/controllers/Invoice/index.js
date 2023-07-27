var express = require('express');
var router = express.Router();
router.use(`/invoice_management`, require(`./invoice_management`));

module.exports = router;