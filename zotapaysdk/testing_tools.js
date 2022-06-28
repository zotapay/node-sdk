const {CardDepositRequestParameters, DepositRequestParameters, PayoutRequestParameters} = require("../zotapaysdk/mg_requests/mg_request.js")
const {MGDepositResponse} = require("../zotapaysdk/mg_requests/deposit_response")
const {MGCardDepositResponse} = require("../zotapaysdk/mg_requests/card_deposit_response")
const {MGOrderStatus} = require("../zotapaysdk/mg_requests/order_status_request")

const crypto = require('crypto');
const {MGPayoutResponse} = require("./mg_requests/payout_response");

class MockResponse {
    /*
    * Basic mock class for the response
    *
    * @param {Number} code Status of the request
    * @param {String} data The payload of the response data*/
    constructor(code,payload) {

        this.code = code
        this.data = payload
    }
}

class TestCreditCards {
    /*
    * Contains all the test cards that can be used against the ZotaPay Sandbox API
    * */

    static visaApprovedNo3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "5555555555555557"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }

    static visaPending3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "4222222222347466"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }

    static mastercardApprovedNo3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "5555555555555557"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }

    static mastercardPending3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "5595883393160089"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }

    static jcbApprovedNo3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "3555555555555552"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }

    static jcbPending3d() {
        const card = {}
        card[CardDepositRequestParameters.CARD_NUMBER] = "3530185156387088"
        card[CardDepositRequestParameters.CARD_EXPIRATION_MONTH] = "11"
        card[CardDepositRequestParameters.CARD_EXPIRATION_YEAR] = "2030"
        card[CardDepositRequestParameters.CARD_HOLDER_NAME] = "John Doe"
        card[CardDepositRequestParameters.CARD_CVV] = "191"

        return card
    }
}

function buildRandomId() {
    return crypto.randomUUID().replace(/-/g, "")
}

function generateTestOrder(amount = 500, currency= "USD", additionalObject ) {
    /*
    * Generates a test deposit request payload passing all parameter verifications
    *
    * @param {Number} amount Amount of the payload request
    * @param {String} currency Currency of the payload request
    * @param {Object} additionalObject Additional object containing any additional fields that need to be added
    * */
    let depositRequest = {}
    depositRequest[DepositRequestParameters.MERCHANT_ORDER_ID] = buildRandomId()
    depositRequest[DepositRequestParameters.MERCHANT_ORDER_DESC] = "Test order"
    depositRequest[DepositRequestParameters.ORDER_AMOUNT] = String(amount)
    depositRequest[DepositRequestParameters.ORDER_CURRENCY] = String(currency)
    depositRequest[DepositRequestParameters.CUSTOMER_EMAIL] = "customer@email-address.com"
    depositRequest[DepositRequestParameters.CUSTOMER_FIRST_NAME] = "John"
    depositRequest[DepositRequestParameters.CUSTOMER_LAST_NAME] = "Doe"
    depositRequest[DepositRequestParameters.CUSTOMER_ADDRESS] = "5/5 Moo 5 Thong"
    depositRequest[DepositRequestParameters.CUSTOMER_COUNTRY_CODE] = "TH"
    depositRequest[DepositRequestParameters.CUSTOMER_CITY] = "Surat Thani"
    depositRequest[DepositRequestParameters.CUSTOMER_ZIP_CODE] = "84280"
    depositRequest[DepositRequestParameters.CUSTOMER_PHONE] = "+66-77999110"
    depositRequest[DepositRequestParameters.CUSTOMER_IP] = "103.106.8.104"
    depositRequest[DepositRequestParameters.CUSTOMER_STATE] = "TS"
    depositRequest[DepositRequestParameters.LANGUAGE] = "en"
    depositRequest[DepositRequestParameters.REDIRECT_URL] =
    "https://www.example-merchant.com/payment-return/"
    depositRequest[DepositRequestParameters.CALLBACK_URL] =
    "https://www.example-merchant.com/payment-callback/"
    depositRequest[DepositRequestParameters.CUSTOM_PARAM] =
    "{\"UserId\": \"e139b447\"}"
    depositRequest[DepositRequestParameters.CHECKOUT_URL] =
    "https://www.example-merchant.com/account/deposit/?uid=e139b447"

    depositRequest[DepositRequestParameters.CUSTOMER_BANK_CODE] = "123456"

    for (let key in additionalObject) {
        depositRequest[key] = additionalObject[key]
    }

    return depositRequest
}

