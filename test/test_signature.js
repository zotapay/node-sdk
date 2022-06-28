const {MGDepositRequest} = require("../zotapaysdk/mg_requests/deposit_request");
const {generateTestOrder, generateTestPayout} = require("../zotapaysdk/testing_tools");
const {DepositRequestParameters, PayoutRequestParameters} = require("../zotapaysdk/mg_requests/mg_request");
const {MGClient} = require("../zotapaysdk/client");

const {assert} = require("chai");
describe("Signature tests", function () {


    it("Deposit signature", () => {
        const expectedSignature = "4289ea00fd365d9b59689745b743839f101dc679f9e420022edac099290b161f"

        let additionalObject = {}
        additionalObject[DepositRequestParameters.MERCHANT_ORDER_ID] = "testMerchantId"

        let depositPayload= generateTestOrder(
            500, "MYR", additionalObject)

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointId",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)
        const depositRequest = new MGDepositRequest(depositPayload)

        const signature = mgClient._generateDepositRequestSignature(depositRequest)

        assert(expectedSignature === signature, "There is a mismatch in signatures")
    })

    it("Payout signature", () => {
        const expectedSignature = "b9d5c215e33c424292b589312af154ece3f156c5222786d032ca80b1eab229f0"

        let additionalObject = {}
        additionalObject[PayoutRequestParameters.MERCHANT_ORDER_ID] = "testMerchantId"

        let payoutPayload= generateTestPayout(
            500, "MYR", additionalObject)

        const clientProperties = {
            'merchantID': "testMerchant",
            'merchantSecretKey': "testMerchantKey",
            'endpointID': "testEndpointId",
            'requestUrl': MGClient.SANDBOX_API_URL,
        }

        const mgClient = new MGClient(clientProperties)
        const payoutRequest = new MGDepositRequest(payoutPayload)

        const signature = mgClient._generatePayoutRequestSignature(payoutRequest)

        assert(expectedSignature === signature, "There is a mismatch in signatures")
    })
})