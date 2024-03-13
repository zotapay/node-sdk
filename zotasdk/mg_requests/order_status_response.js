const HTTP_STATUS_OK = require("../helpers").HTTP_STATUS_OK
const MGResponse = require("./mg_response.js").MGResponse

class MGOrderStatusResponse extends  MGResponse {
    static TYPE = "type"
    static STATUS = "status"
    static ERROR_MESSAGE = "errorMessage"
    static PROCESSOR_TRANSACTION_ID = "processorTransactionID"
    static ORDER_ID = "orderID"
    static MERCHANT_ORDER_ID = "merchantOrderID"
    static AMOUNT = "amount"
    static CURRENCY = "currency"
    static CUSTOMER_EMAIL = "customerEmail"
    static CUSTOM_PARAM = "customParam"
    static REQUEST = "request"
    static MESSAGE = "message"
    static DATA = "data"
    static CODE = "code"
    /*
    * Wrapper around the order status request response from the API.
    * */
    constructor(httpResponse) {
        super(httpResponse);

        this._type = null
        this._status = null
        this._errorMessage = null
        this._processorTransactionID = null
        this._orderID = null
        this._merchantOrderID = null
        this._amount = null
        this._currency = null
        this._customerEmail = null
        this._customParam = null
        this._request = null

        if (httpResponse[MGOrderStatusResponse.CODE] !== HTTP_STATUS_OK.toString()) {
            this._errorMessage = httpResponse[MGOrderStatusResponse.MESSAGE]
        } else {
            const responseData = httpResponse[MGOrderStatusResponse.DATA]
            if (responseData != null) {
                this._type = responseData[MGOrderStatusResponse.TYPE]
                this._status = responseData[MGOrderStatusResponse.STATUS]
                this._processorTransactionID = responseData[MGOrderStatusResponse.PROCESSOR_TRANSACTION_ID]
                this._orderID = responseData[MGOrderStatusResponse.ORDER_ID]
                this._merchantOrderID = responseData[MGOrderStatusResponse.MERCHANT_ORDER_ID]
                this._amount = responseData[MGOrderStatusResponse.AMOUNT]
                this._currency = responseData[MGOrderStatusResponse.CURRENCY]
                this._customerEmail = responseData[MGOrderStatusResponse.CUSTOMER_EMAIL]
                this._customParam = responseData[MGOrderStatusResponse.CUSTOM_PARAM]
                this._request = responseData[MGOrderStatusResponse.REQUEST]
            }
        }
    }

    get type() {
        /*
        * Getter for the type.
        * */
        return this._type
    }

    get status() {
        /*
        * Getter for the status.
        * */
        return this._status
    }

    get errorMessage() {
        /*
        * Getter for the error message.
        * */
        return this._errorMessage
    }

    get isOk() {
        /*
        * Returns true if no error else false.
        * */
        return !this._errorMessage
    }

    get processorTransactionID() {
        /*
        * Getter for the processor transaction ID.
        * */
        return this._processorTransactionID
    }

    get orderID() {
        /*
        * Getter for the order ID.
        * */
        return this._orderID
    }

    get merchantOrderID() {
        /*
        * Getter for the merchant order ID.
        * */
        return this._merchantOrderID
    }

    get amount() {
        /*
        * Getter for the amount.
        * */
        return this._amount
    }

    get currency() {
        /*
        * Getter for the currency.
        * */
        return this._currency
    }

    get customerEmail() {
        /*
        * Getter for the customer email.
        * */
        return this._customerEmail
    }

    get customParam() {
        /*
        * Getter for the custom param.
        * */
        return this._customParam
    }

    get request() {
        /*
        * Getter for the raw request.
        * */
        return this._request
    }
}

module.exports = {
    MGOrderStatusResponse:MGOrderStatusResponse
}