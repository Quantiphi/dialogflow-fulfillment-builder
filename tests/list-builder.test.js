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

const listBuilder = require("../response-builder/list-builder");

describe("List Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildListActionsOnGoogle() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "title": "List title",
                "items": [
                    {
                        "infoKey": "itemOne",
                        "title": "Option One Title",
                        "description": "Option One Description",
                        "synonyms": [
                            "thing one",
                            "object one"
                        ],
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers"
                    },
                    {
                        "infoKey": "itemTwo",
                        "title": "Option Two Title"
                    },
                    {
                        "infoKey": "itemThree",
                        "title": "Option Three Title",
                        "description": "Option Three Description",
                        "synonyms": [""],
                        "imageUri": "http://imageThreeUrl.com",
                        "imageAccessibilityText": "Image description for screen readers"
                    }
                ]
            }, {
                "items": [{
                    "infoKey": "itemOne",
                    "title": "Option One Title"
                }, {
                    "infoKey": "itemTwo",
                    "title": "Option Two Title"
                }]
            }];
            let expectedOutputs = [{
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
                    },
                    {
                        "info": {
                            "key": "itemTwo",
                            "synonyms": [],
                        },
                        "title": "Option Two Title",
                        "description": "",
                        "image": {}
                    },
                    {
                        "info": {
                            "key": "itemThree",
                            "synonyms": []
                        },
                        "title": "Option Three Title",
                        "description": "Option Three Description",
                        "image": {
                            "imageUri": "http://imageThreeUrl.com",
                            "accessibilityText": "Image description for screen readers"
                        }
                    }]
                }
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "listSelect": {
                    "title": "",
                    "items": [{
                        "info": {
                            "key": "itemOne",
                            "synonyms": [],
                        },
                        "title": "Option One Title",
                        "description": "",
                        "image": {}
                    }, {
                        "info": {
                            "key": "itemTwo",
                            "synonyms": [],
                        },
                        "title": "Option Two Title",
                        "description": "",
                        "image": {}
                    }],
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = listBuilder.buildListActionsOnGoogle(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw an error if list has less than 2 items", (done) => {
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
                }]
            };
            let expectedErrorMsg = "List Card can have minimum 2 and maximum 30 items";
            try {
                listBuilder.buildListActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'title' for a particular item is not given in the input", (done) => {
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
                },
                {
                    "infoKey": "itemTwo",
                    "imageUri": "http://imageTwoUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }]
            }
            let expectedErrorMsg = "Parameter 'title' is required";
            try {
                listBuilder.buildListActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'infoKey' for a particular item is not given in the input but 'title' is given", (done) => {
            let expectedInput = {
                "title": "List Title",
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
                },
                {
                    "title": "Option Two Title",
                    "imageUri": "http://imageTwoUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }]
            }
            let expectedErrorMsg = "Parameter 'infoKey' for item 'Option Two Title' is required and should be unique";
            try {
                listBuilder.buildListActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});