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

/**
 * buildImageActionsOnGoogle builds response for images for Actions on Google
 * @param {Object} imageData 
 * @example
 *  {
 *      "imageUri": "http://imageUrl.com (required)",
 *      "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *  }
 */
const buildImageActionsOnGoogle = (imageData) => {
    if(imageData.imageUri && !imageData.imageAccessibilityText) {
        throw new Error("Parameter 'imageAccessibilityText' is required");
    }
    if(!imageData.imageUri) {
        return {};
    }
    return {
        "imageUri": imageData.imageUri,
        "accessibilityText": imageData.imageAccessibilityText
    }
}

/**
 * buildImageFacebookMessenger builds response for images for Facebook Messenger
 * @param {Object} imageData 
 * @example
 *  {
 *      "imageUri": "http://imageUrl.com (required)"
 *  }
 */
const buildImageFacebookMessenger = (imageData) => {
    if(!imageData.imageUri) {
        return {};
    }
    return {
        "platform": "FACEBOOK",
        "image": {
            "imageUri": imageData.imageUri
        }
    }
}

module.exports = { buildImageFacebookMessenger, buildImageActionsOnGoogle };
