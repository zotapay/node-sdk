const util = require('util');

const config = require("./config.js")
const ZOTAPAY_REST_API_VERSION = config.ZOTAPAY_REST_API_VERSION

const BASE_URL = `/api/${ZOTAPAY_REST_API_VERSION}`
const MG_DEPOSIT_RAW_URL = BASE_URL + "/deposit/request/%s/"
const MG_ORDER_STATUS_RAW_URL = BASE_URL + "/query/order-status/"
const MG_PAYOUT_RAW_URL = BASE_URL + "/payout/request/%s/"

class MGUrlsFormatter {
    /*
    * Class containing the logic for building the different url patters for the different requests.
    * */

    static getDepositUrl(endpointId) {
        /*
        * Generates the actual URL for deposit against the ZotaPay API.
        *
        * @param {String} endpointId Id given by ZotaPay
        * */
        return util.format(MG_DEPOSIT_RAW_URL, endpointId)
    }

    static getOrderStatusUrl() {
        /*
        * Generates the actual URL for status check against the ZotaPay API.
        * */
        return util.format(MG_ORDER_STATUS_RAW_URL)
    }

    static getPayoutUrl(endpointId) {
        /*
        * Generates the actual URL for payout against the ZotaPay API.
        *
        * @param {String} endpointId Id given by ZotaPay
        * */
        return util.format(MG_PAYOUT_RAW_URL, endpointId)
    }
}

module.exports = {
    MGUrlsFormatter: MGUrlsFormatter
}