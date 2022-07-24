const{MGClient} = require("./zotapaysdk/client");
const{MGDepositRequest} = require("./zotapaysdk/mg_requests/deposit_request")
const{MGCardDepositRequest} = require("./zotapaysdk/mg_requests/card_deposit_request")
const{MGPayoutRequest} = require("./zotapaysdk/mg_requests/payout_request")
const{MGOrderStatusRequest} = require("./zotapaysdk/mg_requests/order_status_request")
const{MGCallback} = require("./zotapaysdk/mg_requests/callback")

module.exports =  {
    MGClient : MGClient,
    MGPayoutRequest: MGPayoutRequest,
    MGDepositRequest:MGDepositRequest,
    MGOrderStatusRequest: MGOrderStatusRequest,
    MGCardDepositRequest:MGCardDepositRequest,
    MGCallback:MGCallback,
}