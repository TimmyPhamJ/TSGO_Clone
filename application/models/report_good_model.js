const { resolve } = require("path");
const FunctionModel = require("./FunctionModel.js");
const moment = require("moment-timezone");
const { rejects } = require("assert");
module.exports.getItemName = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = [];
      let result_itemname = await req.gtos("BS_ITEM").select("ItemName");
      let result_jobmodename = await req
        .gtos("BS_JOB_MODE")
        .select("JobModeName");
      result.push(result_itemname, result_jobmodename);
      resolve(result);
    } catch (error) {
      rejects(error);
    }
  });
};
module.exports.getEntranceReport = async (req) => {
  try {
    console.log(req.body);
  } catch (error) {}
};
