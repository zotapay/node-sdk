const util = require('util');

const DepositRequestParameters = require("./mg_request.js").DepositRequestParameters
const MGRequestParam = require("./objects.js").MGRequestParam

class MGDepositRequest extends DepositRequestParameters {
    /*
    * Class containing all the parameters and logic for creating a non-CC
    * deposit request through the Zotapay API SDK.
    * See https://doc.zotapay.com/deposit/1.0/?python#deposit-request for more info.
    *
    * */
    constructor({merchantOrderID = null, merchantOrderDesc = null, orderAmount = null,
                    orderCurrency = null, customerEmail = null, customerFirstName = null,
                    customerLastName = null, customerAddress = null, customerCountryCode = null,
                    customerCity = null, customerState = null, customerZipCode = null,
                    customerPhone = null, customerIP = null, customerBankCode = null,
                    redirectUrl = null, callbackUrl = null, checkoutUrl = null,
                    customParam = null, language = null}) {

        super()

        this._merchantOrderID = new MGRequestParam(
            DepositRequestParameters.MERCHANT_ORDER_ID,
            merchantOrderID,
            128,
            true
        )

        this._merchantOrderDesc = new MGRequestParam(
            DepositRequestParameters.MERCHANT_ORDER_DESC,
            merchantOrderDesc,
            128,
            true
        )

        this._orderAmount = new MGRequestParam(
            DepositRequestParameters.ORDER_AMOUNT,
            orderAmount,
            24,
            true
        )

        this._orderCurrency = new MGRequestParam(
            DepositRequestParameters.ORDER_CURRENCY,
            orderCurrency,
            3,
            true
        )

        this._customerEmail = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_EMAIL,
            customerEmail,
            50,
            true
        )

        this._customerFirstName = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_FIRST_NAME,
            customerFirstName,
            128,
            true
        )

        this._customerLastName = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_LAST_NAME,
            customerLastName,
            128,
            true
        )

        this._customerAddress = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_ADDRESS,
            customerAddress,
            128,
            true
        )

        this._customerCountryCode = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_COUNTRY_CODE,
            customerCountryCode,
            2,
            true
        )

        this._customerCity = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_CITY,
            customerCity,
            128,
            true
        )

        this._customerState = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_STATE,
            customerState,
            3,
            false
        )

        this._customerZipCode = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_ZIP_CODE,
            customerZipCode,
            15,
            true
        )

        this._customerPhone = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_PHONE,
            customerPhone,
            15,
            true
        )

        this._customerIP = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_IP,
            customerIP,
            64,
            true
        )

        this._customerBankCode = new MGRequestParam(
            DepositRequestParameters.CUSTOMER_BANK_CODE,
            customerBankCode,
            11,
            false
        )

        this._redirectUrl = new MGRequestParam(
            DepositRequestParameters.REDIRECT_URL,
            redirectUrl,
            255,
            true
        )

        this._callbackUrl = new MGRequestParam(
            DepositRequestParameters.CALLBACK_URL,
            callbackUrl,
            255,
            false
        )

        this._checkoutUrl = new MGRequestParam(
            DepositRequestParameters.CHECKOUT_URL,
            checkoutUrl,
            255,
            true
        )

        this._customParam = new MGRequestParam(
            DepositRequestParameters.CUSTOM_PARAM,
            customParam,
            128,
            false
        )

        this._language = new MGRequestParam(
            DepositRequestParameters.LANGUAGE,
            language,
            2,
            false
        )
    }

    get merchantOrderID() {
        return this._merchantOrderID.paramValue
    }

    setMerchantOrderID(value) {
        this._merchantOrderID.setValue(value)
        return this
    }

    get merchantOrderDesc() {
        return this._merchantOrderDesc.paramValue
    }

    setMerchantOrderDesc(value) {
        this._merchantOrderDesc.setValue(value)
        return this
    }

    get orderAmount() {
        return this._orderAmount.paramValue
    }

    setOrderAmount(value) {
        this._orderAmount.setValue(value)
        return this
    }

    get orderCurrency() {
        return this._orderCurrency.paramValue
    }

    setOrderCurrency(value) {
        this._orderCurrency.setValue(value)
        return this
    }

    get customerEmail() {
        return this._customerEmail.paramValue
    }

    setCustomerEmail(value) {
        this._customerEmail.setValue(value)
        return this
    }

    get customerFirstName() {
        return this._customerFirstName.paramValue
    }

    setCustomerFirstName(value) {
        this._customerFirstName.setValue(value)
        return this
    }

    get customerLastName() {
        return this._customerLastName.paramValue
    }

    setCustomerLastName(value) {
        this._customerLastName.setValue(value)
        return this
    }

    get customerAddress() {
        return this._customerAddress.paramValue
    }

    setCustomerAddress(value) {
        this._customerAddress.setValue(value)
        return this
    }

    get customerCountryCode() {
        return this._customerCountryCode.paramValue
    }

    setCustomerCountryCode(value) {
        this._customerCountryCode.setValue(value)
        return this
    }

    get customerCity() {
        return this._customerCity.paramValue
    }

    setCustomerCity(value) {
        this._customerCity.setValue(value)
        return this
    }

    get customerState() {
        return this._customerState.paramValue
    }

    setCustomerState(value) {
        this._customerState.setValue(value)
        return this
    }

    get customerZipCode() {
        return this._customerZipCode.paramValue
    }

    setCustomerZipCode(value) {
        this._customerZipCode.setValue(value)
        return this
    }

    get customerPhone() {
        return this._customerPhone.paramValue
    }

    setCustomerPhone(value) {
        this._customerPhone.setValue(value)
        return this
    }

    get customerIP() {
        return this._customerIP.paramValue
    }

    setCustomerIP(value) {
        this._customerIP.setValue(value)
        return this
    }

    get customerBankCode() {
        return this._customerBankCode.paramValue
    }

    setCustomerBankCode(value) {
        this._customerBankCode.setValue(value)
        return this
    }

    get redirectUrl() {
        return this._redirectUrl.paramValue
    }

    setRedirectUrl(value) {
        this._redirectUrl.setValue(value)
        return this
    }

    get callbackUrl() {
        return this._callbackUrl.paramValue
    }

    setCallbackUrl(value) {
        this._callbackUrl.setValue(value)
        return this
    }

    get checkoutUrl() {
        return this._checkoutUrl.paramValue
    }

    setCheckoutUrl(value) {
        this._checkoutUrl.setValue(value)
        return this
    }

    get customParam() {
        return this._customParam.paramValue
    }

    setCustomParam(value) {
        this._customParam.setValue(value)
        return this
    }

    get language() {
        return this._language.paramValue
    }

    setLanguage(value) {
        this._language.setValue(value)
        return this
    }

    _extraValidation() {
        if (["US", "CA", "AU"].includes(this.customerCountryCode) && (this.customerState === null || this.customerState === "")) {
            return [false, util.format("State is required whem country is %s", this.customerCountryCode)]
        }

        return [true, ""]
    }
}

module.exports = {
    MGDepositRequest: MGDepositRequest
}