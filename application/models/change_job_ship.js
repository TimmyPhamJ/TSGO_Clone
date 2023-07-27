const { rejects } = require("assert");
const { query } = require("express");
const moment = require("moment-timezone");
const { resolve } = require("path");
module.exports.Loaddata = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = await req
        .gtos("BS_WORKER_GROUP")
        .select("WorkerGroupName", "WorkerGroupID");
      resolve(result);
    } catch (error) {
      rejects(error);
    }
  });
};
module.exports.getItemName = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = await req.gtos("BS_ITEM").select("ItemName", "ItemID")
      resolve(result)
    } catch (error) {
      rejects(error)
    }
  })
}
module.exports.getDeviceID = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let result = await req.gtos("BS_DEVICE AS BD").select("BD.DeviceID").where("BD. DeviceTypeID", "QC")
      resolve(result)
    } catch (error) {
      rejects(error)
    }
  })
}
module.exports.getDataJobTally = async (req) => {

  return new Promise(async (resolve, rejects) => {
    try {
      let query = req.gtos("JOB_TALLY AS JT").select("JT.BillOfLading", "JT.BookingNo", "JT.VoyageKey", "JT.JobModeID", "JT.MethodID", "JT.ItemID", "BI.ItemName", "JT.Quantity", "JT.McWeight", "JT.Volume", "JT.JobStatus", "JT.DeviceID", "JT.TruckNo", "JT.WorkerGroupID", "JT.Note", "JT.rowguid", "BWG.WorkerGroupName", "JT.CreateTime", "BJM.JobModeName", "VSV.VesselName", "VSV.InboundVoyage", "VSV.OutboundVoyage", "BM.MethodName")
        .leftJoin("BS_ITEM AS BI", "JT.ItemID", "BI.ItemID")
        .leftJoin("BS_WORKER_GROUP AS BWG", "BWG.WorkerGroupID", "JT.WorkerGroupID")
        .leftJoin("BS_JOB_MODE AS BJM", "BJM.JobModeID", "JT.JobModeID")
        .leftJoin("DT_VESSEL_VISIT AS VSV", "VSV.VoyageKey", "JT.VoyageKey")
        .leftJoin("BS_METHOD AS BM", "BM.MethodID", "JT.MethodID")
      if (req.query.VoyageKey) {
        query.where("JT.VoyageKey", req.query.VoyageKey)
      }
      if (req.query.BookingNo) {
        query.where("JT.BookingNo", req.query.BookingNo)
      }
      if (req.query.BillOfLading) {
        query.where("JT.BillOfLading", req.query.BillOfLading)
      }
      if (req.query.ClassID) {
        query.where("JT.ClassID", req.query.ClassID)
      }
      if (req.query.workerStatus) {
        query.where("JT.JobStatus", req.query.workerStatus)
      }
      if (req.query.workerTeam) {
        query.where("JT.WorkerGroupID", req.query.workerTeam)
      }
      if (req.query.timeIn) {
        query.where("JT.CreateTime", ">=", req.query.timeIn.toString());
      }
      if (req.query.timeOut) {
        query.where("JT.CreateTime", "<", req.query.timeOut.toString());
      }
      let result = (await query.catch((err) => console.log(err))) || [];

      resolve(result)
    } catch (error) {
      rejects(error)
    }

  })
}
module.exports.saveData = async (req) => {
  return new Promise(async (resolve, rejects) => {
    try {
      var response = {
        iStatus: false,
        iMessage: "",
      };
      if (!req.body.data || !req.body.data.length) {
        response["iStatus"] = false;
        response["iMessage"] = "Không có dữ liệu cập nhật!";
        resolve(response);
      }
      let prm = [];
      for await (let item of (req.body.data)) {
        let dataObj = {};
        dataObj['MethodID'] = item['MethodID'];
        dataObj['ItemID'] = item['ItemID'];
        dataObj['Quantity'] = item['Quantity'] ? parseFloat(item['Quantity']) : 0;
        dataObj['McWeight'] = item['McWeight'] ? parseFloat(item['McWeight']) : 0;
        dataObj['Volume'] = item['Volume'] ? parseFloat(item['Volume']) : 0;
        dataObj['JobStatus'] = item['JobStatus'];
        dataObj['DeviceID'] = item['DeviceID'];
        dataObj['TruckNo'] = item["TruckNo"];
        dataObj['WorkerGroupID'] = item["WorkerGroupID"];
        dataObj['Note'] = item["Note"];
        prm.push(req.gtos('JOB_TALLY').where('rowguid', item.rowguid || null).update(dataObj));
      }
      let flag = false
      await Promise.all(prm)
        .then(() => {
          flag = true;
        })
        .catch((err) => {
          rejects(err)
        });
      if (flag) {
        response["iStatus"] = true;
        response["iMessage"] = "Cập nhật thành công!";
        resolve(response);
      } else {
        response["iStatus"] = false;
        response["iMessage"] = "Cập nhật thất bại!";
        resolve(response);
      }
    } catch (error) {
      rejects(error)
    }
  })
}
