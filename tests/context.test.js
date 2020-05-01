/**
 * Copyright 2020 Quantiphi, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const chai = require('chai')
const should = require('chai').should() // eslint-disable-line
const expect = require('chai').expect

const contextHelper = require("../helpers/context");

describe("context file", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("getContext() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return outputContext object of the given context name if it exists", (done) => {
            let expectedQueryResult = {
                "outputContexts": [
                    {
                        "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                        "lifespanCount": 2,
                        "parameters": {
                            "username": "pratyush",
                            "username.original": "pratyush"
                        }
                    },
                    {
                        "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus-yes-followup",
                        "lifespanCount": 1,
                        "parameters": {
                            "username": "pratyush",
                            "username.original": "pratyush"
                        }
                    }
                ]
            };
            const session = "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254"
            let expectedInputName = "event_prospectus_yes_name-followup";
            let expectedOutputContext = {
                "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                "lifespanCount": 2,
                "parameters": {
                    "username": "pratyush",
                    "username.original": "pratyush"
                }
            }
            let outputContext = contextHelper.getContext(expectedQueryResult, expectedInputName, session);
            expectedOutputContext.should.deep.equal(outputContext);
            done();
        });
        it("should return null if the given intent doesn't exist in the request object", (done) => {
            let expectedRequest = {
                "queryResult": {
                    "outputContexts": [
                        {
                            "name": "Welcome Intent"
                        }
                    ]
                }
            };
            let expectedOutputContext = null;
            let outputContext = contextHelper.getContext(expectedRequest, "Default Welcome Intent");
            expect(expectedOutputContext).to.eql(outputContext);
            done();
        });
    });
    describe("clearContext() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return outputContext object of the given intent name with its context cleared", (done) => {
            let expectedRequest = {
                "queryResult": {
                    "outputContexts": [
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                            "lifespanCount": 2,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        },
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus-yes-followup",
                            "lifespanCount": 1,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        }
                    ]
                }
            };
            const expectedResponse = {};
            const session = "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254"
            let expectedInputName = "event_prospectus_yes_name-followup";
            let expectedOutputContext = {
                "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                "lifespanCount": 0,
                "parameters": {}
            }
            let outputContext = contextHelper.clearContext(expectedRequest, expectedResponse, expectedInputName, session);
            expectedOutputContext.should.deep.equal(outputContext);
            done();
        });
        it("should return null if the given intent doesn't exist in the request object", (done) => {
            let expectedRequest = {
                "queryResult": {
                    "outputContexts": [
                        {
                            "name": "Welcome Intent"
                        }
                    ]
                }
            };
            let expectedOutputContext = null;
            let outputContext = contextHelper.clearContext(expectedRequest, "Default Welcome Intent");
            expect(expectedOutputContext).to.eql(outputContext);
            done();
        });
    });
    describe("getAllOutputContexts() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return an array of output contexts", (done) => {
            let expectedRequest = {
                "queryResult": {
                    "outputContexts": [{
                        "name": "Output Context 1",
                        "lifespanCount": 1,
                        "parameters": {
                            "username": "yash",
                            "username.original": "yash"
                        }
                    }, {
                        "name": "Output Context 2",
                        "lifespanCount": 2,
                        "parameters": {
                            "phoneNo": "1234567890",
                            "phoneNo.original": "1234567890"
                        }
                    }]
                }
            };
            let expectedResponse = [{
                "name": "Output Context 1",
                "lifespanCount": 1,
                "parameters": {
                    "username": "yash",
                    "username.original": "yash"
                }
            }, {
                "name": "Output Context 2",
                "lifespanCount": 2,
                "parameters": {
                    "phoneNo": "1234567890",
                    "phoneNo.original": "1234567890"
                }
            }];
            let response = contextHelper.getAllOutputContexts(expectedRequest);
            expectedResponse.should.deep.equal(response);
            done();
        });
    });
});
