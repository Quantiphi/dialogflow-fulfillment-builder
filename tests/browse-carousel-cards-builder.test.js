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

const browseCarouselCardsBuilder = require("../response-builder/browse-carousel-cards-builder");

describe("Browse Carousel Cards Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildBrowseCarouselCardActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = [
                {
                    "title": "Option one title",
                    "url": "https://optionOneUrl",
                    "urlTypeHint": "AMP_CONTENT",
                    "description": "Option one description",
                    "imageUri": "http://imageOneUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                    "footer": "Option one footer"
                },
                {
                    "title": "Option two title",
                    "url": "https://optionTwoUrl"
                }
            ];
            let expectedOutput = {
                "platform": "ACTIONS_ON_GOOGLE",
                "browseCarouselCard": {
                    "items": [{
                        "openUriAction": {
                            "url": "https://optionOneUrl",
                            "urlTypeHint": "AMP_CONTENT"
                        },
                        "title": "Option one title",
                        "description": "Option one description",
                        "image": {
                            "imageUri": "http://imageOneUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        },
                        "footer": "Option one footer"
                    }, {
                        "openUriAction": {
                            "url": "https://optionTwoUrl",
                            "urlTypeHint": ""
                        },
                        "title": "Option two title",
                        "description": "",
                        "image": {},
                        "footer": ""
                    }]
                }
            }
            let response = browseCarouselCardsBuilder.buildBrowseCarouselCardActionsOnGoogle(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if browse carousel card has less than 2 items", (done) => {
            let expectedInput = [{
                "title": "Option one title",
                "url": "https://optionOneUrl"
            }];
            let expectedErrorMsg = "Browse Carousel Card can have minimum 2 and maximum 10 items";
            try {
                browseCarouselCardsBuilder.buildBrowseCarouselCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'title' for a particular item is not given in the input", (done) => {
            let expectedInput = [{
                "url": "https://optionOneUrl"
            }, {
                "title": "Option two Title",
                "url": "https://optionTwoUrl"
            }];
            let expectedErrorMsg = "Parameter 'title' is required";
            try {
                browseCarouselCardsBuilder.buildBrowseCarouselCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'url' for a particular item is not given in the input but 'title' is given", (done) => {
            let expectedInput = [{
                "title": "Option one Title"
            }, {
                "title": "Option two Title",
                "url": "https://optionTwoUrl"
            }];
            let expectedErrorMsg = "Browse Carousel Card item URL to the web content cannot be empty and protocol must be http or https";
            try {
                browseCarouselCardsBuilder.buildBrowseCarouselCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});