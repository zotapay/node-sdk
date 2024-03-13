const {MockResponse, generateTestPayoutWithOkResponse,
    generateTestPayoutWithNotOkResponse, generateTestPayout
} = require("../zotapaysdk/testing_tools");
const {MGClient} = require("../zotapaysdk/client");
const {MGPayoutResponse} = require("../zotapaysdk/mg_requests/payout_response");
const {MGPayoutRequest} = require("../zotapaysdk/mg_requests/payout_request");

const nock = require("nock");


describe("Payout tests", function () {
    
    var assert;
    before(async () => {
        const chai = await import('chai');
        assert = chai.assert;
    });
    
    it("Payout test success", async () => {

        let [payoutPayload, responsePayload] = generateTestPayoutWithOkResponse(500, "MYR")

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointID",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)
        const payoutRequest = new MGPayoutRequest(payoutPayload)
        const responseJson = new MockResponse(200, responsePayload)

        nock(mgClient.requestUrl)
            .post(mgClient.payoutRequestUrl)
            .reply(responseJson.code, responseJson.data)

        const response = await mgClient.sendPayoutRequest(payoutRequest)

        assert(response.isOk, "There is an error with payout response")
        assert(!response.error, "There should not be error")
        assert(response.merchantOrderID === responsePayload[MGPayoutResponse.DATA][MGPayoutResponse.MERCHANT_ORDER_ID],
            "There is a mismatch between merchant order IDs")
        assert(response.orderID === responsePayload[MGPayoutResponse.DATA][MGPayoutResponse.ORDER_ID],
            "There is a mismatch between order IDs")

        });

    it("Payout test fail", async () => {
        let [payoutPayload, responsePayload] = generateTestPayoutWithNotOkResponse(500, "USD")

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointID",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)
        const payoutRequest = new MGPayoutRequest(payoutPayload)
        const responseJson = new MockResponse(400, responsePayload)

        nock(mgClient.requestUrl)
            .post(mgClient.payoutRequestUrl)
            .reply(responseJson.code, responseJson.data)

        const response = await mgClient.sendPayoutRequest(payoutRequest)

        assert(!response.isOk, "Payout response should not be ok")

    })

    it("Test payout request values mapped correctly", () => {
        let testPayoutPayload = generateTestPayout(500, "USD", )
        const payoutRequest = new MGPayoutRequest(testPayoutPayload)

        for (let [,value] of Object.entries(payoutRequest)) {
            let testParamValue = testPayoutPayload[value.paramName] ? testPayoutPayload[value.paramName] : null

            assert(value.paramValue === testParamValue, "Values should be the same")
        }
    })

    it("Build payout request using setters", () => {
        const empty = {}
        let payoutRequest = new MGPayoutRequest(empty)
        const payoutRequestPayload = generateTestPayout(500, "USD")

        for (let value in payoutRequestPayload) {
            let setter = "set" + value[0].toUpperCase() + value.slice(1)

            payoutRequest[setter](payoutRequestPayload[value])
        }

        for (let [,value] of Object.entries(payoutRequest)) {
            assert(payoutRequest[value.paramName] == payoutRequestPayload[value.paramName],
                "There should not be a mismatch")
        }

    })
});
