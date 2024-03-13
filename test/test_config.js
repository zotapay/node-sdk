
const config = require("./../zotapaysdk/config.js");
const MGCredentialsManager = config.MGCredentialsManager;
const CredentialKeys = config.CredentialKeys;

const sinon = require("sinon");


describe("Credential configuration tests", function () {
    
    var expect;
    var env;
    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
        env = process.env;
        sinon.stub(MGCredentialsManager.prototype, "getConfig").callsFake( () => { return "";});
    });

    it("Environmental configuration fail for missing Merchant ID", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = ""
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Merchant ID is set.")
    });

    it("Environmental configuration fail for missing Merchant Secret Key", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = ""
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Merchant Secret Key is set.")
    });

    it("Environmental configuration fail for missing Endpoint ID", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = ""
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Endpoint ID is set.")
    });

    it("Environmental configuration fail for missing Request Url", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = ""

        expect(function () {new MGCredentialsManager}).to.throw("No Request URL is set.")
    });

    it("Environmental configuration success", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.not.throw()
    });

    it("Environmental configuration with bad Merchant ID", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = " "
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Merchant ID is set.")
    });

    it("Environmental configuration with bad credentials Merchant Secret Key", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = " "
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Merchant Secret Key is set.")
    });

    it("Environmental configuration with bad credentials Endpoint ID", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = " "
        process.env[CredentialKeys.ENV_REQUEST_URL] = "testRequestUrl"

        expect(function () {new MGCredentialsManager}).to.throw("No Endpoint ID is set.")
    });

    it("Environmental configuration with bad credentials Request Url", function () {

        process.env[CredentialKeys.ENV_MERCHANT_ID] = "testMerchantID"
        process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY] = "testMerchantSecretKey"
        process.env[CredentialKeys.ENV_ENDPOINT_ID] = "testEndpointID"
        process.env[CredentialKeys.ENV_REQUEST_URL] = " "

        expect(function () {new MGCredentialsManager}).to.throw("No Request URL is set.")
    });

    it("Credentials manager tests", function () {

        expect(function () {new MGCredentialsManager({
            merchantID:"a",
            merchantSecretKey:"a",
            endpointID:"a",
            requestUrl: "a"})})
            .to.throw("No Merchant ID is set.")

        expect(function () {new MGCredentialsManager({
            merchantID:"testtest",
            merchantSecretKey:"testtest",
            endpointID:"testtest"})})
            .to.throw("No Request URL is set.")
    })
    // restoring everything back
    after(function () {
        process.env = env;
    });
});
