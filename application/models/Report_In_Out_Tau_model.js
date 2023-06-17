const FunctionModel = require("../models/FunctionModel");
const { gtos, gtosglobal } = require("../config/database");
const moment = require("moment-timezone");

module.exports.LoadDevice = async (req) => {
  let query = req
    .gtos("BS_DEVICE")
    .select(
      "BS_DEVICE.DeviceTypeID",
      "BS_DEVICE.DeviceID",
      "BS_DEVICE.DeviceName"
    );
  query = FunctionModel.KnexWhere(query, req.body.filter, "BS_DEVICE");
  return (await query.catch((err) => console.log(err))) || [];
};

module.exports.LoadWorker = async (req) => {
  let query = req
    .gtos("BS_WORKER_GROUP")
    .select("BS_WORKER_GROUP.WorkerGroupID", "BS_WORKER_GROUP.WorkerGroupName");
  query = FunctionModel.KnexWhere(query, req.body.filter, "BS_WORKER_GROUP");
  return (await query.catch((err) => console.log(err))) || [];
};
