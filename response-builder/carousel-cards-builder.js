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
 * buildCarouselCardActionsOnGoogle builds carousel cards for Actions on Google
 * @param {Array} carouselCardItems 
 * @example
 *  [
 *      {
 *          "infoKey": "itemOne (required)",
 *          "title": "Option One Title (required)",
 *          "description": "Option One Description (optional)",
 *          "synonyms": [
 *              "thing one",
 *              "object one"
 *          ],
 *          "imageUri": "http://imageOneUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *      },
 *      {
 *          "infoKey": "itemTwo (required)",
 *          "title": "Option Two Title (required)",
 *          "description": "Option Two Description (optional)",
 *          "synonyms": [
 *              "thing two",
 *              "object two"
 *          ],
 *          "imageUri": "http://imageTwoUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *      }
 *  ]
 */
const buildCarouselCardActionsOnGoogle = (carouselCardItems) => {
    let items = [];
    if(carouselCardItems.length < 2) {
        throw new Error("Carousel Card can have minimum 2 and maximum 10 items");
    }
    items = itemsHelper.buildItems(carouselCardItems);
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "carouselSelect": {
            "items": items
        }
    }
}

module.exports = { buildCarouselCardActionsOnGoogle };
