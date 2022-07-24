const os = require("os")

const ZOTAPAY_REST_API_VERSION = "v1"
/*
Class with all the credential names that need to be set.
 */

class CredentialKeys{
    /*
    * Static class with all the names of the credentials that need to be set.
    * */

    // Environmental Variable Names
    static ENV_MERCHANT_ID = "ZOTAPAY_MERCHANT_ID"
    static ENV_MERCHANT_SECRET_KEY = "ZOTAPAY_MERCHANT_SECRET_KEY"
    static ENV_ENDPOINT_ID = "ZOTAPAY_ENDPOINT_ID"
    static ENV_REQUEST_URL = "ZOTAPAY_REQUEST_URL"

    // Configuration File Variable Names
    static CONFIG_MERCHANT_ID = "merchantID"
    static CONFIG_MERCHANT_SECRET_KEY = "merchantSecretKey"
    static CONFIG_ENDPOINT_ID = "endpointID"
    static CONFIG_REQUEST_URL = "requestUrl"
}


class MGCredentialsManager {
    /*
    * Class containing logic for dealing with credentials for the Zota API.
    * Parses the credentials from the keyword parameters, environment variables
    * or a config file in this strict order.
    * See Also https://doc.zotapay.com/deposit/1.0/?javascript#before-you-begin
    *
    * @param {Object} Object Object used for initializing the MGClient class
    * @param {String} Object.merchantID A merchant unique IDentifier, used for IDentification.
    * @param {String} Object.merchantSecretKey A authetication secret key to keep privately and securely.
    * @param {String} Object.endpointID Unique endpoint IDentifier to use in API mgRequests.
    * @param {String} Object.requestUrl Environment URL
    * */

    constructor({merchantID = null, merchantSecretKey = null, endpointID = null, requestUrl = null} = {}) {

        this.config = this.getConfig()
        this._merchantID = merchantID ? merchantID : this.getMerchantIDCredentials();
        this._merchantSecretKey = merchantSecretKey ? merchantSecretKey : this.getMerchantSecretKey();
        this._endpointID = endpointID ? endpointID : this.getEndpointID();
        this._requestUrl = requestUrl ? requestUrl : this.getRequestUrl();
        this.verifyCredentials()
    }

    get merchantID() {
        /*
        * Getter for Merchant ID.
        * @return {String}
        * */
        return this._merchantID
    }

    get merchantSecretKey() {
        /*
        * Getter for Merchant Secret Key.
        * @return {String}
        * */
        return this._merchantSecretKey
    }

    get endpointID() {
        /*
        * Getter for Endpoint ID.
        * @return {String}
        * */
        return this._endpointID
    }

    get requestUrl() {
        /*
        * Getter for Request URL.
        * @return {String}
        * */
        return this._requestUrl
    }

    getMerchantIDCredentials() {
        /*
        * Gets the Merchant ID from either the ENV VARS or from the config file.
        * */

        let configMerchantID = this.config[CredentialKeys.CONFIG_MERCHANT_ID];
        let envMerchantID = process.env[CredentialKeys.ENV_MERCHANT_ID];
        return configMerchantID ? configMerchantID : envMerchantID;
    }

    getMerchantSecretKey() {
        /*
        * Gets the Merchant Secret Key from either the ENV VARS or from the config file.
        * */

        let configSecretKey = this.config[CredentialKeys.CONFIG_MERCHANT_SECRET_KEY];
        let envSecretKey = process.env[CredentialKeys.ENV_MERCHANT_SECRET_KEY];
        return configSecretKey ? configSecretKey : envSecretKey;
    }

    getEndpointID() {
        /*
        * Gets the Endpoint ID from either the ENV VARS or from the config file.
        * */

        let configEndpointID = this.config[CredentialKeys.CONFIG_ENDPOINT_ID];
        let envEndpointID = process.env[CredentialKeys.ENV_ENDPOINT_ID];
        return configEndpointID ? configEndpointID : envEndpointID;
    }

    getRequestUrl(){
        /*
        * Gets the Request Url from either the ENV VARS or from the config file.
        * */

        let configRequestUrl = this.config[CredentialKeys.CONFIG_REQUEST_URL];
        let envRequestUrl = process.env[CredentialKeys.ENV_REQUEST_URL];
        return configRequestUrl ? configRequestUrl : envRequestUrl;
    }

    getConfig() {
        /*
        * Obtaining path of the config file and importing the config variables
        * */

        const userHomeDir = os.homedir();
        const mgConfigName = "/mg_config.js";

        const pkg = require(userHomeDir + mgConfigName)
        const {config} = pkg

        return config
    }
    verifyCredentials() {
        /*
        * Carries out a verification that all expected configuration variables are set.
        * */

        if (!this._merchantID || this._merchantID.length < 3) {
            throw new Error("No Merchant ID is set.")
        }
        if (!this._merchantSecretKey || this._merchantSecretKey.length < 3) {
            throw new Error("No Merchant Secret Key is set.")
        }
        if (!this._endpointID || this._endpointID.length < 3) {
            throw new Error("No Endpoint ID is set.")
        }
        if (!this._requestUrl || this._requestUrl.length < 3) {
            throw new Error("No Request URL is set.")
        }
    }
}

module.exports = {
    MGCredentialsManager: MGCredentialsManager,
    CredentialKeys: CredentialKeys,
    ZOTAPAY_REST_API_VERSION: ZOTAPAY_REST_API_VERSION
}