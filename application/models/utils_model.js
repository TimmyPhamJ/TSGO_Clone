const getLanePort = async (req) => {
    let query = req
        .gtos("BS_LANE")
        .select("LaneID", "LaneName", "OprList", "PortList")
        .orderBy("LaneID");
    if(req.body.laneID) {
        query.where("LaneID", req.body.laneID)
    }
    return (await query.catch((err) => console.log(err))) || [];
};

module.exports = {
    getLanePort
}
