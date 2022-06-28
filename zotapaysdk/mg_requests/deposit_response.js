const HTTP_STATUS_OK = require("../helpers").HTTP_STATUS_OK
const MGResponse = require("./mg_response.js").MGResponse

class MGDepositResponse extends  MGResponse {

    static CODE = "code"
    static DATA = 'data'
    static DEPOSIT_URL = 'depositUrl'
    static MERCHANT_ORDER_ID = 'merchantOrderID'
    static ORDER_ID = 'orderID'
    static MESSAGE = "message"

    constructor(httpResponse) {
        /*
        * Object that wraps around the ZotaPay Deposit Request response.
        * Container class for the deposit request response.
        *
        * Example response from the API:

        {
            "code": "200",
            "data": {
                "depositUrl": "<URL>/api/v1/deposit/init/8b3a6b89697e8ac8f45d964bcc90c7ba41764acd/",
                "merchantOrderID": "QvE8dZshpKhaOmHY",
                "orderID": "8b3a6b89697e8ac8f45d964bcc90c7ba41764acd"
            }
        }
        * @param {Object} httpResponse The response from the deposit request
        * */
        super(httpResponse);

        this._merchantOrderID = null
        this._orderID = null
        this._depositUrl = null

        this._isError = false
        this._errorReason = null

        if (httpResponse[MGDepositResponse.CODE] !== HTTP_STATUS_OK.toString()) {
            this._isError = true
            this._errorReason = httpResponse[MGDepositResponse.MESSAGE]
        } else {
            const responseData = httpResponse[MGDepositResponse.DATA]
            if (responseData != null) {
                this._merchantOrderID = responseData[MGDepositResponse.MERCHANT_ORDER_ID]
                this._orderID = responseData[MGDepositResponse.ORDER_ID]
                this._depositUrl = responseData[MGDepositResponse.DEPOSIT_URL]
            }
        }

    }

    get depositUrl() {
        /*
        * Getter for the Deposit URL
        * */
        return this._depositUrl
    }

    get merchantOrderID() {
        /*
        * Getter for the Merchant Order ID
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
    MGDepositResponse: MGDepositResponse
}