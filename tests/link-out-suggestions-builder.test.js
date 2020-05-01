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

const linkOutSuggestionsBuilder = require("../response-builder/link-out-suggestions-builder");

describe("Link Out Suggestions Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildLinkOutSuggestionActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = {
                "destinationName": "Destination Name",
                "uri": "http://Url.com"
            }
            let expectedOutput = {
                "platform": "ACTIONS_ON_GOOGLE",
                "linkOutSuggestion": {
                    "destinationName": "Destination Name",
                    "uri": "http://Url.com"
                }
            }
            let response = linkOutSuggestionsBuilder.buildLinkOutSuggestionActionsOnGoogle(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if 'destinationName' is not given in the input", (done) => {
            let expectedInput = {
                "uri": "http://Url.com"
            }
            let expectedErrorMsg = "Parameter 'destinationName' is required";
            try {
                linkOutSuggestionsBuilder.buildLinkOutSuggestionActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'uri' is not given in the input but 'destinationName' is given", (done) => {
            let expectedInput = {
                "destinationName": "Destination Name"
            }
            let expectedErrorMsg = "Link Out Suggestion Chip url cannot be empty and protocol must be http or https";
            try {
                linkOutSuggestionsBuilder.buildLinkOutSuggestionActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});