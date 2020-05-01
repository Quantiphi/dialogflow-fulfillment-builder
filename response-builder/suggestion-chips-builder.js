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
 * buildSuggestionActionsOnGoogle builds response for suggestions for Actions on Google
 * @param {Object} suggestions 
 * @example
 *  {
 *      "suggestions": ["Suggestion 1", "Suggestion 2"]
 *  }
 */
const buildSuggestionActionsOnGoogle = (suggestions) => {
    let responseSuggestions = [];
    if(!suggestions.suggestions || suggestions.suggestions.length < 1) {
        throw new Error("Please enter atleast one suggestion");
    }
    suggestions.suggestions.forEach((suggestion) => {
        responseSuggestions.push({ "title": suggestion });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "suggestions": {
            "suggestions": responseSuggestions
        }
    }
}

/**
 * buildSuggestionFacebookMessenger builds response for quickReplies for Facebook Messenger
 * @param {Object} suggestions 
 * @example
 *  {
 *      "title": "Suggestions Title (optional)",
 *      "suggestions": ["Suggestion 1", "Suggestion 2"]
 *  }
 */
const buildSuggestionFacebookMessenger = (suggestions) => {
    let responseQuickReplies = [];
    if(suggestions.suggestions.length < 1) {
        throw new Error("Please enter atleast one suggestion");
    }
    suggestions.suggestions.forEach(suggestion => {
        responseQuickReplies.push(suggestion);
    });
    return {
        "platform": "FACEBOOK",
        "quickReplies": {
            "title": suggestions.title ? suggestions.title : "",
            "quickReplies": responseQuickReplies
        }
    }
}

module.exports = { buildSuggestionActionsOnGoogle, buildSuggestionFacebookMessenger };
