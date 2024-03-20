const CardDepositRequestParameters = require("./mg_request").CardDepositRequestParameters
const MGDepositRequest = require("./deposit_request").MGDepositRequest
const MGRequestParam = require("./objects.js").MGRequestParam

class MGCardDepositRequest extends MGDepositRequest {
    /*
    * Class defining all that is necessary for sending a Credit Card Deposit Request.
    * See Also https://doc.zota.com/deposit/1.0/#card-payment-integration-2
    *
    * @param {Object} Object Object that defines all the needed params for the request
    * */
    constructor({merchantOrderID = null, merchantOrderDesc = null, orderAmount = null,
                    orderCurrency = null, customerEmail = null, customerFirstName = null,
                    customerLastName = null, customerAddress = null, customerCountryCode = null,
                    customerCity = null, customerState = null, customerZipCode = null,
                    customerPhone = null, customerIP = null, customerBankCode = null,
                    redirectUrl = null, callbackUrl = null, checkoutUrl = null,
                    customParam = null, language = null, cardNumber = null,
                    cardHolderName = null, cardExpirationMonth = null, cardExpirationYear = null,
                    cardCvv = null}) {
        super({
            merchantOrderID : merchantOrderID, merchantOrderDesc : merchantOrderDesc, orderAmount : orderAmount,
            orderCurrency : orderCurrency, customerEmail : customerEmail, customerFirstName : customerFirstName,
            customerLastName : customerLastName, customerAddress : customerAddress, customerCountryCode : customerCountryCode,
            customerCity : customerCity, customerState : customerState, customerZipCode : customerZipCode,
            customerPhone : customerPhone, customerIP : customerIP, customerBankCode : customerBankCode,
            redirectUrl : redirectUrl, callbackUrl : callbackUrl, checkoutUrl : checkoutUrl,
            customParam : customParam, language : language});

        this._cardNumber = new MGRequestParam(
            CardDepositRequestParameters.CARD_NUMBER,
            cardNumber,
            16,
            true
        )
        this._cardHolderName = new MGRequestParam(
            CardDepositRequestParameters.CARD_HOLDER_NAME,
            cardHolderName,
            64,
            true
        )
        this._cardExpirationMonth = new MGRequestParam(
            CardDepositRequestParameters.CARD_EXPIRATION_MONTH,
            cardExpirationMonth,
            2,
            true
        )
        this._cardExpirationYear = new MGRequestParam(
            CardDepositRequestParameters.CARD_EXPIRATION_YEAR,
            cardExpirationYear,
            4,
            true
        )
        this._cardCvv = new MGRequestParam(
            CardDepositRequestParameters.CARD_CVV,
            cardCvv,
            4,
            true
        )
    }

    get cardNumber() {
        return this._cardNumber.paramValue
    }

    setCardNumber(value) {
        this._cardNumber.setValue(value)
        return this
    }

    get cardHolderName() {
        return this._cardHolderName.paramValue
    }

    setCardHolderName(value) {
        this._cardHolderName.setValue(value)
        return this
    }
    get cardExpirationMonth() {
        return this._cardExpirationMonth.paramValue
    }

    setCardExpirationMonth(value) {
        this._cardExpirationMonth.setValue(value)
        return this
    }
    get cardExpirationYear() {
        return this._cardExpirationYear.paramValue
    }

    setCardExpirationYear(value) {
        this._cardExpirationYear.setValue(value)
        return this
    }
    get cardCvv() {
        return this._cardCvv.paramValue
    }

    setCardCvv(value) {
        this._cardCvv.setValue(value)
        return this
    }
}

module.exports = {
    MGCardDepositRequest: MGCardDepositRequest
}