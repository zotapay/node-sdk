import {MGClient} from "../zotapaysdk/client";
import {MGDepositRequest} from "../zotapaysdk/mg_requests/deposit_request"

const client = new MGClient()

const depositParameters = {
    merchantOrderID : "QvE8dZshpKhaOmHY",
    merchantOrderDesc : "Test order",
    orderAmount : "500.00",
    orderCurrency : "THB",
    customerEmail : "customer@email-address.com",
    customerFirstName : "John",
    customerLastName : "Doe",
    customerAddress : "5/5 Moo 5 Thong Nai Pan Noi Beach",
    customerCountryCode : "TH",
    customerCity : "Surat Thani",
    customerZipCode : "84280",
    customerPhone : "+66-77999110",
    customerIP : "103.106.8.104",
    redirectUrl : "https://www.example-merchant.com/payment-return/",
    callbackUrl : "https://www.example-merchant.com/payment-callback/",
    checkoutUrl : "https://www.example-merchant.com/account/deposit/?uid=e139b447",
    customParam : '{"UserId": "e139b447"}'}

const exampleCCDepositRequest = new MGCardDepositRequest({
    merchantOrderID : "testcardeposit",
    merchantOrderDesc : "Test order",
    orderAmount : "500.00",
    orderCurrency : "THB",
    customerEmail : "customer@email-address.com",
    customerFirstName : "John",
    customerLastName : "Doe",
    customerAddress : "5/5 Moo 5 Thong Nai Pan Noi Beach",
    customerCountryCode : "TH",
    customerCity : "Surat Thani",
    customerZipCode : "84280",
    customerPhone : "+66-77999110",
    customerIp : "103.106.8.104",
    redirectUrl : "https://www.example-merchant.com/payment-return/",
    callbackUrl : "https://www.example-merchant.com/payment-callback/",
    checkoutUrl : "https://www.example-merchant.com/account/deposit/?uid=e139b447",
    customParam : '{"UserId": "e139b447"}',

    // CC Params
    cardNumber:"3453789023457890",
    cardHolderName:"John Doe",
    cardExpirationMonth:"08",
    cardExpirationYear:"2027",
    cardCvv:"123"})

const exampleDepositRequest = new MGDepositRequest(depositParameters)

client.sendDepositRequest(exampleDepositRequest)
    .then((response) => {
        console.log(response)
        if (response.isOk) {
            // manipulate the response
            console.log(response.depositUrl)
        } else {
            console.log(response.error)
            console.log("Error")
        }})