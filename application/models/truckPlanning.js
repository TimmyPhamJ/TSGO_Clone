const { resolve } = require("path");
const FunctionModel = require("./FunctionModel.js");
const moment = require("moment-timezone");
const { rejects } = require("assert");

module.exports.saveData = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let prm = [];
      if (req?.body?.data?.length > 0) {
        await req
          .gtos("PLAN_DEVICE")
          .where({
            VoyageKey: req.body.data[0].VoyageKey,
          })
          .del();
      } else {
        await req
          .gtos("PLAN_DEVICE")
          .where({
            VoyageKey: req.body.VoyageKey,
          })
          .del();
      }
      for await (let item of req.body.data || []) {
        prm.push(req.gtos("PLAN_DEVICE").insert(item));
      }
      let rt = false;
      await Promise.all(prm)
        .then(() => {
          rt = true;
        })
        .catch((err) => {
          console.log(err);
        });
      resolve(rt);
    } catch (error) {
      console.log(error);
      rejects(error);
    }
  });
};
module.exports.getTruckPlanning = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result1 = await req
        .gtos("PLAN_DEVICE AS PD")
        .select("*")
        .where("PD.isLease", 2)
        .where("PD.VoyageKey", req.query.VoyageKey);
      let result = await req
        .gtos("BS_DEVICE AS BSD")
        .select("BSD.*", "PD.rowguid AS checked")
        .leftJoin("PLAN_DEVICE AS PD", function () {
          this.on("PD.DeviceID", "BSD.DeviceID").on(
            "PD.VoyageKey",
            req.gtos.raw(":VoyageKey", { VoyageKey: req.query.VoyageKey })
          );
        })
        .where("BSD.DeviceTypeID", "YT");
      let data = [...result, ...result1];
      resolve(data);
    } catch (error) {
      console.log(error);
      rejects(error);
    }
  });
};
