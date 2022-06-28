const util = require('util');
const crypto = require('crypto');
const os = require("os")
const {MGPayoutRequest} = require("./mg_requests/payout_request");
const {MGOrderStatusRequest} = require("./mg_requests/order_status_request");
const {MGOrderStatusResponse} = require("./mg_requests/order_status_response");
const MGCredentialsManager = require("./config.js").MGCredentialsManager
const MGUrlsFormatter = require("./urls.js").MGUrlsFormatter
const MGDepositRequest = require("./mg_requests/deposit_request.js").MGDepositRequest
const MGCardDepositRequest = require("./mg_requests/card_deposit_request.js").MGCardDepositRequest
const UA_STRING = require("./helpers").UA_STRING
const sdkVersion = require("./../package.json").version
const GET = require("./constants.js").GET
const POST = require("./constants.js").POST
const mgRequest = require("./http_request.js").mgRequest;
const MGDepositResponse = require("./mg_requests/deposit_response.js").MGDepositResponse;
const MGCardDepositResponse = require("./mg_requests/card_deposit_response").MGCardDepositResponse;
const MGPayoutResponse = require("./mg_requests/payout_response").MGPayoutResponse;

class MGClient {

    static LIVE_API_URL = "https://api.zotapay.com"
    static SANDBOX_API_URL = "https://api.zotapay-sandbox.com";

    /*
    * Main client for working with Zotapay's API.
    * See more info https://doc.zotapay.com/deposit/1.0/?javascript#introduction
    *
    * @param {Object} Object Object used for initializing the MGClient class
    * @param {String} Object.merchantID A merchant unique IDentifier, used for IDentification.
    * @param {String} Object.merchantSecretKey A authetication secret key to keep privately and securely.
    * @param {String} Object.endpointID Unique endpoint IDentifier to use in API mgRequests.
    * @param {String} Object.requestUrl Environment URL
    * */
    constructor({merchantID=null, merchantSecretKey=null, endpointID=null, requestUrl=null} = {}) {
        this._credentialsManager = new MGCredentialsManager({
            merchantID: merchantID,
            merchantSecretKey : merchantSecretKey,
            endpointID: endpointID,
            requestUrl: requestUrl
        })

        this._depositResponse = MGDepositResponse
    }

    get merchantID() {
        /*
        * Getter for Merchant ID.
        * @return {String} 
        * */
        return this._credentialsManager.merchantID
    }

    get requestUrl() {
        /*
        * Getter for the Request Url.
        * @return {String} 
        * */
        return this._credentialsManager.requestUrl
    }

    get merchantSecretKey() {
        /*
        * Getter for the Merchant Secret Key.
        * @return {String} 
        * */
        return this._credentialsManager.merchantSecretKey
    }

    get endpointID() {
        /*
        * Getter for the Endpoint ID.
        * @return {String} 
        * */
        return this._credentialsManager.endpointID
    }

    get depositRequestUrl() {
        /*
        * Returns the url where deposit requests should be sent.
        * https://doc.zotapay.com/deposit/1.0/?javascript#deposit-request
        * @return {String} 
        * */
        return MGUrlsFormatter.getDepositUrl(this.endpointID)
    }

    get orderStatusRequestUrl() {
        /*
        * Returns the url where order status check requests should be sent.
        * https://doc.zotapay.com/deposit/1.0/?javascript#order-status-request
        * @return {String} 
        * */
        return MGUrlsFormatter.getOrderStatusUrl()
    }

    get payoutRequestUrl() {
        /*
        * Returns the url where payout requests should be sent.
        * https://mg-docs.zotapay.com/payout/1.0/#payout-request
        * @return {String} 
        * */
        return MGUrlsFormatter.getPayoutUrl(this.endpointID)
    }

    _generateDepositRequestSignature(depositRequest) {
        /*
        * Generates the signature for Deposit Requests as expected by Zotapay's API.
        * See https://doc.zotapay.com/deposit/1.0/?javascript#signature
        * 
        * @param {MGDepositRequest} depositRequest An instance of the Deposit Request that is to be signed
        * @return {String}
        * */
        const signature = util.format("%s%s%s%s%s", this.endpointID, depositRequest.merchantOrderID,
            depositRequest.orderAmount, depositRequest.customerEmail, this.merchantSecretKey)

        return crypto.createHash('sha256').update(signature).digest('hex');
    }

    _generateOrderStatusRequestSignature(orderStatusRequest, ts) {
        /*
        * Generates the signature for Order Status Requests as expected by Zotapay's API.
        * See https://doc.zotapay.com/deposit/1.0/?python#signature-2
        *
        * @param {MGOrderStatusRequest} orderStatusRequest An instance of the status request
        * @param {String} ts a timestamp for the signature (as required)
        * @return {String}
        * */
        const signature = util.format("%s%s%s%s%s", this.merchantID, orderStatusRequest.merchantOrderID,
            orderStatusRequest.orderID, ts, this.merchantSecretKey)

        return crypto.createHash('sha256').update(signature).digest('hex');
    }

