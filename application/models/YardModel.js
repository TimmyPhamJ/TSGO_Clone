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
            ClassID: item.ClassID||undefined,
            CusID: item.CusID||undefined,
            BillOfLading: item.BillOfLading||undefined,
            BookingNo: item.BookingNo||undefined,
            ItemID: item.ItemID||undefined,
            CargoTypeID: item.CargoTypeID||undefined,
            VoyageKey: item.VoyageKey||undefined,
            Quantity: item.Quantity||undefined,
            McWeight: item.CargoWeight||item.McWeight,
            Volume: item.Volume||undefined,
            Block: itemx.Block||undefined,
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
module.exports.loadNhapTauData = async (req) => {
    let query=req.gtos('JOB_TALLY').select('JOB_TALLY.*','DT_MNF_LD_BULK.UnitID','DT_MNF_LD_BULK.TLHQ','DT_MNF_LD_BULK.IsLocalForeign','DT_MNF_LD_BULK.CargoWeight','BS_ITEM.ItemName','DT_MNF_LD_BULK.Quantity as LDQuantity','DT_MNF_LD_BULK.CusID')
    .leftJoin('DT_MNF_LD_BULK','DT_MNF_LD_BULK.rowguid','JOB_TALLY.RefRowguid')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .where('JOB_TALLY.JobStatus','A')
    .where('JOB_TALLY.MethodID','TAU-BAI')
    .where('JOB_TALLY.ClassID','1')
    .orderBy('CreateTime','desc');
    let tallys=await query.catch(err => console.log(err)) || [];
    for (let ii = 0; ii < tallys.length; ii++) {
        const row = tallys[ii];
        // console.log(req.gtos('PLAN_YARD').select('*')
        // .where(req.gtos.raw(`(ISNULL(BillOfLading,'*')='*' or ISNULL(BillOfLading,'*')=:BillOfLading)`,{BillOfLading:row.BillOfLading||'*'}))
        // .where(req.gtos.raw(`(ISNULL(BookingNo,'*')='*' or ISNULL(BookingNo,'*')=:BookingNo)`,{BookingNo:row.BookingNo||'*'}))
        // .where(req.gtos.raw(`(ISNULL(ItemID,'*')='*' or ISNULL(ItemID,'*')=:ItemID)`,{ItemID:row.ItemID||'*'}))
        // .where(req.gtos.raw(`(ISNULL(CargoTypeID,'*')='*' or ISNULL(CargoTypeID,'*')=:CargoTypeID)`,{CargoTypeID:row.CargoTypeID||'*'}))
        // .where(req.gtos.raw(`(ISNULL(VoyageKey,'*')='*' or ISNULL(VoyageKey,'*')=:VoyageKey)`,{VoyageKey:row.VoyageKey||'*'})).toString());
        let plans = await req.gtos('PLAN_YARD').select('*')
        .where(req.gtos.raw(`(ISNULL(BillOfLading,'*')='*' or ISNULL(BillOfLading,'*')=:BillOfLading)`,{BillOfLading:row.BillOfLading||'*'}))
        .where(req.gtos.raw(`(ISNULL(BookingNo,'*')='*' or ISNULL(BookingNo,'*')=:BookingNo)`,{BookingNo:row.BookingNo||'*'}))
        .where(req.gtos.raw(`(ISNULL(ItemID,'*')='*' or ISNULL(ItemID,'*')=:ItemID)`,{ItemID:row.ItemID||'*'}))
        .where(req.gtos.raw(`(ISNULL(CargoTypeID,'*')='*' or ISNULL(CargoTypeID,'*')=:CargoTypeID)`,{CargoTypeID:row.CargoTypeID||'*'}))
        .where(req.gtos.raw(`(ISNULL(VoyageKey,'*')='*' or ISNULL(VoyageKey,'*')=:VoyageKey)`,{VoyageKey:row.VoyageKey||'*'}))
        .catch(err => console.log(err)) || [];
        let block={};
        for (let jj = 0; jj < plans.length; jj++) {
            const plan = plans[jj];
            let diem=0;
            if(row.BillOfLading && plan.BillOfLading && plan.BillOfLading==row.BillOfLading){
                diem+=10;
            }
            if(row.BookingNo && plan.BookingNo && plan.BookingNo==row.BookingNo){
                diem+=10;
            }
            if(row.ItemID && plan.ItemID && plan.ItemID==row.ItemID){
                diem+=1;
            }
            if(row.CargoTypeID && plan.CargoTypeID && plan.CargoTypeID==row.CargoTypeID){
                diem+=1;
            }
            if(row.VoyageKey && plan.VoyageKey && plan.VoyageKey==row.VoyageKey){
                diem+=1;
            }
            if(row.Quantity && plan.Quantity && plan.Quantity==row.Quantity){
                diem+=1;
            }
            if(row.McWeight && plan.McWeight && plan.McWeight==row.McWeight){
                diem+=1;
            }
            if(row.Volume && plan.Volume && plan.Volume==row.Volume){
                diem+=1;
            }
            plans[jj].diem=diem;
            if((block[plans[jj].Block]||0)<diem)
            block[plans[jj].Block]=diem;
        }
        let blocks=Object.keys(block);
        let rqBlock=[];
        let tdiem=0;
        for (let xx = 0; xx < blocks.length; xx++) {
            const kBlock = blocks[xx];
            if(block[kBlock]>tdiem){
                rqBlock=[];
                rqBlock.push(kBlock);
            }
            else
            if(block[kBlock]=tdiem){
                rqBlock.push(kBlock);
            }
        }
        tallys[ii]['Plan']=rqBlock.join(', ');

    }
    return tallys || [];
}

