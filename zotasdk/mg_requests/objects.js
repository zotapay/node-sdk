const defaultValidationFunction = require("./validation.js").defaultValidationFunction
const util = require('util');

class MGRequestParam {
    /*
    *  Helper object. A representation of the API argument. Takes care of
    *  the logic for all the different criteria there is for the param.
    * */
    constructor(paramName, paramValue, maxSize, required, assertFunction = defaultValidationFunction) {
        this._paramName = paramName
        this._paramValue = paramValue
        this._maxSize = maxSize
        this._required = required
        this._assertFunction = assertFunction
    }

    get paramName() {
        /*
        * Getter for the param name.
        * */
        return this._paramName
    }
    get paramValue() {
        /*
        * Getter for the param value.
        * */
        return this._paramValue
    }
    get maxSize() {
        /*
        * Getter for the max size.
        * */
        return this._maxSize
    }
    get required() {
        /*
        * Getter for whether the param is required.
        * */
        return this._required
    }

    setValue(value) {
        /*
        * Setter for the paramValue.
        * */
        this._paramValue = value
    }

    validate() {
        /*
        * Validates the parameter
        * */
        const validationResult = this._assertFunction(this._paramName, this._paramValue, this._maxSize, this._required)

        let validationMessage = util.format("%s passed validation", this._paramName)
        if (!validationResult) {
            validationMessage = util.format("%s failed validation", this._paramName)
        }

        return [validationResult, validationMessage]
    }
}

module.exports = {
    MGRequestParam: MGRequestParam
}