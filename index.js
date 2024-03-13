const{MGClient} = require("./zotasdk/client");
const{MGDepositRequest} = require("./zotasdk/mg_requests/deposit_request")
const{MGCardDepositRequest} = require("./zotasdk/mg_requests/card_deposit_request")
const{MGPayoutRequest} = require("./zotasdk/mg_requests/payout_request")
const{MGOrderStatusRequest} = require("./zotasdk/mg_requests/order_status_request")
const{MGCallback} = require("./zotasdk/mg_requests/callback")

module.exports =  {
    MGClient : MGClient,
    MGPayoutRequest: MGPayoutRequest,
    MGDepositRequest:MGDepositRequest,
    MGOrderStatusRequest: MGOrderStatusRequest,
    MGCardDepositRequest:MGCardDepositRequest,
    MGCallback:MGCallback,
}