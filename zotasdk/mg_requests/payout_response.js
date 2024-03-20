const HTTP_STATUS_OK = require("../helpers").HTTP_STATUS_OK
const MGResponse = require("./mg_response.js").MGResponse

class MGPayoutResponse extends MGResponse {

    static CODE = "code"
    static DATA = 'data'
    static MERCHANT_ORDER_ID = 'merchantOrderID'
    static ORDER_ID = 'orderID'
    static MESSAGE = "message"
    /*
        * Object that wraps around the Zota Deposit Request response.
        * Container class for the deposit request response.
        *
        * @param {Object} httpResponse The response from the deposit request
        * */
    constructor(httpResponse) {
        super(httpResponse);

        this._merchantOrderID = null
        this._orderID = null
        this._isError = false
        this._errorReason = null

        if (httpResponse[MGPayoutResponse.CODE] !== HTTP_STATUS_OK.toString()) {
            this._isError = true
            this._errorReason = httpResponse[MGPayoutResponse.MESSAGE]
        } else {
            const responseData = httpResponse[MGPayoutResponse.DATA]
            if (responseData != null) {
                this._merchantOrderID = responseData[MGPayoutResponse.MERCHANT_ORDER_ID]
                this._orderID = responseData[MGPayoutResponse.ORDER_ID]
            }
        }
    }

    get merchantOrderID() {
        /*
        * Getter for the Merchant Order Id
        * */
        return this._merchantOrderID
    }

    get orderID() {
        /*
        * Getter for the Order Id
        * */
        return this._orderID
    }

    get isOk() {
        /*
        * Ok flag for the response
        * */
        return !this._isError
    }

    get error() {
        /*
        * Getter for the Error
        * */
        return this._errorReason
    }
}

module.exports = {
    MGPayoutResponse:MGPayoutResponse
}