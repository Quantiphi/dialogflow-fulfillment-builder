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

const appConstants = require("./constants");
const simpleResponseBuilder = require("./simple-respones-builder");
const suggestionChipsBuilder = require("./suggestion-chips-builder");
const cardsBuilder = require("./basic-cards-builder");
const carouselCardsBuilder = require("./carousel-cards-builder");
const browseCarouselCardsBuilder = require("./browse-carousel-cards-builder");
const listBuilder = require("./list-builder");
const linkOutSuggestionsBuilder = require("./link-out-suggestions-builder");
const mediaContentsBuilder = require("./media-contents-builder");
const tableCardsBuilder = require("./table-cards-builder");
const imagesBuilder = require("./images-builder");
const telephonyResponseBuilder = require("./telephony-response-builder");

const buildSimpleResponses = (platformsEnabled, textToSpeech, displayText) => {
    let response = [];
    let simpleReponses;
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            simpleReponses = simpleResponseBuilder.buildSimpleResponseActionsOnGoogle(textToSpeech, displayText);
            response.push(simpleReponses);
        }
    });
    return response;
}

/**
 * buildSuggestions builds response for suggestion chips for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} suggestions
 * @returns {Array}
 */
const buildSuggestions = (platformsEnabled, suggestions) => {
    let response = [];
    let chipsResponse;
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            chipsResponse = suggestionChipsBuilder.buildSuggestionActionsOnGoogle(suggestions);
            response.push(chipsResponse);
        }
        if (platform === 'FACEBOOK_MESSENGER') {
            chipsResponse = suggestionChipsBuilder.buildSuggestionFacebookMessenger(suggestions);
            response.push(chipsResponse)
        }
    });
    return response;
}

/**
 * buildCards builds response for cards for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} cardData
 * @returns {Array}
 */
const buildBasicCards = (platformsEnabled, cardData) => {
    let response = [];
    let basicCardsResponse;
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            basicCardsResponse = cardsBuilder.buildBasicCardActionsOnGoogle(cardData);
            response.push(basicCardsResponse);
        }
        if (platform === 'FACEBOOK_MESSENGER') {
            basicCardsResponse = cardsBuilder.buildBasicCardFacebookMessenger(cardData);
            response.push(basicCardsResponse);
        }
    });
    return response;
}

/**
 * buildCarouselCards builds response for carousel cards for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Array} carouselCardItems 
 * @returns {Array}
 */
const buildCarouselCards = (platformsEnabled, carouselCardItems) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let carouselCardsResponse = carouselCardsBuilder.buildCarouselCardActionsOnGoogle(carouselCardItems);
            response.push(carouselCardsResponse);
        }
    });
    return response;
}

/**
 * buildBrowseCarouselCards builds response for browse carousel cards for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Array} browseCarouselCardItems 
 * @returns {Array}
 */
const buildBrowseCarouselCards = (platformsEnabled, browseCarouselCardItems) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let browseCarouselCardsResponse = browseCarouselCardsBuilder.buildBrowseCarouselCardActionsOnGoogle(browseCarouselCardItems);
            response.push(browseCarouselCardsResponse);
        }
    });
    return response;
}

/**
 * buildLists builds response for lists for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} listData 
 * @returns {Array}
 */
const buildLists = (platformsEnabled, listData) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let listsResponse = listBuilder.buildListActionsOnGoogle(listData);
            response.push(listsResponse);
        }
    });
    return response;
}

/**
 * buildLinkOutSuggestions builds response for link out suggestions for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} linkOutSuggestionData 
 * @returns {Array}
 */
const buildLinkOutSuggestions = (platformsEnabled, linkOutSuggestionData) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let linkOutSuggestionsResponse = linkOutSuggestionsBuilder.buildLinkOutSuggestionActionsOnGoogle(linkOutSuggestionData);
            response.push(linkOutSuggestionsResponse);
        }
    });
    return response;
}

/**
 * buildMediaContents builds response for media contents for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} mediaContentData 
 * @returns {Array}
 */
const buildMediaContents = (platformsEnabled, mediaContentData) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let mediaContentsResponse = mediaContentsBuilder.buildMediaContentActionsOnGoogle(mediaContentData);
            response.push(mediaContentsResponse);
        }
    });
    return response;
}

/**
 * buildTableCards builds response for table cards for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} tableCardData 
 * @returns {Array}
 */
const buildTableCards = (platformsEnabled, tableCardData) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'ACTIONS_ON_GOOGLE') {
            let tableCardsResponse = tableCardsBuilder.buildTableCardActionsOnGoogle(tableCardData);
            response.push(tableCardsResponse);
        }
    });
    return response;
}

/**
 * buildImages builds response for images for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {Object} imageData 
 * @returns {Array}
 */
const buildImages = (platformsEnabled, imageData) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'FACEBOOK_MESSENGER') {
            let imagesResponse = imagesBuilder.buildImageFacebookMessenger(imageData);
            response.push(imagesResponse);
        }
    });
    return response;
}

/**
 * buildPlayAudio builds response for play audio for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {String} audioUri 
 */
const buildPlayAudio = (platformsEnabled, audioUri) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'TELEPHONY') {
            let playAudioResponse = telephonyResponseBuilder.buildPlayAudioTelephony(audioUri);
            response.push(playAudioResponse);
        }
    });
    return response;
}

/**
 * buildSynthesizeSpeech builds response for synthesize speech for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {String} text 
 */
const buildSynthesizeSpeech = (platformsEnabled, text) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'TELEPHONY') {
            let synthesizeSpeechResponse = telephonyResponseBuilder.buildSynthesizeSpeechTelephony(text);
            response.push(synthesizeSpeechResponse);
        }
    });
    return response;
}

/**
 * buildTransferCall builds response for transfer calls for all enabled platforms
 * @param {Array} platformsEnabled 
 * @param {String} phoneNumber 
 */
const buildTransferCall = (platformsEnabled, phoneNumber) => {
    let response = [];
    platformsEnabled.forEach(platform => {
        if (appConstants.platformSupport.indexOf(platform) < 0) {
            throw new Error(`platform - ${platform} not supported`);
        }
        if (platform === 'TELEPHONY') {
            let transferCallResponse = telephonyResponseBuilder.buildTransferCallTelephony(phoneNumber);
            response.push(transferCallResponse);
        }
    });
    return response;
}

module.exports = { buildSimpleResponses, buildSuggestions, buildBasicCards, buildCarouselCards, buildBrowseCarouselCards, buildLists, buildLinkOutSuggestions, buildMediaContents, buildTableCards, buildImages, buildPlayAudio, buildSynthesizeSpeech, buildTransferCall };
