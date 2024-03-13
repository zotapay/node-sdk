function defaultValidationFunction(paramName, paramValue, maxSize, required) {
    /*
    * Performs the general validation as defined by Zota's API
    *
    * @param {String} paramName Name of the parameter
    * @param {String} paramValue Value of the parameter
    * @param {String} maxSize Maximum length of the parameter value
    * @param {Bool} required Whether the parameter is required
    * @returns {Bool} a boolean value showing if the parameter passed validation
    * */

    if (!paramName) {
        throw new Error("paramName cannot be null");
    }
    if (!paramValue && required ){
        return false
    }

    if (paramValue && paramValue.length > maxSize) {
        return false
    }

    return true
}

module.exports = {
    defaultValidationFunction: defaultValidationFunction
}