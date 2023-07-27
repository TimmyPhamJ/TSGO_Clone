var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");

const EirModel = require("../../models/ordeirbulk_model");

router.get("/", auth, async function (req, res, next) {
  res.loadContent("Tools/RePrint", {});
});
router.post("/search", auth, function (req, res, next) {
  EirModel.searchRePrint(req)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
});
module.exports = router;
