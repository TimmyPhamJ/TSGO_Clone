const FunctionModel = require('./FunctionModel.js');


module.exports.cancelPlan = async (req) => {
    let item=req.body;
    let check = await req.gtos('PLAN_YARD').select('*').where({
        rowguid:item.rowguid
    }).catch(err=>console.error(err));
    let rt=false;
    if((check||[]).length){
        rt=await req.gtos('PLAN_YARD').where({
            rowguid:item.rowguid
        }).del().catch(err=>console.error(err)); 
    }
    else{
        throw 'Không có dữ liệu !'
    }
    return rt;
}

module.exports.deletePlanBook = async (req) => {
    let item=req.body;
    let check = await req.gtos('PLAN_BOOK').select('*').where({
        rowguid:item.rowguid
    }).catch(err=>console.error(err));
    let rt=false;
    if((check||[]).length){
        rt=await req.gtos('PLAN_BOOK').where({
            rowguid:item.rowguid
        }).del().catch(err=>console.error(err)); 
    }
    else{
        throw 'Không có dữ liệu !'
    }
    return rt;
}
module.exports.savePlanBook = async (req) => {
    let itemx=req.body;
    let item={
        BookingNo: itemx.BookingNo||undefined,
        CargoTypeID: itemx.CargoTypeID||undefined,
        ItemID: itemx.ItemID||undefined,
        POL: itemx.POL||undefined,
        POD: itemx.POD||undefined,
        CusID: itemx.CusID||undefined,
        VoyageKey: itemx.VoyageKey||undefined,
    }
    item.CreatedBy=req.session.userdata["UserID"];
    let rt=await req.gtos('PLAN_BOOK').insert(item).catch(err=>console.error(err));
    return rt;
}

module.exports.setPlan = async (req) => {
    let itemx=req.body;
    let check;
    if(itemx.ClassID==2){
        check = await req.gtos('PLAN_BOOK').select('*').where({
            rowguid:itemx.rowguid
        }).catch(err=>console.error(err));
    }
    else{
        check = await req.gtos('DT_MNF_LD_BULK').select('*').where({
            rowguid:itemx.rowguid
        }).catch(err=>console.error(err));
    }
    let rt=false;
    console.log(check);
    if((check||[]).length){
        item=check[0];
        rt=await req.gtos('PLAN_YARD').insert({
            RefRowguid:item.rowguid,
            ClassID: item.ClassID,
            CusID: item.CusID,
            BillOfLading: item.BillOfLading,
            BookingNo: item.BookingNo,
            ItemID: item.ItemID,
            VoyageKey: item.VoyageKey,
            Quantity: item.Quantity,
            McWeight: item.CargoWeight||item.McWeight,
            Volume: item.Volume,
            Block: itemx.Block,
            CreatedBy: req.session.userdata["UserID"],
            CreateTime: FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss'),
        }).catch(err=>console.error(err));
        await req.gtos('DT_MNF_LD_BULK').where({
            rowguid:item.rowguid
        }).update({
            PlanBlock: itemx.Block,
            PlanBy: req.session.userdata["UserID"],
            PlanTime: FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss'),
        }).catch(err=>console.error(err)); 
    }
    else{
        throw 'Không có dữ liệu !'
    }
    return rt;
}
module.exports.loadTallyData = async (req) => {
    let query=req.gtos('JOB_TALLY').select('JOB_TALLY.*','DT_MNF_LD_BULK.CargoWeight','BS_ITEM.ItemName','DT_MNF_LD_BULK.Quantity as LDQuantity','DT_MNF_LD_BULK.CusID')
    .leftJoin('DT_MNF_LD_BULK','DT_MNF_LD_BULK.rowguid','JOB_TALLY.RefRowguid')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .where('JobStatus','A')
    .orderBy('CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_TALLY');
    return await query.catch(err => console.log(err)) || [];
}
module.exports.loadGateData = async (req) => {
    let query=req.gtos('JOB_GATE').select('JOB_GATE.*','BS_JOB_MODE.JobModeName','ORD_EIR_BULK.Quantity','ORD_EIR_BULK.CargoWeight','ORD_EIR_BULK.Volume')
    .whereNull('JOB_GATE.FinishDate')
    .where(req.gtos.raw(`ISNULL(JOB_GATE.Quantity,0)<=0`))
    .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','JOB_GATE.JobModeID')
    .leftJoin('ORD_EIR_BULK','ORD_EIR_BULK.PinCode','JOB_GATE.PinCode')
    .orderBy('CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_GATE');
    return await query.catch(err => console.log(err)) || [];
}
module.exports.loadBlockData = async (req) => {
    let query=req.gtos('BS_YP_BLOCK as BL')
    .select('BL.Block','BL.Bleft','BL.Btop','BL.Bwidth','BL.Bheight','BL.Capacity','BL.isLease')
    .orderBy('BL.Block','ASC');
    //query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_TALLY');
    let block_list = await query.catch(err => console.log(err)) || [];
    for (let ii = 0; ii < block_list.length; ii ++) {
        let queryx= req.gtos('DT_BLOCK_STOCK')
        .select('*')
        .where({Block:block_list[ii].Block})
        .where('Quantity','>','0')
        .orderBy('CreateTime','desc');
        //queryx=FunctionModel.KnexWhere(queryx,req.body.filter);
        console.error(queryx.toString());
        block_list[ii].Details=await queryx;
    }
    return block_list;
}

