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

const itemsHelper = require("../helpers/items-helper");

/**
 * buildListActionsOnGoogle builds lists for Actions on Google
 * @param {Object} listData 
 * @example
 * {
 *      "title": "List title (optional)",
 *      "items": 
 *      [
 *          {
 *              "title": "Item One (required)",
 *              "infoKey": "itemOne (required)",
 *              "description": "Item One Description (optional)",
 *              "synonyms": ["thing one", "object one"],
 *              "imageUri": "http://imageOneUrl.com (optional)",
 *              "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *          },
 *          {
 *              "title": "Item Two (required)",
 *              "infoKey": "itemTwo (required)",
 *              "description": "Item Two Description (optional)",
 *              "synonyms": ["thing two", "object two"],
 *              "imageUri": "http://imageTwoUrl.com (optional)",
 *              "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *          }
 *      ]
 * }
 */
const buildListActionsOnGoogle = (listData) => {
    let items = [];
    if(listData.items.length < 2) {
        throw new Error("List Card can have minimum 2 and maximum 30 items");
    }
    items = itemsHelper.buildItems(listData.items);
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "listSelect": {
            "title": listData.title ? listData.title : "",
            "items": items
        }
    }
}

module.exports = { buildListActionsOnGoogle };
