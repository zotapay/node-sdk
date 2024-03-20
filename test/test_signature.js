const {MGDepositRequest} = require("../zotasdk/mg_requests/deposit_request");
const {MGPayoutRequest} = require("../zotasdk/mg_requests/payout_request");
const {generateTestOrder, generateTestPayout} = require("../zotasdk/testing_tools");
const {DepositRequestParameters, PayoutRequestParameters} = require("../zotasdk/mg_requests/mg_request");
const {MGClient} = require("../zotasdk/client");


describe("Signature tests", function () {

    var assert;
    before(async () => {
        const chai = await import('chai');
        assert = chai.assert;
    });

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
        const expectedSignature = "98dd04a5a24729498818033ba491716332afe7a6d614c41daf8e92b209643f6f"

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
        const payoutRequest = new MGPayoutRequest(payoutPayload)

        const signature = mgClient._generatePayoutRequestSignature(payoutRequest)

        assert(expectedSignature === signature, "There is a mismatch in signatures")
    })
});
