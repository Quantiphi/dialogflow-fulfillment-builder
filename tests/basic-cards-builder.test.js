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

const cardsBuilder = require("../response-builder/basic-cards-builder");

describe("Basic Cards Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildBasicCardActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link title",
                    "uri": "https://linkUrl.com"
                }]
            }, {
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": []
            }, {
                "formattedText": "Card Description",
                "title": "",
                "subtitle": "",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link title",
                    "uri": "https://linkUrl.com"
                }]
            }];
            let expectedOutputs = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "basicCard": {
                    "title": "Card Title",
                    "subtitle": "Card Subtitle",
                    "formattedText": "Card Description",
                    "image": {
                        "imageUri": "http://imageUrl.com",
                        "accessibilityText": "Image description for screen readers"
                    },
                    "buttons": [{
                        "title": "Card Link title",
                        "openUriAction": {
                            "uri": "https://linkUrl.com"
                        }
                    }]
                }
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "basicCard": {
                    "title": "Card Title",
                    "subtitle": "Card Subtitle",
                    "formattedText": "Card Description",
                    "image": {
                        "imageUri": "http://imageUrl.com",
                        "accessibilityText": "Image description for screen readers"
                    },
                    "buttons": []
                }
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "basicCard": {
                    "title": "",
                    "subtitle": "",
                    "formattedText": "Card Description",
                    "image": {
                        "imageUri": "http://imageUrl.com",
                        "accessibilityText": "Image description for screen readers"
                    },
                    "buttons": [{
                        "title": "Card Link title",
                        "openUriAction": {
                            "uri": "https://linkUrl.com"
                        }
                    }]
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = cardsBuilder.buildBasicCardActionsOnGoogle(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw error if 'formattedText' is not given in the input", (done) => {
            let expectedInput = {
                "formattedText": "",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link Title",
                    "uri": "https://linkUrl.com"
                }]
            }
            let expectedErrorMsg = "Parameter 'formattedText' is required";
            try {
                cardsBuilder.buildBasicCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw error if 'title' for any button is not given in the input", (done) => {
            let expectedInput = {
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": ""
                }]
            }
            let expectedErrorMsg = "Please enter button 'title'";
            try {
                cardsBuilder.buildBasicCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw error if 'uri' for any button is not given in the input but 'title' is given", (done) => {
            let expectedInput = {
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link Title",
                    "uri": ""
                }]
            }
            let expectedErrorMsg = "Parameter 'uri' for button 'Card Link Title' is required";
            try {
                cardsBuilder.buildBasicCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildBasicCardFacebookMessenger() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "buttons": [{
                    "title": "Card Link title",
                    "postback": "Text or URL"
                }]
            }, {
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "buttons": []
            }, {
                "title": "Card Title",
                "subtitle": "",
                "imageUri": "",
                "buttons": [{
                    "title": "Card Link title",
                    "postback": ""
                }]
            }];
            let expectedOutputs = [{
                "platform": "FACEBOOK",
                "card": {
                    "title": "Card Title",
                    "subtitle": "Card Subtitle",
                    "imageUri": "http://imageUrl.com",
                    "buttons": [{
                        "text": "Card Link title",
                        "postback": "Text or URL"
                    }]
                }
            }, {
                "platform": "FACEBOOK",
                "card": {
                    "title": "Card Title",
                    "subtitle": "Card Subtitle",
                    "imageUri": "http://imageUrl.com",
                    "buttons": []
                }
            }, {
                "platform": "FACEBOOK",
                "card": {
                    "title": "Card Title",
                    "subtitle": "",
                    "imageUri": "",
                    "buttons": [{
                        "text": "Card Link title",
                        "postback": ""
                    }]
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = cardsBuilder.buildBasicCardFacebookMessenger(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw an error if card 'title' is not given", (done) => {
            let expectedInput = {
                "title": "",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "buttons": [{
                    "title": "Card Link title",
                    "postback": "Text or URL"
                }]
            }
            let expectedErrorMsg = "Parameter 'title' is required";
            try {
                cardsBuilder.buildBasicCardFacebookMessenger(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if button array has some values but is not given in the expected button object format", (done) => {
            let expectedInput = {
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "buttons": ["Button 1"]
            }
            let expectedErrorMsg = "Parameter 'title' for the button is required";
            try {
                cardsBuilder.buildBasicCardFacebookMessenger(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});