const assert = require("chai").assert
const MGRequestParam = require("../zotapaysdk/mg_requests/objects.js").MGRequestParam

describe("MGRequestParam tests", function () {


    it("MGRequestParam success test", function () {

        const obj = new MGRequestParam("test", "test", 10, true)
        const [ok, reason] = obj.validate()
        assert(ok, reason)
    });

    it("MGRequestParam length fail", function () {

        const obj = new MGRequestParam("test", "testtesttesttest", 10, true)
        const [ok, reason] = obj.validate()
        assert(!ok, reason)
    });

    it("MGRequestParam required field success", function () {

        const obj = new MGRequestParam("test", null, 10, false)
        const [ok, reason] = obj.validate()
        assert(ok, reason)
    });

    it("MGRequestParam required field fail", function () {

        const obj = new MGRequestParam("test", null, 10, true)
        const [ok, reason] = obj.validate()
        assert(!ok, reason)
    });

    it("MGRequestParam fields tests", function () {

        const obj = new MGRequestParam("testName", "testValue", 10, true)

        assert(obj.required === true, "required field should be true")
        assert(obj.paramName === "testName", "paramName field should be testName")
        assert(obj.paramValue === "testValue", "paramValue field should be testValue")
        assert(obj.maxSize === 10, "maxSize field should be 10")
    });

});