module.exports.loadBlockPlanning = async (req) => {
    let query=req.gtos('BS_YP_BLOCK as BL')
    .select('BL.Block','BL.Bleft','BL.Btop','BL.Bwidth','BL.Bheight','BL.Capacity','BL.isLease')
    .orderBy('BL.Block','ASC');
    //query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_TALLY');
    let block_list = await query.catch(err => console.log(err)) || [];
    for (let ii = 0; ii < block_list.length; ii ++) {
        let queryx= req.gtos('DT_BLOCK_STOCK')
        .select('DT_BLOCK_STOCK.*','BS_CUSTOMER.CusName','BS_ITEM.ItemName','DT_VESSEL_VISIT.VesselName','DT_VESSEL_VISIT.InboundVoyage','DT_VESSEL_VISIT.OutboundVoyage','BS_CARGOTYPE.CargoTypeName')
        .leftJoin('BS_CUSTOMER','BS_CUSTOMER.CusID','DT_BLOCK_STOCK.CusID')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_BLOCK_STOCK.ItemID')
        .leftJoin('BS_CARGOTYPE','BS_CARGOTYPE.CargoTypeID','BS_ITEM.CargoTypeID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','DT_BLOCK_STOCK.VoyageKey')
        .where({Block:block_list[ii].Block})
        .orderBy('CreateTime','desc');        
        queryx=FunctionModel.KnexWhere(queryx,req.body.filter,'DT_BLOCK_STOCK');
        //console.error(queryx.toString());
        block_list[ii].Details=(await queryx)||[];
        let queryx2= req.gtos('PLAN_YARD')
        .select('PLAN_YARD.*','BS_CUSTOMER.CusName','BS_ITEM.ItemName','DT_VESSEL_VISIT.VesselName','DT_VESSEL_VISIT.InboundVoyage','DT_VESSEL_VISIT.OutboundVoyage','BS_CARGOTYPE.CargoTypeName')
        .leftJoin('BS_CUSTOMER','BS_CUSTOMER.CusID','PLAN_YARD.CusID')
        .leftJoin('BS_ITEM','BS_ITEM.ItemID','PLAN_YARD.ItemID')
        .leftJoin('BS_CARGOTYPE','BS_CARGOTYPE.CargoTypeID','BS_ITEM.CargoTypeID')
        .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','PLAN_YARD.VoyageKey')
        .where({Block:block_list[ii].Block})
        .orderBy('CreateTime','desc');
        queryx2=FunctionModel.KnexWhere(queryx2,req.body.filter,'PLAN_YARD');
        //console.log(queryx2.toString());
        block_list[ii].Planning=((await queryx2)||[]);
    }
    return block_list;
}

