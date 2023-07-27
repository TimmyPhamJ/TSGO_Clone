const FunctionModel = require('./FunctionModel.js');


module.exports.loadTallyData = async (req) => {
    let query;
    let rt=[];
    if(req.body.ClassID=='1'){
        query=req.gtos('DT_MNF_LD_BULK')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
        .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','DT_MNF_LD_BULK.JobModeID')
        .leftJoin('BS_METHOD','BS_METHOD.MethodID','DT_MNF_LD_BULK.MethodID')
        .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','DT_MNF_LD_BULK.TransitID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','DT_MNF_LD_BULK.VoyageKey')
        .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
        .leftJoin('JOB_TALLY','JOB_TALLY.RefRowguid','DT_MNF_LD_BULK.rowguid')
        .select('DT_MNF_LD_BULK.JobModeID','DT_MNF_LD_BULK.rowguid','DT_MNF_LD_BULK.ClassID','DT_MNF_LD_BULK.MethodID','BS_METHOD.MethodName','DT_MNF_LD_BULK.CreateTime','DT_MNF_LD_BULK.BillOfLading','DT_MNF_LD_BULK.BookingNo','DT_MNF_LD_BULK.ItemID','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight','DT_MNF_LD_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
        .where('DT_MNF_LD_BULK.LDStatus','B')
        .where('DT_MNF_LD_BULK.JobModeID','!=','NGTH')
        .where('DT_MNF_LD_BULK.VoyageKey',req.body.VoyageKey)
        .where('DT_MNF_LD_BULK.ClassID',req.body.ClassID)
        .groupByRaw('DT_MNF_LD_BULK.JobModeID,DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.ClassID,DT_MNF_LD_BULK.MethodID,BS_METHOD.MethodName,DT_MNF_LD_BULK.CreateTime,DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo,DT_MNF_LD_BULK.ItemID,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight,DT_MNF_LD_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
        .orderBy('DT_MNF_LD_BULK.CreateTime','desc');
        rt=await query.catch(err => console.log(err)) || [];
        let gates =await req.gtos('ORD_EIR_BULK')
        .leftJoin('JOB_GATE','JOB_GATE.PinCode','ORD_EIR_BULK.PinCode')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','ORD_EIR_BULK.ItemID')
        .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','ORD_EIR_BULK.JobModeID')
        .leftJoin('BS_METHOD','BS_METHOD.MethodID','ORD_EIR_BULK.MethodID')
        .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','ORD_EIR_BULK.TransitID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','ORD_EIR_BULK.VoyageKey')
        .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
        .leftJoin('JOB_TALLY',req.gtos.raw('(CONCAT(ORD_EIR_BULK.BillOfLading,ORD_EIR_BULK.BookingNo) = CONCAT(JOB_TALLY.BillOfLading,JOB_TALLY.BookingNo) and ORD_EIR_BULK.ClassID=JOB_TALLY.ClassID and ORD_EIR_BULK.VoyageKey=JOB_TALLY.VoyageKey)'))
        .select('JOB_GATE.JobModeID','JOB_GATE.Remark','JOB_GATE.rowguid','JOB_GATE.TruckNo','ORD_EIR_BULK.ClassID','ORD_EIR_BULK.MethodID','BS_METHOD.MethodName','ORD_EIR_BULK.CreateTime','ORD_EIR_BULK.BillOfLading','ORD_EIR_BULK.BookingNo','ORD_EIR_BULK.ItemID','ORD_EIR_BULK.Quantity','ORD_EIR_BULK.CargoWeight','ORD_EIR_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
        .where('ORD_EIR_BULK.JobModeID','NGTH')
        .whereNotNull('JOB_GATE.rowguid')
        .whereNull('JOB_GATE.Quantity')
        .where('ORD_EIR_BULK.VoyageKey',req.body.VoyageKey)
        .where('ORD_EIR_BULK.ClassID',req.body.ClassID)
        .groupByRaw('JOB_GATE.JobModeID,JOB_GATE.Remark,JOB_GATE.rowguid,JOB_GATE.TruckNo,ORD_EIR_BULK.ClassID,ORD_EIR_BULK.MethodID,BS_METHOD.MethodName,ORD_EIR_BULK.CreateTime,ORD_EIR_BULK.BillOfLading,ORD_EIR_BULK.BookingNo,ORD_EIR_BULK.ItemID,ORD_EIR_BULK.Quantity,ORD_EIR_BULK.CargoWeight,ORD_EIR_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
        .orderBy('ORD_EIR_BULK.CreateTime','desc').catch(err => console.log(err)) || [];
        rt.push(...gates);
    }
    else{
        query=req.gtos('JOB_YARD')
        .leftJoin('DT_MNF_LD_BULK','DT_MNF_LD_BULK.rowguid','JOB_YARD.RefRowguid')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
        .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','DT_MNF_LD_BULK.JobModeID')
        .leftJoin('BS_METHOD','BS_METHOD.MethodID','DT_MNF_LD_BULK.MethodID')
        .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','DT_MNF_LD_BULK.TransitID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','DT_MNF_LD_BULK.VoyageKey')
        .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
        .select('JOB_YARD.JobModeID','JOB_YARD.Note','JOB_YARD.TruckNo','DT_MNF_LD_BULK.rowguid as RefRowguid','JOB_YARD.rowguid','DT_MNF_LD_BULK.ClassID','DT_MNF_LD_BULK.MethodID','BS_METHOD.MethodName','DT_MNF_LD_BULK.CreateTime','DT_MNF_LD_BULK.BillOfLading','DT_MNF_LD_BULK.BookingNo','DT_MNF_LD_BULK.ItemID','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight','DT_MNF_LD_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars','JOB_YARD.Quantity as ActualQuantity','JOB_YARD.McWeight as ActualWeight')
        .where('JOB_YARD.ClassID','2')
        .where('JOB_YARD.MethodID','BAI-TAU')
        .where('DT_MNF_LD_BULK.VoyageKey',req.body.VoyageKey)
        .whereNull('JOB_YARD.FinishDate')
        //.groupByRaw('DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.ClassID,DT_MNF_LD_BULK.MethodID,BS_METHOD.MethodName,DT_MNF_LD_BULK.CreateTime,DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo,DT_MNF_LD_BULK.ItemID,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight,DT_MNF_LD_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
        .orderBy('DT_MNF_LD_BULK.CreateTime','desc');
        rt=await query.catch(err => console.log(err)) || [];
        let gates =await req.gtos('ORD_EIR_BULK')
        .leftJoin('JOB_GATE','JOB_GATE.PinCode','ORD_EIR_BULK.PinCode')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','ORD_EIR_BULK.ItemID')
        .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','ORD_EIR_BULK.JobModeID')
        .leftJoin('BS_METHOD','BS_METHOD.MethodID','ORD_EIR_BULK.MethodID')
        .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','ORD_EIR_BULK.TransitID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','ORD_EIR_BULK.VoyageKey')
        .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
        .leftJoin('JOB_TALLY',req.gtos.raw('(CONCAT(ORD_EIR_BULK.BillOfLading,ORD_EIR_BULK.BookingNo) = CONCAT(JOB_TALLY.BillOfLading,JOB_TALLY.BookingNo) and ORD_EIR_BULK.ClassID=JOB_TALLY.ClassID and ORD_EIR_BULK.VoyageKey=JOB_TALLY.VoyageKey)'))
        .select('JOB_GATE.JobModeID','JOB_GATE.Remark','JOB_GATE.rowguid','JOB_GATE.TruckNo','ORD_EIR_BULK.ClassID','ORD_EIR_BULK.MethodID','BS_METHOD.MethodName','ORD_EIR_BULK.CreateTime','ORD_EIR_BULK.BillOfLading','ORD_EIR_BULK.BookingNo','ORD_EIR_BULK.ItemID','ORD_EIR_BULK.Quantity','ORD_EIR_BULK.CargoWeight','ORD_EIR_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
        .where('ORD_EIR_BULK.JobModeID','XGTH')
        .whereNotNull('JOB_GATE.rowguid')
        .whereNull('JOB_GATE.Quantity')
        .where('ORD_EIR_BULK.VoyageKey',req.body.VoyageKey)
        .where('ORD_EIR_BULK.ClassID',req.body.ClassID)
        .groupByRaw('JOB_GATE.JobModeID,JOB_GATE.Remark,JOB_GATE.rowguid,JOB_GATE.TruckNo,ORD_EIR_BULK.ClassID,ORD_EIR_BULK.MethodID,BS_METHOD.MethodName,ORD_EIR_BULK.CreateTime,ORD_EIR_BULK.BillOfLading,ORD_EIR_BULK.BookingNo,ORD_EIR_BULK.ItemID,ORD_EIR_BULK.Quantity,ORD_EIR_BULK.CargoWeight,ORD_EIR_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
        .orderBy('ORD_EIR_BULK.CreateTime','desc').catch(err => console.log(err)) || [];
        rt.push(...gates);
    }
    
    
    return rt;
}

module.exports.saveTallyData = async (req) => {
    let item=req.body;
    let rowguid=item['rowguid']+'';
    let JobModeID=item['JobModeID']+'';
    delete item['rowguid'];
    let check = await req.gtos('DT_MNF_LD_BULK')
    .leftJoin('JOB_TALLY','JOB_TALLY.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .select('DT_MNF_LD_BULK.rowguid','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight',req.gtos.raw('SUM(JOB_TALLY.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_TALLY.McWeight) as ActualWeight'))
    .where(req.gtos.raw(`(CONCAT(DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo)=:BBNo and DT_MNF_LD_BULK.ClassID=:ClassID and DT_MNF_LD_BULK.VoyageKey=:VoyageKey)`,{BBNo:(item.BillOfLading||'')+(item.BookingNo||''),ClassID:item.ClassID,VoyageKey:item.VoyageKey}))
    .groupByRaw('DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight');

    if(!(check||[])[0]){
        throw "Không tồn tại dữ liệu !";return;
    }
    console.log(rowguid,check[0].ActualQuantity,JobModeID,check[0].Quantity);
    if(item.MethodID=='TAU-BAI' || JobModeID=='NGTH'){
        if((check[0].ActualQuantity+parseInt(item.Quantity))>check[0].Quantity){
            throw "Vượt quá số lượng !";return;
        }
    }
    
    //let checkSum = await req.gtos('JOB_TALLY').select(req.gtos.raw('SUM(Quantity) as Quantity, SUM(McWeight) as McWeight')).insert(item); 
    item['CreatedBy'] = req.session.userdata["UserID"];
    if(JobModeID=='NGTH' || JobModeID=='XGTH'){
        item['JobStatus']='C';
    }
    let rt = await req.gtos('JOB_TALLY').insert(item); 
    if(item.MethodID=='BAI-TAU'){
        await req.gtos('JOB_YARD').update({FinishDate:FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss')}).where({rowguid:rowguid})
    }
    else
    if(JobModeID=='NGTH' || JobModeID=='XGTH'){
        await req.gtos('JOB_GATE').update({Quantity:item.Quantity,McWeight:item.McWeight,Remark:item.Note}).where({rowguid:rowguid})
    }
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