const PayoutRequestParameters = require("./mg_request.js").PayoutRequestParameters
const MGRequestParam = require("./objects.js").MGRequestParam

class MGPayoutRequest extends PayoutRequestParameters {
    /*
    * Class containing all the parameters and logic for creating a
    * payout request through the Zota API SDK.
    * See https://doc.zota.com/payout/1.1/?javascript#payout-request for more info.
    *
    * */
    constructor({merchantOrderID = null, merchantOrderDesc = null, orderAmount = null,
                    orderCurrency = null, customerEmail = null, customerFirstName = null,
                    customerLastName = null, customerPhone = null, customerIP = null,
                    customerBankCode = null, customerBankAccountNumber = null, customerBankAccountName = null,
                    customerBankBranch = null, customerBankAddress = null, customerBankZipCode = null,
                    customerBankRoutingNumber = null, customerBankProvince = null, customerBankArea = null,
                    callbackUrl = null, customParam = null,customerCountryCode = null,
                    customerPersonalID = null, customerBankAccountNumberDigit = null, customerBankAccountType = null,
                    customerBankSwiftCode = null, customerBankBranchDigit = null}) {
        super();

        this._merchantOrderID = new MGRequestParam(
            PayoutRequestParameters.MERCHANT_ORDER_ID,
            merchantOrderID,
            128,
            true
        )

        this._merchantOrderDesc = new MGRequestParam(
            PayoutRequestParameters.MERCHANT_ORDER_DESC,
            merchantOrderDesc,
            128,
            true
        )

        this._orderAmount = new MGRequestParam(
            PayoutRequestParameters.ORDER_AMOUNT,
            orderAmount,
            24,
            true
        )

        this._orderCurrency = new MGRequestParam(
            PayoutRequestParameters.ORDER_CURRENCY,
            orderCurrency,
            3,
            true
        )

        this._customerEmail = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_EMAIL,
            customerEmail,
            50,
            true
        )

        this._customerFirstName = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_FIRST_NAME,
            customerFirstName,
            128,
            true
        )

        this._customerLastName = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_LAST_NAME,
            customerLastName,
            128,
            true
        )

        this._customerPhone = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_PHONE,
            customerPhone,
            15,
            true
        )

        this._customerIP = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_IP,
            customerIP,
            64,
            true
        )

        this._customerBankCode = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_CODE,
            customerBankCode,
            11,
            false
        )

        this._customerBankAccountNumber = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NUMBER,
            customerBankAccountNumber,
            64,
            true
        )
        this._customerBankAccountName = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NAME,
            customerBankAccountName,
            128,
            true
        )
        this._customerBankBranch = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_BRANCH,
            customerBankBranch,
            128,
            false
        )
        this._customerBankAddress = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ADDRESS,
            customerBankAddress,
            128,
            false
        )
        this._customerBankZipCode = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ZIP_CODE,
            customerBankZipCode,
            15,
            false
        )
        this._customerBankRoutingNumber = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ROUTING_NUMBER,
            customerBankRoutingNumber,
            64,
            false
        )
        this._customerBankProvince = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_PROVINCE,
            customerBankProvince,
            64,
            false
        )
        this._customerBankArea = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_AREA,
            customerBankArea,
            64,
            false
        )

        this._callbackUrl = new MGRequestParam(
            PayoutRequestParameters.CALLBACK_URL,
            callbackUrl,
            255,
            false
        )

        this._customParam = new MGRequestParam(
            PayoutRequestParameters.CUSTOM_PARAM,
            customParam,
            128,
            false
        )

        this._customerCountryCode = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_COUNTRY_CODE,
            customerCountryCode,
            2,
            true
        )

        this._customerPersonalID = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_PERSONAL_ID,
            customerPersonalID,
            20,
            false
        )

        this._customerBankAccountNumberDigit = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_NUMBER_DIGIT,
            customerBankAccountNumberDigit,
            2,
            false
        )

        this._customerBankAccountType = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_ACCOUNT_TYPE,
            customerBankAccountType,
            8,
            false
        )

        this._customerBankSwiftCode = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_SWIFT_CODE,
            customerBankSwiftCode,
            35,
            false
        )

        this._customerBankBranchDigit = new MGRequestParam(
            PayoutRequestParameters.CUSTOMER_BANK_BRANCH_DIGIT,
            customerBankBranchDigit,
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

    get customerBankAccountNumber() {
        return this._customerBankAccountNumber.paramValue
    }

    setCustomerBankAccountNumber(value) {
        this._customerBankAccountNumber.setValue(value)
        return this
    }
    get customerBankAccountName() {
        return this._customerBankAccountName.paramValue
    }

    setCustomerBankAccountName(value) {
        this._customerBankAccountName.setValue(value)
        return this
    }
    get customerBankBranch() {
        return this._customerBankBranch.paramValue
    }

    setCustomerBankBranch(value) {
        this._customerBankBranch.setValue(value)
        return this
    }
    get customerBankAddress() {
        return this._customerBankAddress.paramValue
    }

    setCustomerBankAddress(value) {
        this._customerBankAddress.setValue(value)
        return this
    }
    get customerBankZipCode() {
        return this._customerBankZipCode.paramValue
    }

    setCustomerBankZipCode(value) {
        this._customerBankZipCode.setValue(value)
        return this
    }

    get customerBankRoutingNumber() {
        return this._customerBankRoutingNumber.paramValue
    }

    setCustomerBankRoutingNumber(value) {
        this._customerBankRoutingNumber.setValue(value)
        return this
    }

    get customerBankProvince() {
        return this._customerBankProvince.paramValue
    }

    setCustomerBankProvince(value) {
        this._customerBankProvince.setValue(value)
        return this
    }

    get customerBankArea() {
        return this._customerBankArea.paramValue
    }

    setCustomerBankArea(value) {
        this._customerBankArea.setValue(value)
        return this
    }

    get callbackUrl() {
        return this._callbackUrl.paramValue
    }

    setCallbackUrl(value) {
        this._callbackUrl.setValue(value)
        return this
    }

    get customParam() {
        return this._customParam.paramValue
    }

    setCustomParam(value) {
        this._customParam.setValue(value)
        return this
    }

    get customerCountryCode() {
        return this._customerCountryCode.paramValue
    }

    setCustomerCountryCode(value) {
        this._customerCountryCode.setValue(value)
        return this
    }

    get customerPersonalID() {
        return this._customerPersonalID.paramValue
    }

    setCustomerPersonalID(value) {
        this._customerPersonalID.setValue(value)
        return this
    }

    get customerBankAccountNumberDigit() {
        return this._customerBankAccountNumberDigit.paramValue
    }

    setCustomerBankAccountNumberDigit(value) {
        this._customerBankAccountNumberDigit.setValue(value)
        return this
    }

    get customerBankAccountType() {
        return this._customerBankAccountType.paramValue
    }

    setCustomerBankAccountType(value) {
        this._customerBankAccountType.setValue(value)
        return this
    }

    get customerBankSwiftCode() {
        return this._customerBankSwiftCode.paramValue
    }

    setCustomerBankSwiftCode(value) {
        this._customerBankSwiftCode.setValue(value)
        return this
    }

    get customerBankBranchDigit() {
        return this._customerBankBranchDigit.paramValue
    }

    setCustomerBankBranchDigit(value) {
        this._customerBankBranchDigit.setValue(value)
        return this
    }

}

module.exports = {
    MGPayoutRequest: MGPayoutRequest
}