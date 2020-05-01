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

"use strict";

const imagesBuilder = require("../response-builder/images-builder");

/**
 * buildItems validates individual items and builds items array accordingly
 * @param {Array} items an array of carousel-card or list objects
 */
const buildItems = (items) => {
    let builtItems = [];
    items.forEach((item) => {
        let synonyms = [];
        if(!item.title) {
            throw new Error("Parameter 'title' is required");
        }
        if(!item.infoKey) {
            throw new Error(`Parameter 'infoKey' for item '${item.title}' is required and should be unique`);
        }
        if(item.synonyms && item.synonyms.length > 0) {
            item.synonyms.forEach((synonym) => {
                if(synonym.length) {
                    synonyms.push(synonym);
                }
            });
        }
        builtItems.push({
            "info": {
                "key": item.infoKey,
                "synonyms": synonyms
            },
            "title": item.title,
            "description": item.description ? item.description : "",
            "image": imagesBuilder.buildImageActionsOnGoogle(item)
        });
    });
    return builtItems;
};

module.exports = { buildItems };
