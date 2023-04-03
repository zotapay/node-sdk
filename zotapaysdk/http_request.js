const axios = require("axios");
const https = require("https");

function mgRequest(method="POST", url = null, data = null, headers = null) {
    /*
    * Wrapper around the axios package used for sending requests throught this SDK.
    * @param {String} method The method for the request 'GET', 'POST', etc.
    * @param {String} url The URL to call
    * @param {String} data The JSON encoded payload
    * @param {String} headers The headers attached to the requests
    * */

    const config = {
        method: method,
        url: url,
        headers: headers,
        data: data,
        httpsAgent : new https.Agent({
            minVersion: "TLSv1.2"
        })
    }


    return axios(config)
}

module.exports = {
    mgRequest: mgRequest
}