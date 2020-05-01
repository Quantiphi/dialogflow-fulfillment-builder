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

const imagesBuilder = require("./images-builder");

/**
 * buildBrowseCarouselCardActionsOnGoogle builds browse carousel cards for Actions on Google
 * @param {Array} browseCarouselCardItems
 * @example
 *  [
 *      {
 *          "title": "Option one title (required)",
 *          "url": "https://optionOneUrl (required)",
 *          "urlTypeHint": "AMP_CONTENT (optional)",
 *          "description": "Option one description (optional)",
 *          "imageUri": "http://imageOneUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
 *          "footer": "Option one footer (optional)"
 *      },
 *      {
 *          "title": "Option two title (required)",
 *          "url": "https://optionTwoUrl (required)",
 *          "urlTypeHint": "AMP_CONTENT (optional)",
 *          "description": "Option two description (optional)",
 *          "imageUri": "http://imageTwoUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
 *          "footer": "Option two footer (optional)"
 *      }
 *  ] 
 */
const buildBrowseCarouselCardActionsOnGoogle = (browseCarouselCardItems) => {
    let items = [];
    if(browseCarouselCardItems.length < 2) {
        throw new Error("Browse Carousel Card can have minimum 2 and maximum 10 items");
    }
    browseCarouselCardItems.forEach((item) => {
        if(!item.title) {
            throw new Error("Parameter 'title' is required");
        }
        if(!item.url) {
            throw new Error("Browse Carousel Card item URL to the web content cannot be empty and protocol must be http or https");
        }
        items.push({
            "openUriAction": {
                "url": item.url,
                "urlTypeHint": item.urlTypeHint ? item.urlTypeHint : ""
            },
            "title": item.title,
            "description": item.description ? item.description : "",
            "image": imagesBuilder.buildImageActionsOnGoogle(item),
            "footer": item.footer ? item.footer : ""
        });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "browseCarouselCard": {
            "items": items
        }
    }
}

module.exports = { buildBrowseCarouselCardActionsOnGoogle };