    _generatePayoutRequestSignature(payoutRequest) {
        /*
        * Generates the signature for Payout Requests as expected by ZotaPay's API.
        * See https://mg-docs.zotapay.com/payout/1.0/#signature
        *
        * @param {MGPayoutRequest} payoutRequest An instance of the payout request
        * @return {String}
        * */
        const signature = util.format("%s%s%s%s%s%s", this.endpointID, payoutRequest.merchantOrderID,
            payoutRequest.orderAmount, payoutRequest.customerEmail,
            payoutRequest.customerBankAccountNumber, this.merchantSecretKey)

        return crypto.createHash('sha256').update(signature).digest('hex');
    }

    _prepareUserAgentForRequest() {
        /*
        * Generates the User Agent to be used in the header of each request
        * @return {String}
        * */
        const userAgent = util.format(UA_STRING, sdkVersion, os.version(), process.version)
        return userAgent
    }

    _generateDepositRequestHeaders() {
        return {"content-type": "application/json", "user-agent": this._prepareUserAgentForRequest()}
    }

    _generateOrderStatusRequestHeaders() {
        return {"content-type": "application/json", "user-agent": this._prepareUserAgentForRequest()}
    }

    _generatePayoutRequestHeaders(payload) {
        return {"content-type": "application/json", "user-agent": this._prepareUserAgentForRequest()}
    }

    _assertAllValuesAsStrings(payload) {
        /*
        * Iterates over the request payload and ensures that all values are cast to strings
        * as expected by the ZotaPay API.
        *
        * @param {Map<String,undefined>} A dict of parameters that are to be send as the API call payload.
        * @return {Map<String,String>} The same payload dict with all values converted to strings.
        * */
        for (let entry in payload) {

            if (payload[entry]) {
                payload[entry] = payload[entry].toString()
            }
        }

        return payload
    }

    _sendRequest (method, url, payload, headers) {
        /*
        * Send the call to the API.
        *
        * @param {String} method The method of the request.
        * @param {String} url The actual url to send to.
        * @param {Map<String,undefined>} payload The payout of the request.
        * @param {String} headers The expected headers.
        * */
        if (payload) {
            payload = JSON.stringify(this._assertAllValuesAsStrings(payload))
        }

        return mgRequest(method, url, payload, headers)
            .then((res) => { return res.data})
            .catch((err) => { return err.response.data;})

    }

    _sendDepositRequest(depositRequest) {
        /*
        * Sends a general deposit request to the ZotaPay API
        *
        * @param {MGDepositRequest} depositRequest See class implementation for more detailed information.
        * */
        const signature = this._generateDepositRequestSignature(depositRequest)
        const payload = depositRequest.toSignedPayload(signature)
        const headers = this._generateDepositRequestHeaders()
        const url = this.requestUrl + this.depositRequestUrl

        return this._sendRequest(POST, url, payload, headers)
            .then((res) => { return new MGDepositResponse(res)})
    }

    _sendCreditCardDepositRequest(depositRequest) {
        /*
        * Sends a card deposit request to the ZotaPay API
        *
        * @param {MGCardDepositRequest} depositRequest See class implementation for more detailed information.
        * */
        const signature = this._generateDepositRequestSignature(depositRequest)
        const payload = depositRequest.toSignedPayload(signature)
        const headers = this._generateDepositRequestHeaders()
        const url = this.requestUrl + this.depositRequestUrl

        return this._sendRequest(POST, url, payload, headers)
            .then((res) => {return new MGCardDepositResponse(res)})

    }

    sendDepositRequest(depositRequest) {
        /*
        * Sends a general deposit request to the ZotaPay API
        *
        * @param {MGDepositRequest} depositRequest See class implementation for more detailed information.
        * */
        if (depositRequest instanceof  MGCardDepositRequest) {
            return this._sendCreditCardDepositRequest(depositRequest)
                .then((response) => {return response})
        }
        if (depositRequest instanceof MGDepositRequest) {
            return this._sendDepositRequest(depositRequest)
                .then((response) => {return response})
        }

        throw new Error(util.format("Unsupported request type %s", depositRequest.constructor.name))
    }

    sendOrderStatusRequest(orderStatusRequest) {
        /*
        * Sends a order status request to the ZotaPay API
        *
        * @param {MGOrderStatusRequest} orderStatusRequest See class implementation for more detailed information.
        * */
        const ts = Math.floor(new Date() / 1000)
        const signature = this._generateOrderStatusRequestSignature(orderStatusRequest,ts)
        const payload = orderStatusRequest.toSignedPayload(this.merchantID,ts,signature)
        const headers = this._generateOrderStatusRequestHeaders()
        const url = this.requestUrl + this.orderStatusRequestUrl + payload
        return this._sendRequest(GET, url, null, headers)
            .then((res) => {return new MGOrderStatusResponse(res)})
    }

    sendPayoutRequest(payoutRequest) {
        /*
        * Sends a payout request to the ZotaPay API
        *
        * @param {MGPayoutRequest} payoutRequest See class implementation for more detailed information.
        * */
        const signature = this._generatePayoutRequestSignature(payoutRequest)
        const payload = payoutRequest.toSignedPayload(signature)
        const headers = this._generatePayoutRequestHeaders()
        const url = this.requestUrl + this.payoutRequestUrl
        return this._sendRequest(POST, url, payload, headers)
            .then((res) => {return new MGPayoutResponse(res)})
    }
}

module.exports = {MGClient: MGClient}