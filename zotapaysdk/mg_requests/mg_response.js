class MGResponse {
    /*
    * Class used as a base class for all response objects
    * */
    constructor(rawData) {
        this._rawData = rawData
    }

    get rawData() {
        return this._rawData
    }
}

module.exports = {
    MGResponse:MGResponse
}