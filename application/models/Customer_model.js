const { gtos, gtosglobal, knex_once } = require("../config/database");
const moment = require("moment-timezone");
const FunctionModel = require("../models/FunctionModel");

module.exports.loadCustomer = async (req) => {
  let query = req
    .gtos("BS_CUSTOMER")
    .select("BS_CUSTOMER.*", "BS_INV_PAYMENT_TYPE.PaymentTypeName")
    .leftJoin(
      "BS_INV_PAYMENT_TYPE",
      "BS_INV_PAYMENT_TYPE.PaymentTypeID",
      "BS_CUSTOMER.PaymentTypeID"
    )
    .orderBy("PaymentTypeID", "desc");
  query = FunctionModel.KnexWhere(query, req.body.filter, "BS_CUSTOMER");
  return (await query.catch((err) => console.log(err))) || [];
};
