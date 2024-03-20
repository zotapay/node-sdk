[![NPM version](https://img.shields.io/badge/zotasdk-v1.2.1-blue)](https://www.npmjs.com/package/zotasdk)
[![codecov](https://codecov.io/gh/zota/node-sdk/branch/main/graph/badge.svg?token=NdEjuAL8eN)](https://codecov.io/gh/zota/node-sdk)
![](https://img.shields.io/badge/NodeJS-18%2B-blue)
![unnamed](https://user-images.githubusercontent.com/92689934/184654665-59808ddc-ed33-4347-b274-0e0c94368ce9.png)

# Official NodeJS REST API SDK
This is the **official** page of the [Zota](http://www.zota.com) NodeJS SDK. It is intended to be used by
developers who run modern NodeJS applications and would like to integrate our next-generation payments platform.

## REST API Docs

> **[Official Deposit Documentation](https://doc.zota.com/deposit/1.0/#introduction)**

> **[Official Payout Documentation](https://doc.zota.com/payout/1.0/#introduction)**

## Introduction
This NodeJS SDK provides all the necessary methods for integrating the Zota Merchant API.

The SDK covers all available functionality that Zota's Merchant API exposes.

### Requirements
* A functioning Zota Sandbox or Production account and related credentials
* NodeJS 18 (or higher)

### Installation
```sh
npm install zotasdk
```
## Configuration

[API CONFIGURATION DOCS](https://doc.zota.com/deposit/1.0/?javascript#before-you-begin)

Credentials for the SDK can be passed in 3 different ways:
1. To the `MGClient` itself
2. Through environment variables
3. Through a configuration file

This part of the documentation will guide you on how to configure and use this SDK.

### Before you begin

To use this API, obtain the following credentials from Zota:

```node
MerchantID	        - A merchant unique identifier, used for identification.
MerchantSecretKey	- A secret key to keep privately and securely, used for authentication.
EndpointID	        - One or more unique endpoint identifiers to use in API requests.
```
Contact [Zota](https://zota.com/contact/) to start your onboarding process and obtain all the credentials.

### API Url
There are two environments to use with the Zota API:

> Sandbox environment, used for integration and testing purposes.
`https://api.zotapay-sandbox.com`

> Live environment.
`https://api.zotapay.com`


### Configuration in the code

The implementation fo the Zota API SDK depends on creating an instance of the `MGClient`. First priority
configuration is the one passed to the client itself.

Example:
```node
import {MGClient} from "zotasdk";

const parameters = {merchantID=<MerchantID as received from Zota>, 
    merchantSecretKey=<MerchantSecretKey as received from Zota>, 
    endpointID=<EndpointID as received from Zota>, 
    requestUrl=<MGClient.LIVE_API_URL or MGClient.SANDBOX_API_URL or "https://api.zota-sandbox.com"...}
    
const client = new MGClient()
```
### Environment variables configuration

There are 4 environment variables that need to be set for the API SDK to be configured correctly:

```node
ZOTA_MERCHANT_ID             - MerchantID as received from Zota
ZOTA_MERCHANT_SECRET_KEY     - MerchantSecretKey as received from Zota
ZOTA_ENDPOINT_ID             - EndpointID as received from Zota
ZOTA_REQUEST_URL             - https://api.zotapay-sandbox.com or https://api.zotapay.com
```

### Configuration file
Configuration parameters can be passed through a `mg_config.js` file placed in the user's home directory.

Example of a '~/mg_config.js' :
```node
exports.config = {
    merchantID : <MerchantID as received from Zota>,
    merchantSecretKey : <MerchantSecretKey as received from Zota>,
    endpointID : <EndpointID as received from Zota>,
    requestUrl : <"https://api.zotapay-sandbox.com" or https://api.zotapay.com>,
}
```

## Usage
In order to use the SDK we need to instantiate a client:
```node
import {MGClient} from "zotasdk";

const mgClient = new MGClient()
```

### Deposit

A deposit request can be generated in two different ways:

```node
import {MGDepositRequest} from "zotasdk";

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

const exampleDepositRequest = new MGDepositRequest(depositParameters)
```

or alternatively


```node 
import {MGDepositRequest} from "zotasdk";

const exampleDepositRequest = new MGDepositRequest()
    .setMerchantOrderID("QvE8dZshpKhaOmHY")
    .setMerchantOrderDesc("Test order")
    .setOrderAmount("500")
    .setOrderCurrency("USD")
    .setCustomerEmail("test@test.com")
    .setCustomerFirstName("John")
    .setCustomerLastName("Doe")
    .setCustomerAddress("5/5 Moo 5 Thong Nai Pan Noi Beach, Baan Tai, Koh Phangan")
    .setCustomerCountryCode("TH")
    .setCustomerCity("Surat Thani")
    .setCustomerZipCode("84280")
    .setCustomerPhone("+66-66006600")
    .setCustomerIP("103.106.8.104")
    .setRedirectUrl("https://www.example-merchant.com/payment-return/")
    .setCallbackUrl("https://www.example-merchant.com/payment-callback/")
    .setCustomParam("{\"UserId\": \"e139b447\"}")
    .setCheckoutUrl("https://www.example-merchant.com/account/deposit/?uid=e139b447")
```

Sending the request to Zota happens through the client:

```node
mgClient.sendDepositRequest(exampleDepositRequest)
    .then((response) => {
        console.log(response)
        if (response.isOk) {
            // manipulate the response
            console.log(response.depositUrl)
        } else {
            console.log(response.error)
            console.log("Error")
        }})
```

In order to send a `Credit Card Deposit` we need to append the appropriate [Credit Card Params](https://doc.zota.com/deposit/1.0/?javascript#card-payment-integration-2)
which is achieved through sending an `MGCardDepositRequest`

```node
const exampleCCDepositRequest = new MGCardDepositRequest({
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
    customParam : '{"UserId": "e139b447"}',
    
    // CC Params
    card_number:"3453789023457890",
    card_holder_name:"John Doe",
    card_expiration_month:"08",
    card_expiration_year:"2027",
    card_cvv:"123"})

    mgClient.sendDepositRequest(exampleDepositRequest)
        .then((response) => {
            console.log(response)
            if (response.isOk) {
                // manipulate the response
                console.log(response.depositUrl)
            } else {
                console.log(response.error)
                console.log("Error")
            }})
```

### Working with `Deposit Response`
Each deposit attempt against a Zota returns either an `MGDepositResponse` or `MGCardDepositResponse`.

The above objects are simply a wrapper around the standard HTTP response as described [here](https://doc.zota.com/deposit/1.0/?javascript#issue-a-deposit-request).

The response classes contain an additional helper method that validates the signature of the response when provided with a `merchantSecretKey`

## Payout
Sending a payout request is almost identical to sending a deposit request.

The request is built:

```node
import {MGPayoutRequest} from "zotasdk";

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
    customParam:'{\"UserId\": \"e139b447\"}',
    checkoutUrl:"https://www.example-merchant.com/account/withdrawal/?uid=e139b447",

    customerCountryCode : "testCode",
    customerPersonalID : "testId",
    customerBankAccountNumberDigit : "6",
    customerBankAccountType : "testType",
    customerBankSwiftCode : "2525",
    customerBankBranchDigit : "25"
}

const examplePayoutRequest = new MGPayoutRequest(payoutParameters)

mgClient.sendPayoutRequest(examplePayoutRequest)
    .then((response) => {
        console.log(response)
        if (response.isOk) {
            // manipulate the response
            console.log(response.orderID)
        } else {
            console.log(response.error)
            console.log("Error")
        }})

```

The client returns `MGPayoutResponse` which is again a wrapper around the standard HTTP response.

## Status Check
Merchants should issue an Order Status Request to get the most up-to-date status of the customer’s order transactions.

```node
import {MGOrderStatusRequest} from "zotasdk";

const statusCheckPayload = {
    merchantOrderID: "testMerchantOrderID", 
    orderID: "testOrderID"
}

const exampleStatusCheckRequest = new MGOrderStatusRequest(statusCheckPayload)

mgClient.sendOrderStatusRequest(exampleStatusCheckRequest)
    .then((response) => {
        console.log(response)
        if (response.isOk) {
            // manipulate the response
            console.log(response.status)
        } else {
            console.log(response.errorMessage)
            console.log("Error")
        }})

```
## Callbacks
`MGCallback` is a class that parses the raw HTTP Request sent from Zota to the configured endpoint. It's purpose
is to make working with callbacks manageable.


## Validations
The `MGRequest` class implements a `validate()` method which can be used for parameter validation of the request
offline before the request is sent. It's purpose is to check whether all the values passed to the different
parameters are in line with what Zota's endpoint expects. See the API DOCS for more info and guidance about the
format of the different parameters.

## Test Coverage
[![codecov](https://codecov.io/gh/zota/node-sdk/branch/main/graphs/tree.svg?width=650&height=150&src=pr&token=NdEjuAL8eN)](https://codecov.io/gh/zota/node-sdk/)
