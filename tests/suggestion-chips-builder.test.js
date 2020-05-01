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

const suggestionChipsBuilder = require("../response-builder/suggestion-chips-builder");

describe("Suggestion Chips Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildSuggestionsActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = {
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            }
    
            let expectedOutput = {
                "platform": "ACTIONS_ON_GOOGLE",
                "suggestions": {
                    "suggestions": [
                        { "title": "Suggestion 1" },
                        { "title":"Suggestion 2" }
                    ]
                }
            }
            let response = suggestionChipsBuilder.buildSuggestionActionsOnGoogle(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw error for malformed input", (done) => {
            let expectedInput = {
                "suggestions": []
            }
            let expectedErrorMsg = "Please enter atleast one suggestion";
            try {
                suggestionChipsBuilder.buildSuggestionActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildSuggestionFacebookMessenger() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "title": "Suggestions Title",
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            }, {
                "title": "",
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            }];
            let expectedOutputs = [{
                "platform": "FACEBOOK",
                "quickReplies": {
                    "title": "Suggestions Title",
                    "quickReplies": ["Suggestion 1", "Suggestion 2"]
                }
            }, {
                "platform": "FACEBOOK",
                "quickReplies": {
                    "title": "",
                    "quickReplies": ["Suggestion 1", "Suggestion 2"]
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = suggestionChipsBuilder.buildSuggestionFacebookMessenger(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw error for malformed input", (done) => {
            let expectedInput = {
                "title": "Suggestions Title",
                "suggestions": []
            }
            let expectedErrorMsg = "Please enter atleast one suggestion";
            try {
                suggestionChipsBuilder.buildSuggestionFacebookMessenger(expectedInput);
                done("should throw an error but did not");
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});