module.exports.loadMNFData = async (req) => {
    let classid=(req.body.filter && req.body.filter.ClassID?req.body.filter.ClassID:'1')+'';
    if(req.body.filter && req.body.filter.ClassID)delete req.body.filter.ClassID;
    let query;
    if(classid=='1'){
    query=req.gtos('DT_MNF_LD_BULK').select('DT_MNF_LD_BULK.*','BS_ITEM.ItemName','BS_CUSTOMER.CusName','DT_MNF_LD_BULK.Quantity as LDQuantity')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .leftJoin('BS_CUSTOMER','BS_CUSTOMER.CusID','DT_MNF_LD_BULK.CusID')
    .leftJoin('PLAN_YARD','PLAN_YARD.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .where('DT_MNF_LD_BULK.ClassID','1')
    .whereNull('PLAN_YARD.rowguid')
    .orderBy('CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'DT_MNF_LD_BULK');
    }
    else{
    query=req.gtos('PLAN_BOOK').select('PLAN_BOOK.*','BS_ITEM.ItemName','BS_CUSTOMER.CusName','DT_VESSEL_VISIT.VesselName','DT_VESSEL_VISIT.InboundVoyage','DT_VESSEL_VISIT.OutboundVoyage','BS_CARGOTYPE.CargoTypeName')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','PLAN_BOOK.ItemID')
    .leftJoin('BS_CARGOTYPE','BS_CARGOTYPE.CargoTypeID','PLAN_BOOK.CargoTypeID')
    .leftJoin('BS_CUSTOMER','BS_CUSTOMER.CusID','PLAN_BOOK.CusID')
    .leftJoin('PLAN_YARD','PLAN_YARD.RefRowguid','PLAN_BOOK.rowguid')
    .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','PLAN_BOOK.VoyageKey')
    .whereNull('PLAN_YARD.rowguid')
    .orderBy('CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'PLAN_BOOK');
    }
    console.log(query.toString());
    return await query.catch(err => console.log(err)) || [];
}
module.exports.loadYardData = async (req) => {
    let query=req.gtos('DT_MNF_LD_BULK')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','DT_MNF_LD_BULK.JobModeID')
    .leftJoin('BS_METHOD','BS_METHOD.MethodID','DT_MNF_LD_BULK.MethodID')
    .leftJoin('BS_TRANSIT','BS_TRANSIT.TransitID','DT_MNF_LD_BULK.TransitID')
    .leftJoin('DT_VESSEL_VISIT','DT_VESSEL_VISIT.VoyageKey','DT_MNF_LD_BULK.VoyageKey')
    .leftJoin('DT_VESSEL','DT_VESSEL.VesselID','DT_VESSEL_VISIT.VesselID')
    .leftJoin('JOB_YARD','JOB_YARD.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .select('DT_MNF_LD_BULK.rowguid','DT_MNF_LD_BULK.ClassID','DT_MNF_LD_BULK.MethodID','BS_METHOD.MethodName','DT_MNF_LD_BULK.CreateTime','DT_MNF_LD_BULK.BillOfLading','DT_MNF_LD_BULK.BookingNo','DT_MNF_LD_BULK.ItemID','DT_MNF_LD_BULK.Quantity','DT_MNF_LD_BULK.CargoWeight','DT_MNF_LD_BULK.VoyageKey','BS_ITEM.ItemName','BS_JOB_MODE.JobModeName','BS_TRANSIT.TransitName','DT_VESSEL.Cellars',req.gtos.raw('SUM(JOB_YARD.Quantity) as ActualQuantity'),req.gtos.raw('SUM(JOB_YARD.McWeight) as ActualWeight'))
    .where('DT_MNF_LD_BULK.LDStatus','A')
    .groupByRaw('DT_MNF_LD_BULK.rowguid,DT_MNF_LD_BULK.ClassID,DT_MNF_LD_BULK.MethodID,BS_METHOD.MethodName,DT_MNF_LD_BULK.CreateTime,DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo,DT_MNF_LD_BULK.ItemID,DT_MNF_LD_BULK.Quantity,DT_MNF_LD_BULK.CargoWeight,DT_MNF_LD_BULK.VoyageKey,BS_ITEM.ItemName,BS_JOB_MODE.JobModeName,BS_TRANSIT.TransitName,DT_VESSEL.Cellars')
    .orderBy('DT_MNF_LD_BULK.CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'DT_MNF_LD_BULK');
    return await query.catch(err => console.log(err)) || [];
}


module.exports.saveYardData = async (req) => {
    let item=req.body;
    let ins={
        RefRowguid : item.rowguid||item.RefRowguid
        ,WorkerGroupID : item.WorkerGroupID
        ,DeviceID : item.DeviceID
        ,ClassID : item.ClassID
        ,EirNo : item.EirNo
        ,PinCode : item.PinCode
        ,YardType : item.YardType
        ,JobTypeID : item.JobTypeID
        ,MethodID : item.MethodID
        ,BillOfLading : item.BillOfLading
        ,BookingNo : item.BookingNo
        ,ItemID : item.ItemID
        ,VoyageKey : item.VoyageKey
        ,TruckNo : item.TruckNo
        ,Quantity : item.Quantity
        ,McWeight : item.McWeight
        ,Cellar : item.Cellar
        ,Block : item.Block
        ,Note : item.Note
        ,CreatedBy : req.session.userdata["UserID"]
        ,CreateTime : FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss')
    }
    let check = await req.gtos('DT_BLOCK_STOCK').select('*').where({
        Block:item.Block,
        BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
        ClassID:item.ClassID
    }).catch(err=>console.error(err)); ;
    if((item.YardType+'')=='1'){
        if((check||[]).length){
            await req.gtos('DT_BLOCK_STOCK').where({
                Block:item.Block,
                BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                ClassID:item.ClassID
            }).update({
                Quantity: req.gtos.raw(`Quantity+${item.Quantity}`),
                McWeight: req.gtos.raw(`McWeight+${item.McWeight}`),
            }).catch(err=>console.error(err)); 
        }
        else{
            await req.gtos('DT_BLOCK_STOCK').insert({
                Block:item.Block,
                CusID:item.CusID,
                BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                ItemID:item.ItemID,
                VoyageKey:item.VoyageKey,
                ClassID:item.ClassID,
                Quantity:item.Quantity,
                McWeight:item.McWeight,
                Note:item.Note,
                CreatedBy : req.session.userdata["UserID"],
                CreateTime : FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss')
            }).catch(err=>console.error(err)); 
            await req.gtos('JOB_TALLY').where({
                rowguid:item.rowguid
            }).update({
                JobStatus: 'C',
            }).catch(err=>console.error(err)); 
        }
    }
    else{
        if((check||[]).length){
            await req.gtos('DT_BLOCK_STOCK').where({
                Block:item.Block,
                BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                ClassID:item.ClassID
            }).update({
                Quantity: req.gtos.raw(`Quantity-${item.Quantity}`),
                McWeight: req.gtos.raw(`McWeight-${item.McWeight}`),
            }).catch(err=>console.error(err));
        }
    }
    if(item.PinCode)
    await req.gtos('JOB_GATE').where({
        rowguid:item.RefRowguid
    }).update({
        Quantity: item.Quantity,
        McWeight: item.McWeight,
        Remark: item.Note,
    }).catch(err=>console.error(err)); 
    let rt = await req.gtos('JOB_YARD').insert(ins); 
    return rt;
}

module.exports.viewHis = async (req) => {
    let query=req.gtos('JOB_YARD')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','JOB_YARD.ItemID')
    .leftJoin('BS_WORKER_GROUP','BS_WORKER_GROUP.WorkerGroupID','JOB_YARD.WorkerGroupID')
    .leftJoin('BS_DEVICE','BS_DEVICE.DeviceID','JOB_YARD.DeviceID')
    .select('JOB_YARD.*','BS_ITEM.ItemName','BS_DEVICE.DeviceName','BS_WORKER_GROUP.WorkerGroupID')
    .where('JOB_YARD.CreatedBy',req.session.userdata["UserID"])
    .limit(1000)
    .orderBy('JOB_YARD.CreateTime','asc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_YARD');
    console.error(query.toString());
    return await query.catch(err => console.log(err)) || [];
}