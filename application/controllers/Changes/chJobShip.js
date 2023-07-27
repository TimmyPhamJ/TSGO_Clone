var express = require("express");
var router = express.Router();
var auth = require("../../middlewares/authentication");
const jobShipModal = require("../../models/change_job_ship");
router.get("/", auth, async function (req, res, next) {
	let result = await jobShipModal.Loaddata(req);
	let resultItem = await jobShipModal.getItemName(req)
	let resultDevice = await jobShipModal.getDeviceID(req)
	res.loadContent("Changes/chJobShip", { result, resultItem, resultDevice });
});
router.get("/getDataJobTally", auth, async function (req, res, next) {
	try {
		let result = await jobShipModal.getDataJobTally(req)
		if (result?.length > 0) {
			return res.status(200).json({
				errCode: 0,
				result: result,
				message: "Load data sucess"
			})
		}
		else {
			return res.status(200).json({
				errCode: 1,
				message: "No data with server"
			})
		}
	} catch (error) { }
})
router.post("/save", auth, async function (req, res, next) {

	try {
		let result = await jobShipModal.saveData(req)
		if (result) {
			return res.status(200).json({
				errCode: 0,
				message: "sucess",
				data: result
			})
		}
		else {
			return res.status(200).json({
				errCode: 1,
				message: "Cap nhat that bai",
				data: result
			})
		}
	} catch (error) {

	}
})

module.exports = router;
