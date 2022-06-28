const MGRequestParam = require("./objects.js").MGRequestParam

class ValidateParameters {

    /*
    * Used as a base class for requests against the ZotaPay API
    * */
    _extraValidations() {
        /*
        * Override this method to add any additional validations that
        * require access to multiple properties.
        * */

        return true, ""
    }

    validate() {
        /*
        * Goes over all the instance properties and calls the _validate() method
        * on the MGRequestParams instances.
        *
        * @return {[Bool, String]} <Passed Validation Boolean, Validation Errors List>*/
        let failedValidations = []

        for (const varName of Object.keys(this)) {

            let attribute = Object.getOwnPropertyDescriptor(this, varName).value

            if (!(attribute instanceof MGRequestParam)) {
                continue
            }

            if (attribute.required) {
                let [result, resultMsg] = attribute.validate()

                if (!result) {
                    failedValidations.push(resultMsg)
                }
            }
        }

        let [extraValidation, extraValidationFailReason] = this._extraValidation()

        if (!extraValidation) {
            failedValidations.push(extraValidationFailReason)
        }

        return failedValidations.length ? [false, failedValidations]  : [true, failedValidations]
    }

    toSignedPayload(signature) {
        /*
        * Convert parameters to key value pairs
        * */
        let payload = {}

        for (let [_,value] of Object.entries(this)) {

            if (value instanceof MGRequestParam) {
                payload[value.paramName] = value.paramValue
            }
        }
        payload[CommonRequestParameters.SIGNATURE] = signature
        return payload
    }
}

class CommonRequestParameters extends ValidateParameters{
    /*
    * Define all common request fields.
    * */
    static MERCHANT_ORDER_ID = "merchantOrderID"
    static MERCHANT_ORDER_DESC = "merchantOrderDesc"
    static ORDER_AMOUNT = "orderAmount"
    static ORDER_CURRENCY = "orderCurrency"
    static CUSTOMER_EMAIL = "customerEmail"
    static CUSTOMER_FIRST_NAME = "customerFirstName"
    static CUSTOMER_LAST_NAME = "customerLastName"
    static CUSTOM_PARAM = "customParam"
    static SIGNATURE = "signature"
    static CALLBACK_URL = "callbackUrl"
    static CUSTOMER_COUNTRY_CODE = "customerCountryCode"

}

class DepositRequestParameters extends CommonRequestParameters {
    /*
    * Defines all specific fields for the general Deposit Request
    * */
    static CUSTOMER_ADDRESS = "customerAddress"
    static CUSTOMER_CITY = "customerCity"
    static CUSTOMER_STATE = "customerState"
    static CUSTOMER_ZIP_CODE = "customerZipCode"
    static CUSTOMER_PHONE = "customerPhone"
    static CUSTOMER_IP = "customerIP"
    static CUSTOMER_BANK_CODE = "customerBankCode"
    static REDIRECT_URL = "redirectUrl"
    static CHECKOUT_URL = "checkoutUrl"
    static LANGUAGE = "language"

}

class PayoutRequestParameters extends CommonRequestParameters {
    /*
    * Defines all specific fields required for a Payout Request
    * */
    static  CUSTOMER_PHONE = "customerPhone"
    static  CUSTOMER_IP = "customerIP"
    static  CUSTOMER_BANK_CODE = "customerBankCode"
    static  CUSTOMER_BANK_ACCOUNT_NUMBER = "customerBankAccountNumber"
    static  CUSTOMER_BANK_ACCOUNT_NAME = "customerBankAccountName"
    static  CUSTOMER_BANK_BRANCH = "customerBankBranch"
    static  CUSTOMER_BANK_ADDRESS = "customerBankAddress"
    static  CUSTOMER_BANK_ZIP_CODE = "customerBankZipCode"
    static  CUSTOMER_BANK_ROUTING_NUMBER = "customerBankRoutingNumber"
    static  CUSTOMER_BANK_PROVINCE = "customerBankProvince"
    static  CUSTOMER_BANK_AREA = "customerBankArea"
    static  CUSTOMER_PERSONAL_ID = "customerPersonalID"
    static  CUSTOMER_BANK_ACCOUNT_NUMBER_DIGIT = "customerBankAccountNumberDigit"
    static  CUSTOMER_BANK_ACCOUNT_TYPE = "customerBankAccountType"
    static  CUSTOMER_BANK_SWIFT_CODE = "customerBankSwiftCode"
    static  CUSTOMER_BANK_BRANCH_DIGIT = "customerBankBranchDigit"
    static  REDIRECT_URL ="redirectUrl"
}

class CardDepositRequestParameters {
    /*
    * Defines all additional fields required for a Credit Card Deposit Request
    * */
    static CARD_NUMBER = "cardNumber"
    static CARD_HOLDER_NAME = "cardHolderName"
    static CARD_EXPIRATION_MONTH = "cardExpirationMonth"
    static CARD_EXPIRATION_YEAR = "cardExpirationYear"
    static CARD_CVV = "cardCvv"

}

class OrderStatusRequestParameters extends ValidateParameters{
    /*
    * Defines all fields for the Order Status Request
    * */
    static MERCHANT_ID = "merchantID"
    static MERCHANT_ORDER_ID = "merchantOrderID"
    static ORDER_ID = "orderID"
    static TIMESTAMP = "timestamp"
    static SIGNATURE = "signature"
}

module.exports = {
    DepositRequestParameters: DepositRequestParameters,
    PayoutRequestParameters: PayoutRequestParameters,
    CardDepositRequestParameters: CardDepositRequestParameters,
    OrderStatusRequestParameters: OrderStatusRequestParameters
}