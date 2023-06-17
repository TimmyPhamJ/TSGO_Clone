var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");

router.get("/", auth, async function (req, res, next) {
  res.loadContent("reportAndStatistics/rpTally");
});
module.exports = router;
