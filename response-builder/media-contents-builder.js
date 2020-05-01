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
 * buildMediaContentActionsOnGoogle builds response for media contents for Actions on Google
 * @param {Object} mediaContentData 
 * @example
 *  {
 *      "mediaType": "AUDIO (required, automatically set)",
 *      "mediaObjects": 
 *      [{
 *          "name": "Media content card title (required)",
 *          "contentUrl": "https://urlToMediaFile.com (required)",
 *          "description": "Media Content card description (optional)",
 *          "mediaContentType": "'largeImage' or 'icon' (required)",
 *          "imageUri": "http://imageUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
 *      }]
 *  }
 */
const buildMediaContentActionsOnGoogle = (mediaContentData) => {
    let mediaObjects = [];
    mediaContentData.mediaObjects.forEach((mediaObject) => {
        if(!mediaObject.name) {
            throw new Error("Parameter 'name' is required");
        }
        if(!mediaObject.mediaContentType) {
            throw new Error(`Parameter 'mediaContentType' for '${mediaObject.name}' is required`);
        }
        if(!mediaObject.contentUrl) {
            throw new Error(`Media Content url for '${mediaObject.name}' cannot be empty and protocol must be http or https`);
        }
        mediaObjects.push({
            "name": mediaObject.name,
            "description": mediaObject.description ? mediaObject.description : "",
            [mediaObject.mediaContentType]: imagesBuilder.buildImageActionsOnGoogle(mediaObject),
            "contentUrl": mediaObject.contentUrl
        });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "mediaContent": {
            "mediaType": mediaContentData.mediaType,
            "mediaObjects": mediaObjects
        }
    }
}

module.exports = { buildMediaContentActionsOnGoogle };
