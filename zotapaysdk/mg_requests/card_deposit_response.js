const HTTP_STATUS_OK = require("../helpers").HTTP_STATUS_OK
const MGResponse = require("./mg_response.js").MGResponse

const util = require('util');

class MGCardDepositResponse extends MGResponse {

    static DATA = 'data'
    static CODE = 'code'
    static STATUS = 'status'
    static MERCHANT_ORDER_ID = 'merchantOrderID'
    static ORDER_ID = 'orderID'
    static MESSAGE = "message"
    static DEPOSIT_URL = "depositUrl"

    /*
    *  Wrapper around the request response for credit card deposits.
    *
    * @param {Object} httpResponse The response from the card deposit request
    * */
    constructor(httpResponse) {
        super(httpResponse);

        this._merchantOrderID = null
        this._orderID = null
        this._status = null

        this._isError = false
        this._errorReason = null

        if (httpResponse[MGCardDepositResponse.CODE] !== HTTP_STATUS_OK.toString()) {
            this._isError = true
            this._errorReason = httpResponse[MGCardDepositResponse.MESSAGE]
        } else {
            const responseData = httpResponse[MGCardDepositResponse.DATA]
            if (responseData != null) {
                this._merchantOrderID = responseData[MGCardDepositResponse.MERCHANT_ORDER_ID]
                this._orderID = responseData[MGCardDepositResponse.ORDER_ID]
                this._status = responseData[MGCardDepositResponse.STATUS]

                // when card details are missing in the request, deposit Url is return where user can manually enter
                // these details, otherwise directly a status is returned from sync response
                this._depositUrl = responseData[MGCardDepositResponse.DEPOSIT_URL]
            }
        }
    }

    get status() {
        /*
        * Getter for the Status
        * */
        return this._status
    }

    get depositUrl() {
        /*
        * Getter for the depositUrl
        * */
        return this._depositUrl
    }
    get merchantOrderID() {
        /*
        * Getter for the Merchant Order Id
        * */
        return this._merchantOrderID
    }

    get orderID() {
        /*
        * Getter for the Order ID
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
    MGCardDepositResponse:MGCardDepositResponse
}
