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

const mediaContentsBuilder = require("../response-builder/media-contents-builder");

describe("Media Contents Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildMediaContentActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "contentUrl": "https://urlToMediaFile.com",
                    "description": "Media Content card description",
                    "mediaContentType": "largeImage",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                }]
            }, {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "contentUrl": "https://urlToMediaFile.com",
                    "mediaContentType": "icon",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                }]
            }];
            let expectedOutputs = [{
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
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "mediaContent": {
                    "mediaType": "AUDIO",
                    "mediaObjects": [{
                        "name": "Media content card title",
                        "description": "",
                        "icon": {
                            "imageUri": "http://imageUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        },
                        "contentUrl": "https://urlToMediaFile.com"
                    }]
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = mediaContentsBuilder.buildMediaContentActionsOnGoogle(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw an error if 'name' for a particular mediaContent is not given in the input", (done) => {
            let expectedInput = {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "contentUrl": "https://urlToMediaFile.com",
                    "description": "Media Content card description",
                    "mediaContentType": "largeImage",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                }]
            }
            let expectedErrorMsg = "Parameter 'name' is required";
            try {
                mediaContentsBuilder.buildMediaContentActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'mediaContentType' for a particular mediaContent is not given in the input", (done) => {
            let expectedInput = {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "contentUrl": "https://urlToMediaFile.com",
                }]
            }
            let expectedErrorMsg = "Parameter 'mediaContentType' for 'Media content card title' is required";
            try {
                mediaContentsBuilder.buildMediaContentActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'contentUrl' for a particular mediaContent is not given in the input", (done) => {
            let expectedInput = {
                "mediaType": "AUDIO",
                "mediaObjects": [{
                    "name": "Media content card title",
                    "mediaContentType": "largeImage"
                }]
            }
            let expectedErrorMsg = "Media Content url for 'Media content card title' cannot be empty and protocol must be http or https";
            try {
                mediaContentsBuilder.buildMediaContentActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});