function generateTestOrderWithOkResponse(amount=500, currency = "USD", additionalObject ) {
    /*
    * Generates a test deposit order with successful response
    *
    * @param {Number} amount Amount of the payload request
    * @param {String} currency Currency of the payload request
    * @param {Object} additionalObject Additional object containing any additional fields that need to be added
    * */
    const depositPayload = generateTestOrder(amount, currency, additionalObject)

    const isCard = !!depositPayload[CardDepositRequestParameters.CARD_NUMBER]

    let responsePayload = {}
    responsePayload[MGDepositResponse.CODE] = "200"
    responsePayload[MGDepositResponse.DATA] = {}
    responsePayload[MGDepositResponse.DATA][MGDepositResponse.MERCHANT_ORDER_ID] = depositPayload[DepositRequestParameters.MERCHANT_ORDER_ID]
    responsePayload[MGDepositResponse.DATA][MGDepositResponse.ORDER_ID] = buildRandomId()

    if (isCard) {
        responsePayload[MGDepositResponse.DATA][MGCardDepositResponse.STATUS] = MGOrderStatus.PROCESSING
    } else {
        responsePayload[MGDepositResponse.DATA][MGDepositResponse.DEPOSIT_URL] =
            "https://api.zotapay.com/api/v1/deposit/init/8b3a6b89697e8ac8f45d964bcc90c7ba41764acd/"
    }

    return [depositPayload, responsePayload]
}

function generateTestPayout(amount=500, currency="USD", additionalObject) {
    /*
    * Generates a test deposit request payload passing all parameter verifications
    *
    * @param {Number} amount Amount of the payload request
    * @param {String} currency Currency of the payload request
    * @param {Object} additionalObject Additional object containing any additional fields that need to be added
    * */
    let payoutRequest = {}
    payoutRequest[PayoutRequestParameters.MERCHANT_ORDER_ID] = buildRandomId()
    payoutRequest[PayoutRequestParameters.MERCHANT_ORDER_DESC] = "Test Payout"
    payoutRequest[PayoutRequestParameters.ORDER_AMOUNT] = amount
    payoutRequest[PayoutRequestParameters.ORDER_CURRENCY] = currency
    payoutRequest[PayoutRequestParameters.CUSTOMER_EMAIL] = "customer@email-address.com"
    payoutRequest[PayoutRequestParameters.CUSTOMER_FIRST_NAME] = "John"
    payoutRequest[PayoutRequestParameters.CUSTOMER_LAST_NAME] = "Doe"
    payoutRequest[PayoutRequestParameters.CUSTOMER_PHONE] = "+66-77999110"
    payoutRequest[PayoutRequestParameters.CUSTOMER_IP] = "103.106.8.104"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_CODE] = "BBL"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NUMBER] = "3678094857345"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NAME] = "Test Account Name"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_BRANCH] = "Test Bank Branch"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ADDRESS] = "12 Test Address Bank"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ZIP_CODE] = "9EH 8QU"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ROUTING_NUMBER] = "20496793023"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_PROVINCE] = "Test Province"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_AREA] = "Test Area"
    payoutRequest[PayoutRequestParameters.CALLBACK_URL] = "https://www.example-merchant.com/payment-callback/"
    payoutRequest[PayoutRequestParameters.CUSTOM_PARAM] = "{\"UserId\": \"e139b447\"}"

    payoutRequest[PayoutRequestParameters.CUSTOMER_COUNTRY_CODE] = "testCode"
    payoutRequest[PayoutRequestParameters.CUSTOMER_PERSONAL_ID] = "testId"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NUMBER_DIGIT] = "6"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_TYPE] = "testType"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_SWIFT_CODE] = "2525"
    payoutRequest[PayoutRequestParameters.CUSTOMER_BANK_BRANCH_DIGIT] = "25"

    for (let key in additionalObject) {
        payoutRequest[key] = additionalObject[key]
    }

    return payoutRequest
}

