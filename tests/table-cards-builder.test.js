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

const tableCardsBuilder = require("../response-builder/table-cards-builder");

describe("Table Cards Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildTableCardActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("buildBrowseCarouselCardActionsOnGoogle() function check", (done) => {
            let expectedInputs = [{
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
            }, {
                "title": "Table Card title",
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }]
            }];
            let expectedOutputs = [{
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
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "tableCard": {
                    "title": "Table Card title",
                    "subtitle": "",
                    "image": {},
                    "columnProperties": [{
                        "header": "Header 1",
                        "horizontalAlignment": "LEADING"
                    }],
                    "rows": [{
                        "cells": [{ "text": "Cell A1" }],
                        "dividedAfter": false
                    }],
                    "buttons": []
                }
            }];
            expectedInputs.forEach((expectedInput, i) => {
                let response = tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw an error if 'title' is not given in the input", (done) => {
            let expectedInput = {
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }]
            }
            let expectedErrorMsg = "Parameter 'title' is required";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if number of columns in the input is less than 1", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }]
            }
            let expectedErrorMsg = "Minimum 1 column is required";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if number of rows in the input is less than 1", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": []
            }
            let expectedErrorMsg = "Minimum 1 row is required";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'header' for a particular column is not given in the input", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [{}],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }]
            }
            let expectedErrorMsg = "Parameter 'header' for a particular column is required";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if number of cells in a row is not equal to the number of columns in the input", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }]
                }]
            }
            let expectedErrorMsg = "Number of cells in a row should be equal to the number of columns";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'title' of a particular button is not given in the input", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }],
                "buttons": [{}]
            }
            let expectedErrorMsg = "Please enter button 'title'";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'uri' of a particular button is not given in the input but 'title' is given", (done) => {
            let expectedInput = {
                "title": "Table Card title",
                "columnProperties": [{
                    "header": "Header 1"
                }],
                "rows": [{
                    "cells": [{ "text": "Cell A1" }]
                }],
                "buttons": [{
                    "title": "Button title"
                }]
            }
            let expectedErrorMsg = "Parameter 'uri' for button 'Button title' is required";
            try {
                tableCardsBuilder.buildTableCardActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});