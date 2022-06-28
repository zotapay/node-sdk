class MGCallback {
    static  TYPE = "type"
    static  STATUS = "status"
    static  ERROR_MESSAGE = "errorMessage"
    static  ENDPOINT_ID = "endpointID"
    static  PROCESSOR_TRANSACTION_ID = "processorTransactionID"
    static  ORDER_ID = "orderID"
    static  MERCHANT_ORDER_ID = "merchantOrderID"
    static  AMOUNT = "amount"
    static  CURRENCY = "currency"
    static  CUSTOMER_EMAIL = "customerEmail"
    static  CUSTOM_PARAM = "customParam"
    static  EXTRA_DATA = "extraData"
    static  ORIGINAL_REQUEST = "originalRequest"
    static  SIGNATURE = "signature"

    constructor(httpResponse) {

        this._type = httpResponse[MGCallback.TYPE] ? httpResponse[MGCallback.TYPE] : null
        this._status = httpResponse[MGCallback.STATUS] ? httpResponse[MGCallback.STATUS] : null
        this._errorMessage = httpResponse[MGCallback.ERROR_MESSAGE] ? httpResponse[MGCallback.ERROR_MESSAGE] : null
        this._endpointID = httpResponse[MGCallback.ENDPOINT_ID] ? httpResponse[MGCallback.ENDPOINT_ID] : null
        this._processorTransactionID = httpResponse[MGCallback.PROCESSOR_TRANSACTION_ID] ? httpResponse[MGCallback.PROCESSOR_TRANSACTION_ID] : null
        this._orderID = httpResponse[MGCallback.ORDER_ID] ? httpResponse[MGCallback.ORDER_ID] : null
        this._merchantOrderID = httpResponse[MGCallback.MERCHANT_ORDER_ID] ? httpResponse[MGCallback.MERCHANT_ORDER_ID] : null
        this._amount = httpResponse[MGCallback.AMOUNT] ? httpResponse[MGCallback.AMOUNT] : null
        this._currency = httpResponse[MGCallback.CURRENCY] ? httpResponse[MGCallback.CURRENCY] : null
        this._customerEmail = httpResponse[MGCallback.CUSTOMER_EMAIL] ? httpResponse[MGCallback.CUSTOMER_EMAIL] : null
        this._customParam = httpResponse[MGCallback.CUSTOM_PARAM] ? httpResponse[MGCallback.CUSTOM_PARAM] : null
        this._extraData = httpResponse[MGCallback.EXTRA_DATA] ? httpResponse[MGCallback.EXTRA_DATA] : null
        this._originalRequest = httpResponse[MGCallback.ORIGINAL_REQUEST] ? httpResponse[MGCallback.ORIGINAL_REQUEST] : null
        this._signature = httpResponse[MGCallback.SIGNATURE] ? httpResponse[MGCallback.SIGNATURE] : null
    }

    _validateSignature(merchantSecretKey) {
        /*
        * Validates whether the signature returned in the callback is OK.
        *
        * @param {String} merchantSecretKey The secret key as provided by ZotaPay*/
        const signature = util.format("%s%s%s%s%s%s%s", this.endpointID, this.orderID, this.merchantOrderID,
            this.status, this.amount, this.customerEmail, merchantSecretKey,
            depositRequest.orderAmount, depositRequest.customerEmail, this.merchantSecretKey)

        const sigHash = crypto.createHash('sha256').update(signature).digest('hex');
        return sigHash === this.signature
    }

    get type() {
        /*
        * Getter for Type.
        * @return {String}
        * */
        return this._type
    }

    get status() {
        /*
        * Getter for Status.
        * @return {String}
        * */
        return this._status
    }

    get errorMessage() {
        /*
        * Getter for Error Message.
        * @return {String}
        * */
        return this._errorMessage
    }

    get endpointID() {
        /*
        * Getter for Endpoint Id.
        * @return {String}
        * */
        return this._endpointID
    }
    get processorTransactionID() {
        /*
        * Getter for Processor Transaction Id.
        * @return {String}
        * */
        return this._processorTransactionID
    }

    get orderID() {
        /*
        * Getter for Order Id.
        * @return {String}
        * */
        return this._orderID
    }
    get merchantOrderID() {
        /*
        * Getter for Merchant Order ID.
        * @return {String}
        * */
        return this._merchantOrderID
    }

    get amount() {
        /*
        * Getter for Amount.
        * @return {String}
        * */
        return this._amount
    }
    get currency() {
        /*
        * Getter for Currency.
        * @return {String}
        * */
        return this._currency
    }

    get customerEmail() {
        /*
        * Getter for Customer Email.
        * @return {String}
        * */
        return this._customerEmail
    }
    get customParam() {
        /*
        * Getter for Custom Param.
        * @return {String}
        * */
        return this._customParam
    }

    get extraData() {
        /*
        * Getter for Extra Data.
        * @return {String}
        * */
        return this._extraData
    }

    get originalRequest() {
        /*
        * Getter for Original Request.
        * @return {String}
        * */
        return this._originalRequest
    }
    get signature() {
        /*
        * Getter for Callback Signature.
        * @return {String}
        * */
        return this._signature
    }

    isValid(merchantSecretKey) {
        /*
        * Checks if the signature is valid.
        * @return {Bool}
        * */
        return this._validateSignature(merchantSecretKey)
    }
}

module.exports = {
    MGCallback: MGCallback
}