function generateTestPayoutWithOkResponse(amount = 500, currency = "USD", additionalObject) {
    /*
    * Generates a test payout order with successful response
    *
    * @param {Number} amount Amount of the payload request
    * @param {String} currency Currency of the payload request
    * @param {Object} additionalObject Additional object containing any additional fields that need to be added
    * */
    const payoutPayout = generateTestPayout(amount,currency,additionalObject)

    let responsePayout = {}
    responsePayout[MGPayoutResponse.CODE] = "200"
    responsePayout[MGPayoutResponse.DATA] = {}
    responsePayout[MGPayoutResponse.DATA][MGPayoutResponse.MERCHANT_ORDER_ID] = payoutPayout[PayoutRequestParameters.MERCHANT_ORDER_ID]
    responsePayout[MGPayoutResponse.DATA][MGPayoutResponse.ORDER_ID] = buildRandomId()

    return [payoutPayout,responsePayout]
}

function generateTestPayoutWithNotOkResponse(amount=500, currency = "USD", additionalObject) {
    /*
    * Generates a test payout order with fail response
    *
    * @param {Number} amount Amount of the payload request
    * @param {String} currency Currency of the payload request
    * @param {Object} additionalObject Additional object containing any additional fields that need to be added
    * */
    const payoutPayout = generateTestPayout(amount,currency,additionalObject)

    let responsePayout = {}
    responsePayout[MGPayoutResponse.CODE] = "401"
    responsePayout[MGPayoutResponse.MESSAGE] = "unauthorized"

    return [payoutPayout,responsePayout]
}

function generateOrderStatusCheckOkPayload() {
    /*
    * Generates a test status check response payload with successful response
    * */
    return {'code': "200",
            'data': {
            "type": "SALE",
            "status": "PROCESSING",
            "errorMessage": "",
            "endpointID": "1050",
            "processorTransactionID": "",
            "orderID": "8b3a6b89697e8ac8f45d964bcc90c7ba41764acd",
            "merchantOrderID": "QvE8dZshpKhaOmHY",
            "amount": "500.00",
            "currency": "THB",
            "customerEmail": "customer@email-address.com",
            "customParam": "{\"UserId\": \"e139b447\"}",
            "extraData": "",
            "request": {
                "merchantID": "EXAMPLE-MERCHANT-ID",
                "orderID": "8b3a6b89697e8ac8f45d964bcc90c7ba41764acd",
                "merchantOrderID": "QvE8dZshpKhaOmHY",
                "timestamp": "1564617600"
            }
        }}
}

function generateOrderStatusCheckNotOkPayload() {
    /*
    * Generates a test status check response payload with failed response
    * */
    return {
        "code": "400",
        "message": "timestamp too old"
    }
}

module.exports = {
    MockResponse: MockResponse,
    TestCreditCards: TestCreditCards,
    generateTestOrder: generateTestOrder,
    generateTestPayout: generateTestPayout,
    generateTestOrderWithOkResponse: generateTestOrderWithOkResponse,
    generateTestPayoutWithOkResponse: generateTestPayoutWithOkResponse,
    generateTestPayoutWithNotOkResponse: generateTestPayoutWithNotOkResponse,
    generateOrderStatusCheckOkPayload: generateOrderStatusCheckOkPayload,
    generateOrderStatusCheckNotOkPayload: generateOrderStatusCheckNotOkPayload,
}