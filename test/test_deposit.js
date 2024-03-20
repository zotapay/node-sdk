const {generateTestOrderWithOkResponse, MockResponse, generateTestOrder, TestCreditCards} = require("../zotasdk/testing_tools");
const {MGClient} = require("../zotasdk/client");
const {MGDepositRequest} = require("../zotasdk/mg_requests/deposit_request");
const {MGDepositResponse} = require("../zotasdk/mg_requests/deposit_response");
const {DepositRequestParameters} = require("../zotasdk/mg_requests/mg_request");
const {MGCardDepositRequest} = require("../zotasdk/mg_requests/card_deposit_request");
const {MGCardDepositResponse} = require("../zotasdk/mg_requests/card_deposit_response");

const nock = require("nock")


describe("Deposit tests", function () {

    var assert, expect;
    before(async () => {
        const chai = await import('chai');
        assert = chai.assert;
        expect = chai.expect;
    });

    it("Deposit test success", async () => {

        let [depositPayload, responsePayload] = generateTestOrderWithOkResponse(500, "MYR")

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointID",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)
        const depositRequest = new MGDepositRequest(depositPayload)
        const responseJson = new MockResponse(200, responsePayload)

        nock(mgClient.requestUrl)
            .post(mgClient.depositRequestUrl)
            .reply(responseJson.code, responseJson.data)

        const response = await mgClient.sendDepositRequest(depositRequest)

        assert(response.isOk, "There is an error with deposit response")
        assert(response.merchantOrderID === responsePayload[MGDepositResponse.DATA][MGDepositResponse.MERCHANT_ORDER_ID],
            "There is a mismatch between merchant order IDs")
        assert(response.orderID === responsePayload[MGDepositResponse.DATA][MGDepositResponse.ORDER_ID],
                "There is a mismatch between order IDs")


    });

    it("Customer validation function fail", () => {
        let testDepositPayload = generateTestOrder(500, "USD", {})

        for (const country of ["US", "CA", "AU"]) {
            testDepositPayload[DepositRequestParameters.CUSTOMER_COUNTRY_CODE] = country
            testDepositPayload[DepositRequestParameters.CUSTOMER_STATE] = ""

            const depositRequest = new MGDepositRequest(testDepositPayload)
            let [ok,] = depositRequest.validate()

            assert(!ok, "There should be validation error for missing state")
        }

    })

    it("Customer validation function success", () => {
        let testDepositPayload = generateTestOrder(500, "USD", {})

        for (const country of ["US", "CA", "AU"]) {
            testDepositPayload[DepositRequestParameters.CUSTOMER_COUNTRY_CODE] = country
            testDepositPayload[DepositRequestParameters.CUSTOMER_STATE] = "NY"

            const depositRequest = new MGDepositRequest(testDepositPayload)
            let [ok,] = depositRequest.validate()

            assert(ok, "There should be not be a validation error for missing state")
        }

    })

    it("Test deposit request valus mapped correctly", () => {
        let testDepositPayload = generateTestOrder(500, "USD" )
        const depositRequest = new MGDepositRequest(testDepositPayload)

        for (let [,value] of Object.entries(depositRequest)) {
            let testParamValue = testDepositPayload[value.paramName] ? testDepositPayload[value.paramName] : null

            assert(value.paramValue === testParamValue, "Values should be the same")
        }
    })

    it("Test card deposit request validation success", () => {
        let testDepositPayload = generateTestOrder(500, "USD", TestCreditCards.visaApprovedNo3d())
        const cardDepositRequest = new MGCardDepositRequest(testDepositPayload)
        const [ok,] = cardDepositRequest.validate()

        assert(ok, "Card deposit request should be validated correctly")
    })

    it("Test card deposit request validation month fail", () => {
        let testDepositPayload = generateTestOrder(500, "USD", TestCreditCards.visaApprovedNo3d())
        testDepositPayload["cardExpirationMonth"] = "002"
        const cardDepositRequest = new MGCardDepositRequest(testDepositPayload)
        const [ok,] = cardDepositRequest.validate()

        assert(!ok, "Card deposit request should not be validated")
    })

    it("Test card deposit request validation year fail", () => {
        let testDepositPayload = generateTestOrder(500, "USD", TestCreditCards.visaApprovedNo3d())
        testDepositPayload["cardExpirationYear"] = "20220"
        const cardDepositRequest = new MGCardDepositRequest(testDepositPayload)
        const [ok,] = cardDepositRequest.validate()

        assert(!ok, "Card deposit request should not be validated")
    })

    it("Test card deposit request validation number fail", () => {
        let testDepositPayload = generateTestOrder(500, "USD", TestCreditCards.visaApprovedNo3d())

        testDepositPayload["cardNumber"] = "12345678915621623535353535"
        const cardDepositRequest = new MGCardDepositRequest(testDepositPayload)
        const [ok,] = cardDepositRequest.validate()

        assert(!ok, "Card deposit request should not be validated")
    })

    it("Send unsupported request object test", async () => {
        const clientProperties = {
            'merchantID': "test_merchant",
            'merchantSecretKey': "test_merchant_key",
            'endpointID': "503364",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)

        expect(function () { mgClient.sendDepositRequest({}) }).to.throw(
            "Unsupported request type Object")

    })

    it("Test card deposit request valus mapped correctly", () => {
        const testDepositPayload = generateTestOrder(500, "USD", TestCreditCards.visaPending3d())
        const depositRequest = new MGCardDepositRequest(testDepositPayload)

        for (let [,value] of Object.entries(depositRequest)) {
            let testParamValue = testDepositPayload[value.paramName] ? testDepositPayload[value.paramName] : null

            assert(value.paramValue === testParamValue, "Values should be the same")
        }
    })

    it("Test card deposit response success", () => {
        const [, responsePayload] = generateTestOrderWithOkResponse(500, "USD",
            TestCreditCards.visaPending3d())

        const response = new MGCardDepositResponse(responsePayload)

        assert(response.isOk, "Card deposit response should be ok")
        assert(!response.error, "Card deposit response error should be null")
        assert(response.status === responsePayload[MGCardDepositResponse.DATA][MGCardDepositResponse.STATUS],
            "Error in card deposit status mapping")
        assert(response.orderID === responsePayload[MGCardDepositResponse.DATA][MGCardDepositResponse.ORDER_ID],
            "Error in card deposit order ID mapping")
        assert(response.merchantOrderID === responsePayload[MGCardDepositResponse.DATA][MGCardDepositResponse.MERCHANT_ORDER_ID],
            "Error in card deposit merchant order ID mapping")
    })

    it("Build card deposit request using setters", () => {
        const empty = {}
        let cardDepositRequest = new MGCardDepositRequest(empty)
        const cardDepositRequestPayload = generateTestOrder(500, "USD", TestCreditCards.mastercardPending3d())

        for (let value in cardDepositRequestPayload) {
            let setter = "set" + value[0].toUpperCase() + value.slice(1)

            cardDepositRequest[setter](cardDepositRequestPayload[value])
        }

        for (let [,value] of Object.entries(cardDepositRequest)) {
            assert(cardDepositRequest[value.paramName] == cardDepositRequestPayload[value.paramName],
                "There should not be a mismatch")
        }

    })

    it("Build deposit request using setters", () => {
        const empty = {}
        let depositRequest = new MGDepositRequest(empty)
        const depositRequestPayload = generateTestOrder(500, "USD")

        for (let value in depositRequestPayload) {
            let setter = "set" + value[0].toUpperCase() + value.slice(1)

            depositRequest[setter](depositRequestPayload[value])
        }

        for (let [,value] of Object.entries(depositRequest)) {
            assert(depositRequest[value.paramName] == depositRequestPayload[value.paramName],
                "There should not be a mismatch")
        }

    })
});
