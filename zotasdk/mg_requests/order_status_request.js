const util = require('util');

const OrderStatusRequestParameters = require("./mg_request.js").OrderStatusRequestParameters
const MGRequestParam = require("./objects.js").MGRequestParam

class MGOrderStatus {
    /*
    * Definition of all the possible statuses of an order.
    * See https://doc.zota.com/payout/1.0/#common-resources
    * */
    static CREATED = "CREATED"
    static PROCESSING = "PROCESSING"
    static APPROVED = "APPROVED"
    static DECLINED = "DECLINED"
    static FILTERED = "FILTERED"
    static PENDING = "PENDING"
    static UNKNOWN = "UNKNOWN"
    static ERROR = "ERROR"
}

class MGOrderStatusRequest extends OrderStatusRequestParameters {
    /*
    * Implementation of the Order Status Request class.
    * See Also https://doc.zota.com/deposit/1.0/?javascript#issue-an-order-status-request*/
    constructor({merchantOrderID = null, orderID = null}) {
        super();

        this._merchantOrderID = new MGRequestParam(
            OrderStatusRequestParameters.MERCHANT_ORDER_ID,
            merchantOrderID,
            128,
            true
        )

        this._orderID = new MGRequestParam(
            OrderStatusRequestParameters.ORDER_ID,
            orderID,
            128,
            true
        )
    }

    get merchantOrderID() {
        /*
        * Getter for the merchant order ID.
        * */
        return this._merchantOrderID.paramValue
    }

    setMerchantOrderID(value) {
        this._merchantOrderID.setValue(value)
        return this
    }

    get orderID() {
        /*
        * Getter for the order ID.
        * */
        return this._orderID.paramValue
    }

    setOrderID(value) {
        this._orderID.setValue(value)
        return this
    }

    toSignedPayload(merchantID, ts, signature) {

        return util.format("?merchantID=%s&merchantOrderID=%s&orderID=%s&timestamp=%s&signature=%s",
            merchantID,
            this.merchantOrderID,
            this.orderID,
            ts,
            signature)
    }
}

module.exports = {
    MGOrderStatus: MGOrderStatus,
    MGOrderStatusRequest: MGOrderStatusRequest
}