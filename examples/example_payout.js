const {MGClient} = require("../zotasdk/client");
const {MGPayoutRequest} = require("../zotasdk/mg_requests/payout_request")

const client = new MGClient()

const payoutParameters = {
    merchantOrderID:"TbbQzewLWwDW6222sadaaasdasdasdasd23",
    merchantOrderDesc:"Test order",
    orderAmount:"500.00",
    orderCurrency:"THB",
    customerEmail:"customer@email-address.com",
    customerFirstName:"John",
    customerLastName:"Doe",
    customerPhone:"+66-77999110",
    customerIP:"103.106.8.104",
    callbackUrl:"https://www.example-merchant.com/payout-callback/",
    customerBankCode:"BBL",
    customerBankAccountNumber:"100200",
    customerBankAccountName:"asdasf",
    customerBankBranch:"Bank Branch",
    customerBankAddress:"Thong Nai Pan Noi Beach, Baan Tai, Koh Phangan",
    customerBankZipCode:"84280",
    customerBankProvince:"Bank Province",
    customerBankArea:"Bank Area / City",
    customerBankRoutingNumber:"000",
    customParam:"{\"UserId\": \"e139b447\"}",
    checkoutUrl:"https://www.example-merchant.com/account/withdrawal/?uid=e139b447",

    customerCountryCode : "testCode",
    customerPersonalID : "testId",
    customerBankAccountNumberDigit : "6",
    customerBankAccountType : "testType",
    customerBankSwiftCode : "2525",
    customerBankBranchDigit : "25"
}

const examplePayoutRequest = new MGPayoutRequest(payoutParameters)

client.sendPayoutRequest(examplePayoutRequest)
    .then((response) => {
        console.log(response)
        if (response.isOk) {
            // manipulate the response
            console.log(response.depositUrl)
        } else {
            console.log(response.error)
            console.log("Error")
        }})