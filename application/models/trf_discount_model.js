const { rejects } = require("assert")
const { resolve } = require("path")
const moment = require("moment-timezone");
module.exports.loadContractForm = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let result = await req.gtos("TRF_DISCOUNT AS TD")
                .distinct("TD.CusID", "TD.ApplyDate", "TD.ExpireDate", "BC.CusName", "TD.ContractName", "TD.VoyageKey")
                .leftJoin("BS_CUSTOMER AS BC", "BC.CusID", "TD.CusID")
            resolve(result.map(item => {
                return {
                    ...item, ApplyDate: moment(item.ApplyDate).utc().format("YYYY-MM-DD HH:mm:ss"), ExpireDate: moment(item.ExpireDate).utc().format("YYYY-MM-DD HH:mm:ss")
                }
            }))
        } catch (error) {
            rejects(error)
        }
    })
}
module.exports.getDataContractForm = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let result = req.gtos("TRF_DISCOUNT AS TD").select("*")
                .where("TD.CusID", req.query.param)
                .where("TD.ApplyDate", "=", req.query.getIn)
                .where("TD.ExpireDate", "=", req.query.getOut)
                .where("TD.ContractName", "=", req.query.contractName)
            resolve(result)
        } catch (error) {
            console.log(error)
            rejects(error)

        }
    })

}
