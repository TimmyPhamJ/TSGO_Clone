const FunctionModel = require('./FunctionModel.js');


module.exports.loadTallyData = async (req) => {
    let query=req.gtos('DT_MNF_LD_BULK')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','DT_MNF_LD_BULK.JobModeID')
    .leftJoin('BS_METHOD','BS_METHOD.MethodID','DT_MNF_LD_BULK.MethodID')
    .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','DT_MNF_LD_BULK.TransitID')
    .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','DT_MNF_LD_BULK.VoyageKey')
    .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
    .leftJoin('JOB_TALLY','JOB_TALLY.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .select('DT_MNF_LD_BULK.rowguid','DT_MNF_LD_BULK.ClassID','DT_MNF_LD_BULK.MethodID','BS_METHOD.MethodName','DT_MNF_LD_BULK.CreateTime','DT_MNF_LD_BULK.BillOfLading','DT_MNF_LD_BULK.BookingNo','DT_MNF_LD_BULK.ItemID','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight','DT_MNF_LD_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
    .where('DT_MNF_LD_BULK.LDStatus','B')
    .groupByRaw('DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.ClassID,DT_MNF_LD_BULK.MethodID,BS_METHOD.MethodName,DT_MNF_LD_BULK.CreateTime,DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo,DT_MNF_LD_BULK.ItemID,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight,DT_MNF_LD_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
    .orderBy('DT_MNF_LD_BULK.CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'DT_MNF_LD_BULK');
    console.error(query.toString());
    return await query.catch(err => console.log(err)) || [];
}

module.exports.saveTallyData = async (req) => {
    let item=req.body;
    delete item['rowguid'];
    let check = await req.gtos('DT_MNF_LD_BULK')
    .leftJoin('JOB_TALLY','JOB_TALLY.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .select('DT_MNF_LD_BULK.rowguid','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
    .where('DT_MNF_LD_BULK.rowguid',item.RefRowguid)
    .groupByRaw('DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight');
    if(!(check||[])[0]){
        throw "Không tồn tại dữ liệu !";return;
    }
    console.log(check[0].ActualQuantity,item.Quantity,check[0].Quantity);
    if((check[0].ActualQuantity+parseInt(item.Quantity))>check[0].Quantity){
        throw "Vượt quá số lượng !";return;
    }
    //let checkSum = await req.gtos('JOB_TALLY').select(req.gtos.raw('SUM(Quantity) as Quantity, SUM(McWeight) as McWeight')).insert(item); 
    item['CreatedBy'] = req.session.userdata["UserID"];
    let rt = await req.gtos('JOB_TALLY').insert(item); 
    return rt;
}

module.exports.viewHis = async (req) => {
    let query=req.gtos('JOB_TALLY')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','JOB_TALLY.ItemID')
    .leftJoin('BS_WORKER_GROUP','BS_WORKER_GROUP.WorkerGroupID','JOB_TALLY.WorkerGroupID')
    .leftJoin('BS_DEVICE','BS_DEVICE.DeviceID','JOB_TALLY.DeviceID')
    .select('JOB_TALLY.*','BS_ITEM.ItemName','BS_DEVICE.DeviceName','BS_WORKER_GROUP.WorkerGroupID')
    .where('JOB_TALLY.CreatedBy',req.session.userdata["UserID"])
    .limit(1000)
    .orderBy('JOB_TALLY.CreateTime','asc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_TALLY');
    console.error(query.toString());
    return await query.catch(err => console.log(err)) || [];
}