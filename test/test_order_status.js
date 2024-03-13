const {MockResponse, generateOrderStatusCheckOkPayload,
    generateOrderStatusCheckNotOkPayload
} = require("../zotapaysdk/testing_tools");
const {MGClient} = require("../zotapaysdk/client");
const {MGOrderStatusRequest} = require("../zotapaysdk/mg_requests/order_status_request");
const {MGOrderStatusResponse} = require("../zotapaysdk/mg_requests/order_status_response");

const nock = require("nock");


describe("Order Status tests", function () {
    
    var assert;
    before(async () => {
        const chai = await import('chai');
        assert = chai.assert;
    });

    it("Order status test success", async () => {

        const orderStatusCheckParameters = {
            "merchantOrderID" : "testID",
            "orderID" : "testOrderID",
        }

        const orderStatusCheckRequest = new MGOrderStatusRequest(orderStatusCheckParameters)

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointID",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }
        const orderStatusPayload = generateOrderStatusCheckOkPayload()
        const mgClient = new MGClient(clientProperties)
        const responseJson = new MockResponse(200, orderStatusPayload)

        nock(mgClient.requestUrl)
            .get(new RegExp(mgClient.orderStatusRequestUrl + "(.*?)"))
            .reply(responseJson.code, responseJson.data)

        const response = await mgClient.sendOrderStatusRequest(orderStatusCheckRequest)

        assert(response.rawData, "There is should be raw data")
        assert(response.merchantOrderID === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.MERCHANT_ORDER_ID],
            "There is a mismatch between merchant order IDs")
        assert(response.orderID === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.ORDER_ID],
            "There is a mismatch between order IDs")
        assert(response.customerEmail === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.CUSTOMER_EMAIL],
            "There is a mismatch between customer emails")
        assert(response.customParam === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.CUSTOM_PARAM],
            "There is a mismatch custom params")
        assert.deepEqual(response.request, orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.REQUEST],
            "There is a mismatch between requests")
        assert(response.status === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.STATUS],
            "There is a mismatch between statuses")
        assert(response.amount === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.AMOUNT],
            "There is a mismatch between amounts")
        assert(response.currency === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.CURRENCY],
            "There is a mismatch between currencies")
        assert(response.processorTransactionID === orderStatusPayload[MGOrderStatusResponse.DATA][MGOrderStatusResponse.PROCESSOR_TRANSACTION_ID],
            "There is a mismatch between processor transaction IDs")

    });

    it("Order status test fail", async () => {

        const orderStatusCheckParameters = {
            "merchantOrderID" : "testID",
            "orderID" : "testOrderID",
        }

        const orderStatusCheckRequest = new MGOrderStatusRequest(orderStatusCheckParameters)

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointID",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }
        const orderStatusPayload = generateOrderStatusCheckNotOkPayload()
        const mgClient = new MGClient(clientProperties)
        const responseJson = new MockResponse(400, orderStatusPayload)

        nock(mgClient.requestUrl)
            .get(new RegExp(mgClient.orderStatusRequestUrl + "(.*?)"))
            .reply(responseJson.code, responseJson.data)

        const response = await mgClient.sendOrderStatusRequest(orderStatusCheckRequest)

        assert(response.rawData, "There is should be raw data")
        assert(response.errorMessage === orderStatusPayload[MGOrderStatusResponse.MESSAGE],
            "There is a mismatch between error messages")
    })
});