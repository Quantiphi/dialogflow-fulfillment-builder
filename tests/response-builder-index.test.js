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

const responseBuilder = require("../response-builder");

describe("Response Builder index file", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildSimpleResponses() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedTextToSpeech = "Hello, Quantiphi welcomes you";
            let expectedDisplayText = "Hello, Quantiphi welcomes you";
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [
                        {
                            "textToSpeech": "Hello, Quantiphi welcomes you",
                            "displayText": "Hello, Quantiphi welcomes you"
                        }
                    ]
                }
            }];
            let response = responseBuilder.buildSimpleResponses(expectedPlatformsEnabled, expectedTextToSpeech, expectedDisplayText);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "HANGOUTS"];
            let expectedTextToSpeech = "Hello, Quantiphi welcomes you";
            let expectedDisplayText = "Hello, Quantiphi welcomes you";
            let expectedErrorMsg = "platform - HANGOUTS not supported";
            try {
                responseBuilder.buildSimpleResponses(expectedPlatformsEnabled, expectedTextToSpeech, expectedDisplayText);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildSuggestions() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"];
            let expectedInput = {
                "title": "Suggestions Title",
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            };
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "suggestions": {
                    "suggestions": [
                        { "title": "Suggestion 1" },
                        { "title": "Suggestion 2" }
                    ]
                }
            }, {
                "platform": "FACEBOOK",
                "quickReplies": {
                    "title": "Suggestions Title",
                    "quickReplies": ["Suggestion 1", "Suggestion 2"]
                }
            }];
            let response = responseBuilder.buildSuggestions(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "title": "Suggestions Title",
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildSuggestions(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildBasicCards() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"];
            let expectedInput = {
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link title",
                    "uri": "https://linkUrl.com",
                    "postback": "Text or URL"
                }]
            };
            let expectedOutput = [{
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
            }];
            let response = responseBuilder.buildBasicCards(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "formattedText": "Card Description",
                "title": "Card Title",
                "subtitle": "Card Subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "buttons": [{
                    "title": "Card Link title",
                    "uri": "https://linkUrl.com",
                    "postback": "Text or URL"
                }]
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildBasicCards(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildCarouselCards() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = [{
                "infoKey": "itemOne",
                "title": "Option One Title",
                "description": "Option One Description",
                "synonyms": ["thing one", "object one"],
                "imageUri": "http://imageOneUrl.com",
                "imageAccessibilityText": "Image description for screen readers"
            }, {
                "infoKey": "itemTwo",
                "title": "Option Two Title",
                "imageUri": "http://imageTwoUrl.com",
                "imageAccessibilityText": "Image description for screen readers"
            }];
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "carouselSelect": {
                    "items": [{
                        "info": {
                            "key": "itemOne",
                            "synonyms": ["thing one", "object one"]
                        },
                        "title": "Option One Title",
                        "description": "Option One Description",
                        "image": {
                            "imageUri": "http://imageOneUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        }
                    }, {
                        "info": {
                            "key": "itemTwo",
                            "synonyms": [],
                        },
                        "title": "Option Two Title",
                        "description": "",
                        "image": {
                            "imageUri": "http://imageTwoUrl.com",
                            "accessibilityText": "Image description for screen readers",
                        }
                    }]
                }
            }];
            let response = responseBuilder.buildCarouselCards(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = [{
                "infoKey": "itemOne",
                "title": "Option One Title",
                "description": "Option One Description",
                "synonyms": ["thing one", "object one"],
                "imageUri": "http://imageOneUrl.com",
                "imageAccessibilityText": "Image description for screen readers"
            }, {
                "infoKey": "itemTwo",
                "title": "Option Two Title",
                "imageUri": "http://imageTwoUrl.com",
                "imageAccessibilityText": "Image description for screen readers"
            }];
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildCarouselCards(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildBrowseCarouselCards() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = [{
                "title": "Option one title",
                "url": "https://optionOneUrl",
                "urlTypeHint": "AMP_CONTENT",
                "description": "Option one description",
                "imageUri": "http://imageOneUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "footer": "Option one footer"
            }, {
                "title": "Option two title",
                "url": "https://optionTwoUrl"
            }];
            let expectedOutput = [{
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
            }];
            let response = responseBuilder.buildBrowseCarouselCards(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = [{
                "title": "Option one title",
                "url": "https://optionOneUrl",
                "urlTypeHint": "AMP_CONTENT",
                "description": "Option one description",
                "imageUri": "http://imageOneUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "footer": "Option one footer"
            }, {
                "title": "Option two title",
                "url": "https://optionTwoUrl"
            }];
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildBrowseCarouselCards(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildLists() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = {
                "title": "List title",
                "items": [{
                    "infoKey": "itemOne",
                    "title": "Option One Title",
                    "description": "Option One Description",
                    "synonyms": [
                        "thing one",
                        "object one"
                    ],
                    "imageUri": "http://imageOneUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }, {
                    "infoKey": "itemTwo",
                    "title": "Option Two Title"
                }]
            };
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "listSelect": {
                    "title": "List title",
                    "items": [{
                        "info": {
                            "key": "itemOne",
                            "synonyms": [
                                "thing one",
                                "object one"
                            ]
                        },
                        "title": "Option One Title",
                        "description": "Option One Description",
                        "image": {
                            "imageUri": "http://imageOneUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        }
                    }, {
                        "info": {
                            "key": "itemTwo",
                            "synonyms": [],
                        },
                        "title": "Option Two Title",
                        "description": "",
                        "image": {}
                    }]
                }
            }];
            let response = responseBuilder.buildLists(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "title": "List title",
                "items": [{
                    "infoKey": "itemOne",
                    "title": "Option One Title",
                    "description": "Option One Description",
                    "synonyms": [
                        "thing one",
                        "object one"
                    ],
                    "imageUri": "http://imageOneUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }, {
                    "infoKey": "itemTwo",
                    "title": "Option Two Title"
                }]
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildLists(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildLinkOutSuggestions() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = {
                "destinationName": "Destination Name",
                "uri": "http://Url.com"
            };
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "linkOutSuggestion": {
                    "destinationName": "Destination Name",
                    "uri": "http://Url.com"
                }
            }];
            let response = responseBuilder.buildLinkOutSuggestions(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "destinationName": "Destination Name",
                "uri": "http://Url.com"
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildLinkOutSuggestions(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildMediaContents() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "contentUrl": "https://urlToMediaFile.com",
                    "description": "Media Content card description",
                    "mediaContentType": "largeImage",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                }]
            };
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "mediaContent": {
                    "mediaType": "AUDIO",
                    "mediaObjects": [{
                        "name": "Media content card title",
                        "description": "Media Content card description",
                        "largeImage": {
                            "imageUri": "http://imageUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        },
                        "contentUrl": "https://urlToMediaFile.com"
                    }]
                }
            }];
            let response = responseBuilder.buildMediaContents(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "contentUrl": "https://urlToMediaFile.com",
                    "description": "Media Content card description",
                    "mediaContentType": "largeImage",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                }]
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildMediaContents(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildTableCards() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = {
                "title": "Table Card title",
                "subtitle": "Table Card subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "columnProperties": [{
                    "header": "Header 1",
                    "horizontalAlignment": "CENTER"
                }, {
                    "header": "Header 2"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                    "dividedAfter": true
                }, {
                    "cells": [{}, { "text": "Cell B2" }]
                }],
                "buttons": [{
                    "title": "Button title",
                    "uri": "https://linkUrl.com"
                }]
            };
            let expectedOutput = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "tableCard": {
                    "title": "Table Card title",
                    "subtitle": "Table Card subtitle",
                    "image": {
                        "imageUri": "http://imageUrl.com",
                        "accessibilityText": "Image description for screen readers"
                    },
                    "columnProperties": [{
                        "header": "Header 1",
                        "horizontalAlignment": "CENTER"
                    }, {
                        "header": "Header 2",
                        "horizontalAlignment": "LEADING"
                    }],
                    "rows": [{
                        "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                        "dividedAfter": true
                    }, {
                        "cells": [{ "text": "" }, { "text": "Cell B2" }],
                        "dividedAfter": false
                    }],
                    "buttons": [{
                        "title": "Button title",
                        "openUriAction": {
                            "uri": "https://linkUrl.com"
                        }
                    }]
                }
            }];
            let response = responseBuilder.buildTableCards(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "title": "Table Card title",
                "subtitle": "Table Card subtitle",
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers",
                "columnProperties": [{
                    "header": "Header 1",
                    "horizontalAlignment": "CENTER"
                }, {
                    "header": "Header 2"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                    "dividedAfter": true
                }, {
                    "cells": [{}, { "text": "Cell B2" }]
                }],
                "buttons": [{
                    "title": "Button title",
                    "uri": "https://linkUrl.com"
                }]
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildTableCards(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildImages() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER"];
            let expectedInput = {
                "imageUri": "http://imageUrl.com"
            };
            let expectedOutput = [{
                "platform": "FACEBOOK",
                "image": {
                    "imageUri": "http://imageUrl.com"
                }
            }];
            let response = responseBuilder.buildImages(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "HANGOUTS"];
            let expectedInput = {
                "imageUri": "http://imageUrl.com"
            };
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildImages(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildPlayAudio() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"];
            let expectedInput = "gs://<bucket>/<object>";
            let expectedOutput = [{
                "platform": "TELEPHONY",
                "telephonyPlayAudio": {
                    "audioUri": "gs://<bucket>/<object>"
                }
            }];
            let response = responseBuilder.buildPlayAudio(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY", "HANGOUTS"];
            let expectedInput = "gs://<bucket>/<object>";
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildPlayAudio(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildSynthesizeSpeech() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"];
            let expectedInput = "Hi, Welcome to Quantiphi";
            let expectedOutput = [{
                "platform": "TELEPHONY",
                "telephonySynthesizeSpeech": {
                    "ssml": "Hi, Welcome to Quantiphi"
                }
            }];
            let response = responseBuilder.buildSynthesizeSpeech(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY", "HANGOUTS"];
            let expectedInput = "Hi, Welcome to Quantiphi";
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildSynthesizeSpeech(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildTransferCall() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"];
            let expectedInput = "7738071969";
            let expectedOutput = [{
                "platform": "TELEPHONY",
                "telephonyTransferCall": {
                    "phoneNumber": "+17738071969"
                }
            }];
            let response = responseBuilder.buildTransferCall(expectedPlatformsEnabled, expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if user gives a platform which is not supported", (done) => {
            let expectedPlatformsEnabled = ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY", "HANGOUTS"];
            let expectedInput = "7738071969";
            let expectedErrorMsg = "platform - HANGOUTS not supported"
            try {
                responseBuilder.buildTransferCall(expectedPlatformsEnabled, expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});