module.exports.loadXuatTauData = async (req) => {
    let query=req.gtos('DT_MNF_LD_BULK').select('DT_MNF_LD_BULK.*','BS_ITEM.ItemName','DT_MNF_LD_BULK.Quantity as LDQuantity','DT_MNF_LD_BULK.CargoWeight as McWeight')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .where('LDStatus','B')
    .where('JobModeID','XTAU')
    .where('JobModeID','XTAU')
    .orderBy('CreateTime','desc');
    //console.error(query.toString());
    let xuattaus=await query.catch(err => console.log(err)) || [];
    for (let ii = 0; ii < xuattaus.length; ii++) {
        const xuattau = xuattaus[ii];
        let sumx= await req.gtos('JOB_YARD').select(req.gtos.raw(`SUM(Quantity) as SumQuantity, SUM(McWeight) as SumMcWeight, SUM(Volume) as SumVolume`)).where('RefRowguid',xuattau.rowguid);
        if(sumx && sumx[0]){
            xuattaus[ii]['SumQuantity']=sumx[0]['SumQuantity'];
            xuattaus[ii]['SumMcWeight']=sumx[0]['SumMcWeight'];
            xuattaus[ii]['SumVolume']=sumx[0]['SumVolume'];
        }
    }
    return (xuattaus || []).filter(itm=>itm.SumQuantity<itm.Quantity);
}
module.exports.loadGateData = async (req) => {
    let query=req.gtos('JOB_GATE').select('JOB_GATE.*','ORD_EIR_BULK.ShipperName','DT_MNF_LD_BULK.TLHQ','BS_JOB_MODE.JobModeName','ORD_EIR_BULK.Quantity','ORD_EIR_BULK.CargoWeight','ORD_EIR_BULK.Volume','BS_ITEM.CargoTypeID')
    .whereNull('JOB_GATE.FinishDate')
    .where(req.gtos.raw(`ISNULL(JOB_GATE.Quantity,0)<=0`))
    .leftJoin("DT_MNF_LD_BULK", function () {
        this.on(
          req.gtos.raw("CONCAT(DT_MNF_LD_BULK.BillOfLading,DT_MNF_LD_BULK.BookingNo)"),
          "=",
          req.gtos.raw("CONCAT(JOB_GATE.BillOfLading,JOB_GATE.BookingNo)"),
        ).andOn("DT_MNF_LD_BULK.ClassID", "=", "JOB_GATE.ClassID")
        .andOn("DT_MNF_LD_BULK.VoyageKey", "=", "JOB_GATE.VoyageKey");
      })
    .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','JOB_GATE.JobModeID')
    .leftJoin('ORD_EIR_BULK','ORD_EIR_BULK.PinCode','JOB_GATE.PinCode')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','JOB_GATE.ItemID')
    .orderBy('CreateTime','desc');
    query=FunctionModel.KnexWhere(query,req.body.filter,'JOB_GATE');
    //console.log(query.toString());
    let tallys=await query.catch(err => console.log(err)) || [];
    for (let ii = 0; ii < tallys.length; ii++) {
        const row = tallys[ii];
        // console.log(req.gtos('PLAN_YARD').select('*')
        // .where(req.gtos.raw(`(ISNULL(BillOfLading,'*')='*' or ISNULL(BillOfLading,'*')=:BillOfLading)`,{BillOfLading:row.BillOfLading||'*'}))
        // .where(req.gtos.raw(`(ISNULL(BookingNo,'*')='*' or ISNULL(BookingNo,'*')=:BookingNo)`,{BookingNo:row.BookingNo||'*'}))
        // .where(req.gtos.raw(`(ISNULL(ItemID,'*')='*' or ISNULL(ItemID,'*')=:ItemID)`,{ItemID:row.ItemID||'*'}))
        // .where(req.gtos.raw(`(ISNULL(CargoTypeID,'*')='*' or ISNULL(CargoTypeID,'*')=:CargoTypeID)`,{CargoTypeID:row.CargoTypeID||'*'}))
        // .where(req.gtos.raw(`(ISNULL(VoyageKey,'*')='*' or ISNULL(VoyageKey,'*')=:VoyageKey)`,{VoyageKey:row.VoyageKey||'*'})).toString());
        let plans = await req.gtos('PLAN_YARD').select('*')
        .where(req.gtos.raw(`(ISNULL(BillOfLading,'*')='*' or ISNULL(BillOfLading,'*')=:BillOfLading)`,{BillOfLading:row.BillOfLading||'*'}))
        .where(req.gtos.raw(`(ISNULL(BookingNo,'*')='*' or ISNULL(BookingNo,'*')=:BookingNo)`,{BookingNo:row.BookingNo||'*'}))
        .where(req.gtos.raw(`(ISNULL(ItemID,'*')='*' or ISNULL(ItemID,'*')=:ItemID)`,{ItemID:row.ItemID||'*'}))
        .where(req.gtos.raw(`(ISNULL(CargoTypeID,'*')='*' or ISNULL(CargoTypeID,'*')=:CargoTypeID)`,{CargoTypeID:row.CargoTypeID||'*'}))
        .where(req.gtos.raw(`(ISNULL(VoyageKey,'*')='*' or ISNULL(VoyageKey,'*')=:VoyageKey)`,{VoyageKey:row.VoyageKey||'*'}))
        .catch(err => console.log(err)) || [];
        let block={};
        for (let jj = 0; jj < plans.length; jj++) {
            const plan = plans[jj];
            let diem=0;
            if(row.BillOfLading && plan.BillOfLading && plan.BillOfLading==row.BillOfLading){
                diem+=10;
            }
            if(row.BookingNo && plan.BookingNo && plan.BookingNo==row.BookingNo){
                diem+=10;
            }
            if(row.ItemID && plan.ItemID && plan.ItemID==row.ItemID){
                diem+=1;
            }
            if(row.CargoTypeID && plan.CargoTypeID && plan.CargoTypeID==row.CargoTypeID){
                diem+=1;
            }
            if(row.VoyageKey && plan.VoyageKey && plan.VoyageKey==row.VoyageKey){
                diem+=1;
            }
            if(row.Quantity && plan.Quantity && plan.Quantity==row.Quantity){
                diem+=1;
            }
            if(row.McWeight && plan.McWeight && plan.McWeight==row.McWeight){
                diem+=1;
            }
            if(row.Volume && plan.Volume && plan.Volume==row.Volume){
                diem+=1;
            }
            plans[jj].diem=diem;
            if((block[plans[jj].Block]||0)<diem)
            block[plans[jj].Block]=diem;
        }
        let blocks=Object.keys(block);
        let rqBlock=[];
        let tdiem=0;
        for (let xx = 0; xx < blocks.length; xx++) {
            const kBlock = blocks[xx];
            if(block[kBlock]>tdiem){
                rqBlock=[];
                rqBlock.push(kBlock);
            }
            else
            if(block[kBlock]=tdiem){
                rqBlock.push(kBlock);
            }
        }
        tallys[ii]['Plan']=rqBlock.join(', ');

    }
    return tallys || [];
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
        //console.error(queryx.toString());
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
        .where("Quantity",'>','0')
        .orderBy('CreateTime','desc');        
        //queryx=FunctionModel.KnexWhere(queryx,req.body.filter,'DT_BLOCK_STOCK');
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
        //queryx2=FunctionModel.KnexWhere(queryx2,req.body.filter,'PLAN_YARD');
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
    query=req.gtos('DT_MNF_LD_BULK').select('DT_MNF_LD_BULK.*','BS_ITEM.ItemName','BS_CUSTOMER.CusName','BS_JOB_MODE.JobModeName','DT_MNF_LD_BULK.Quantity as LDQuantity')
    .leftJoin('BS_JOB_MODE','BS_JOB_MODE.JobModeID','DT_MNF_LD_BULK.JobModeID')
    .leftJoin('BS_ITEM','BS_ITEM.ItemID','DT_MNF_LD_BULK.ItemID')
    .leftJoin('BS_CUSTOMER','BS_CUSTOMER.CusID','DT_MNF_LD_BULK.CusID')
    .leftJoin('PLAN_YARD','PLAN_YARD.RefRowguid','DT_MNF_LD_BULK.rowguid')
    .where('DT_MNF_LD_BULK.ClassID','1')
    .where('DT_MNF_LD_BULK.JobModeID','!=','NGTH')
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
        ,JobModeID:item.JobModeID
        ,UnitID:item.UnitID
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
    }).catch(err=>console.error(err)); 
    if((item.JobModeID+'')=="XTAU"){
        item.YardType=2;
    }
    //console.error(check);
    if((item.YardType+'')=='1'){
        if((check||[]).length){
            await req.gtos('DT_BLOCK_STOCK').where({
                Block:item.Block,
                BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                ClassID:item.ClassID
            }).update({
                Quantity: req.gtos.raw(`ISNULL(Quantity,0)+${item.Quantity||0}`),
                McWeight: req.gtos.raw(`ISNULL(McWeight,0)+${item.McWeight||0}`),
                Volume: req.gtos.raw(`ISNULL(Volume,0)+${item.Volume||0}`),
                QuantityIn: req.gtos.raw(`ISNULL(QuantityIn,0)+${item.Quantity||0}`),
                McWeightIn: req.gtos.raw(`ISNULL(McWeightIn,0)+${item.McWeight||0}`),
                VolumeIn: req.gtos.raw(`ISNULL(VolumeIn,0)+${item.Volume||0}`),
            }).catch(err=>console.error(err));
            await req.gtos('JOB_TALLY').where({
                rowguid:item.rowguid
            }).update({
                JobStatus: 'C',
            }).catch(err=>console.error(err)); 
        }
        else{
            await req.gtos('DT_BLOCK_STOCK').insert({
                Block:item.Block,
                CusID:item.CusID,
                JobModeIn:item.JobModeID,
                MethodIn:item.MethodID,
                BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                BillOfLading:item.BillOfLading,
                BookingNo:item.BookingNo,
                ItemID:item.ItemID,
                UnitID:item.UnitID,
                VoyageKey:item.VoyageKey,
                ClassID:item.ClassID,
                Quantity:item.Quantity,
                McWeight:item.McWeight,
                QuantityIn : item.Quantity,
                McWeightIn : item.McWeight,
                Note:item.Note,
                TLHQ:item.TLHQ?1:0,
                IsLocalForeign:item.IsLocalForeign,
                ShipperName:item.ShipperName||null,
                CreatedBy : req.session.userdata["UserID"],
                CreateTime : FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss'),
                //GetIn : FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss')
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
            //console.log('222222:',check);
            let updatedata={
                Quantity: req.gtos.raw(`ISNULL(Quantity,0)-${item.Quantity||0}`),
                McWeight: req.gtos.raw(`ISNULL(McWeight,0)-${item.McWeight||0}`),
                Volume: req.gtos.raw(`ISNULL(Volume,0)-${item.Volume||0}`),
                QuantityOut: req.gtos.raw(`ISNULL(QuantityOut,0)+${item.Quantity||0}`),
                McWeightOut: req.gtos.raw(`ISNULL(McWeightOut,0)+${item.McWeight||0}`),
                VolumeOut: req.gtos.raw(`ISNULL(VolumeOut,0)+${item.Volume||0}`),
                JobModeOut: item.JobModeID||'',
                MethodOut: item.MethodID||'',
            }
            await req.gtos('DT_BLOCK_STOCK').where({
                rowguid: check[0].rowguid
            }).update(updatedata).catch(err=>console.error(err));
        }
    }
    if((item.JobModeID+'')=="LAYN"){
        await req.gtos('JOB_GATE').where({
            rowguid:item.RefRowguid
        }).update({
            Quantity: item.Quantity,
            McWeight: item.McWeight,
            Remark: item.Note,
        }).catch(err=>console.error(err));
    }
    if((item.JobModeID+'')=="HBAI"){
        await req.gtos('JOB_GATE').where({
            rowguid:item.RefRowguid
        }).update({
            Quantity: item.Quantity,
            McWeight: item.McWeight,
            Remark: item.Note,
        }).catch(err=>console.error(err));
    }
    if((item.JobModeID+'')=="XTAU"){
        
    }

    let rt = await req.gtos('JOB_YARD').insert(ins); 
    if(ins.VoyageKey)
      global.io.sendData('pathname','/tally','reload',ins.VoyageKey);
    let checklai = await req.gtos('DT_BLOCK_STOCK').select(req.gtos.raw(`MAX(ID) as ID, SUM(Quantity) as Quantity, SUM(QuantityIn) as QuantityIn, SUM(QuantityOut) as QuantityOut`)).where({
        BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
        ClassID:item.ClassID
    }).catch(err=>console.error(err)); 
    console.log(checklai);
    if(checklai && checklai[0]){
        let checkmnf
        if(item.PinCode){
            checkmnf = await req.gtos('ORD_EIR_BULK').select('Quantity','rowguid').where({
                PinCode:item.PinCode||'',
            }).catch(err=>console.error(err));
        }
        else{
            checkmnf = await req.gtos('DT_MNF_LD_BULK').select('Quantity','rowguid').where(JSON.parse(JSON.stringify({
                BookingNo:(item.BookingNo||undefined),
                BillOfLading:(item.BillOfLading||undefined),
                ClassID:item.ClassID,
                VoyageKey:item.VoyageKey,
            }))).catch(err=>console.error(err)); 
        }
        console.log("=======================",checkmnf);
        if(checkmnf && checkmnf[0]){
            if((item.YardType+'')=='1'){                
                let sl=checkmnf[0].Quantity;
                if(checklai[0].QuantityIn>=sl){
                    
                    await req.gtos('DT_BLOCK_STOCK').where({
                        Block:item.Block,
                        BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                        ClassID:item.ClassID
                    }).update({GetIn: FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss'), CHK_Final_GetIn:1}).catch(err=>console.error(err));
                }                
            }
            else{            
                let sl=checkmnf[0].Quantity;
                if(checklai[0].QuantityOut==sl){
                    await req.gtos('DT_BLOCK_STOCK').where({
                        Block:item.Block,
                        BBNo:(item.BillOfLading?item.BillOfLading:item.BookingNo),
                        ClassID:item.ClassID
                    }).update({GetOut: FunctionModel.moment().format('YYYY-MM-DD HH:mm:ss'), CHK_Final_GetOut:1}).catch(err=>console.error(err));
                }
            }
        }
    }
    if(ins.VoyageKey)
      global.io.sendData('pathname','/yard','reload','loadblock');
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