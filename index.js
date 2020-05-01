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

const responseBuilder = require("./response-builder");
const appConstants = require("./response-builder/constants");
const contextHelper = require("./helpers/context");

class DialogflowFulfillment {
    /**
     * The object of this DialogflowFulfillment class can be used to call all the functions of this class
     * @param {Object} config config object which has the platformsEnabled array
     * @example 
     * {
     *     "platformsEnabled": [ "TEXT", "ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY" ]
     * } 
     * @param {Object} request Dialogflow Fulfillment request object
     * @example
     * {
     *      "responseId": "{RESPONSE_ID}",
     *      "queryResult": {
     *          "queryText": "Hello",
     *          "action": "input.welcome",
     *          "parameters": {},
     *          "allRequiredParamsPresent": true,
     *          "fulfillmentText": "Welcome",
     *          "fulfillmentMessages": [{ "text": { "text": [ "Welcome" ] } }],
     *          "outputContexts": [],
     *          "intent": {
     *              "name": "projects/{PROJECT_ID}/agent/intents/{INTENT_ID}",
     *              "displayName": "Default Welcome Intent"
     *          },
     *          "intentDetectionConfidence": 1,
     *          "languageCode": "en",
     *          "sentimentAnalysisResult": {
     *              "queryTextSentiment": {
     *                  "score": 0.1,
     *                  "magnitude": 0.1
     *              },
     *          },
     *      },
     *      "originalDetectIntentRequest": {
     *          "payload": {}
     *      },
     *      "session": "projects/{PROJECT_ID}/agent/sessions/{SESSION_ID}"
     * }
     */
    constructor(config, request) {
        if (config.platformsEnabled && config.platformsEnabled.length > 0) {
            config.platformsEnabled.forEach(platform => {
                if (appConstants.platformSupport.indexOf(platform) < 0) {
                    throw new Error(`platform - ${platform} not supported`);
                }
            });
            this._config = config;
            this._request = request;
            this._response = {
                fulfillmentText: "",
                fulfillmentMessages: [],
                outputContexts: []
            };
        } else {
            throw new Error("Malformed parameters");
        }
    }

    /**
     * setResponseText sets text response
     * @param {String} responseText the text to be set in the response (required)
     * @example
     * "Hello, welcome."
     */
    setResponseText(responseText) {
        if (this._config.platformsEnabled.indexOf("TEXT") >= 0) {
            this._response.fulfillmentMessages.push({ "text": { "text": [responseText] } });
            this._response.fulfillmentText = responseText;
        } else {
            throw new Error("platform - TEXT is not enabled");
        }
    }

    /**
     * setSimpleResponses sets simpleResponses for ACTIONS_ON_GOOGLE platform
     * @param {String} textToSpeech The text to be used for speech (required)
     * @example
     * "Hello, welcome."
     * @param {String} displayText The text to be used for display optional (if not given, it will be same as textToSpeech)
     * @example
     * "Hello, welcome."
     */
    setSimpleResponses(textToSpeech, displayText) {
        let simpleReponses = responseBuilder.buildSimpleResponses(this._config.platformsEnabled, textToSpeech, displayText);
        simpleReponses.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setSuggestions sets suggestion chips for ACTIONS_ON_GOOGLE & FACEBOOK_MESSENGER platforms
     * @param {Object} suggestions The suggestions object containing the suggestions array (required)
     * @example
     *  {
     *      "title": "Suggestions Title (optional and only for FACEBOOK_MESSENGER)",
     *      "suggestions": ["Suggestion 1", "Suggestion 2"]
     *  }
     */
    setSuggestions(suggestions) {
        let suggestionResponse = responseBuilder.buildSuggestions(this._config.platformsEnabled, suggestions);
        suggestionResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setBasicCards sets basic cards for ACTIONS_ON_GOOGLE & FACEBOOK_MESSENGER platforms
     * @param {Object} cardData The object containing required data for cards
     * @example
     *  {
     *      "formattedText": "Card Description (required only for ACTIONS_ON_GOOGLE)",
     *      "title": "Card Title (optional for ACTIONS_ON_GOOGLE, required for FACEBOOK_MESSENGER)",
     *      "subtitle": "Card Subtitle (optional)",
     *      "imageUri": "http://imageUrl.com (optional and protocol must be http/https)",
     *      "imageAccessibilityText": "Image description for screen readers (required only if imageUri given and only for ACTIONS_ON_GOOGLE)",
     *      "buttons": [{
     *          "title": "Card Link title (optional for both)",
     *          "uri": "https://linkUrl.com (required only if title given and protocol must be http/https and only for ACTIONS_ON_GOOGLE)",
     *          "postback": "Text or URL (optional and only for FACEBOOK_MESSENGER)"
     *      }]
     *  }
     */
    setBasicCards(cardData) {
        let basicCardsResponse = responseBuilder.buildBasicCards(this._config.platformsEnabled, cardData);
        basicCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setCarouselCards sets carousel cards for ACTIONS_ON_GOOGLE platform
     * @param {Array} carouselCardItems The array of carousel card objects (at least 2 items in the Array)
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
    setCarouselCards(carouselCardItems) {
        let carouselCardResponse = responseBuilder.buildCarouselCards(this._config.platformsEnabled, carouselCardItems);
        carouselCardResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setBrowseCarouselCards sets browse carousel cards for ACTIONS_ON_GOOGLE platform
     * setSimpleResponses function should be called before this function
     * @param {Array} browseCarouselCardItems The array of browse carousel card objects (at least 2 items in the Array)
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
    setBrowseCarouselCards(browseCarouselCardItems) {
        let isSimpleResponsePresent = false;
        for (let i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses")) {
                isSimpleResponsePresent = true;
                break;
            }
        }
        if (!isSimpleResponsePresent) {
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        }
        let browseCarouselCardsResponse = responseBuilder.buildBrowseCarouselCards(this._config.platformsEnabled, browseCarouselCardItems);
        browseCarouselCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setLists sets lists for ACTIONS_ON_GOOGLE platform
     * @param {Object} listData The object containing required parameters for lists (required)
     * @example
     *  {
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
    setLists(listData) {
        let listsResponse = responseBuilder.buildLists(this._config.platformsEnabled, listData);
        listsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setLinkOutSuggestions sets link out suggestions for ACTIONS_ON_GOOGLE platform
     * @param {Object} linkOutSuggestionData The object containing required parameter for link out suggestions (required)
     * @example
     *  {
     *      "destinationName": "Destination Name (required)",
     *      "uri": "http://Url.com (required)"
     *  }
     */
    setLinkOutSuggestions(linkOutSuggestionData) {
        let linkOutSuggestionsResponse = responseBuilder.buildLinkOutSuggestions(this._config.platformsEnabled, linkOutSuggestionData);
        linkOutSuggestionsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setMediaContents sets media contents for ACTIONS_ON_GOOGLE platform
     * setSimpleResponses function should be called before this function
     * setSuggestions function should be called before this function
     * @param {Object} mediaContentData The object containing required parameters for media contents (required)
     * @example
     *  {
     *      "mediaType": "AUDIO (required)",
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
    setMediaContents(mediaContentData) {
        let isSimpleResponsePresent = false;
        let isSuggestionChipsPresent = false;
        for (let i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (!isSimpleResponsePresent) {
                isSimpleResponsePresent = Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses") ? true : false;
            }
            if (!isSuggestionChipsPresent) {
                isSuggestionChipsPresent = Object.keys(this._response.fulfillmentMessages[i]).includes("suggestions") ? true : false;
            }
            if (isSimpleResponsePresent && isSuggestionChipsPresent) {
                break;
            }
        }
        if (!isSimpleResponsePresent && !isSuggestionChipsPresent) {
            throw new Error("Google Assistant 'simpleResponse' and 'suggestions' should be added to intent");
        }
        if (!isSimpleResponsePresent) {
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        }
        if (!isSuggestionChipsPresent) {
            throw new Error("Google Assistant 'suggestions' should be added to intent");
        }
        let mediaContentsResponse = responseBuilder.buildMediaContents(this._config.platformsEnabled, mediaContentData);
        mediaContentsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setTableCards sets table cards for ACTIONS_ON_GOOGLE platform
     * @param {Object} tableCardData The object containing required parameters for table card (required)
     * @example
     *  {
     *      "title": "Table Card title (required)",
     *      "subtitle": "Table Card subtitle (optional)",
     *      "imageUri": "http://imageUrl.com (required)",
     *      "imageAccessibilityText": "Image description for screen readers (required)",
     *      "columnProperties": 
     *      [
     *          {
     *              "header": "Header 1, (required)",
     *              "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
     *          },
     *          {
     *              "header": "Header 2, (required)",
     *              "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
     *          }
     *      ],
     *      "rows": 
     *      [
     *          {
     *              "cells": 
     *              [
     *                  {
     *                      "text": "Cell A1 (optional)"
     *                  },
     *                  {
     *                      "text": "Cell A2 (optional)"
     *                  }
     *              ],
     *              "dividedAfter": "true or false (optional, default: false)"
     *          },
     *          {
     *              "cells": 
     *              [
     *                  {
     *                      "text": "Cell B1 (optional)"
     *                  },
     *                  {
     *                      "text": "Cell B2 (optional)"
     *                  }
     *              ],
     *              "dividedAfter": "true or false (optional, default: false)"
     *          }
     *      ],
     *      "buttons": [{
     *          "title": "Button title (optional)", 
     *          "uri": "https://linkUrl.com (required if title is given)"
     *      }]
     *  } 
     */
    setTableCards(tableCardData) {
        let isSimpleResponsePresent = false;
        for (let i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses")) {
                isSimpleResponsePresent = true;
                break;
            }
        }
        if (!isSimpleResponsePresent) {
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        }
        let tableCardsResponse = responseBuilder.buildTableCards(this._config.platformsEnabled, tableCardData);
        tableCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setImages sets image cards for FACEBOOK_MESSENGER platform
     * @param {Object} imageData The object containing imageUri of the image (required)
     * @example
     *  {
     *      "imageUri": "http://imageUrl.com (required)"
     *  }
     */
    setImages(imageData) {
        let imagesResponse = responseBuilder.buildImages(this._config.platformsEnabled, imageData);
        imagesResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setPlayAudio sets the given audio file as response for TELEPHONY platform
     * @param {String} audioUri The url of the Cloud Storage bucket object (required)
     * @example
     *  "gs://<bucket>/<object>"
     */
    setPlayAudio(audioUri) {
        let playAudioResponse = responseBuilder.buildPlayAudio(this._config.platformsEnabled, audioUri);
        playAudioResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setSynthesizeSpeech converts given text input to audio for TELEPHONY platform
     * @param {String} text The text to be used for audio in TELEPHONY (required)
     * @example
     *  "<Text to convert to audio>"
     */
    setSynthesizeSpeech(text) {
        let synthesizeSpeechResponse = responseBuilder.buildSynthesizeSpeech(this._config.platformsEnabled, text);
        synthesizeSpeechResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setTransferCall transfers call to the given number for TELEPHONY platform
     * @param {String} phoneNumber The 10 digit phone number to which the call is to be transferred (required)
     * @example
     *  "9876543210"
     */
    setTransferCall(phoneNumber) {
        let transferCallResponse = responseBuilder.buildTransferCall(this._config.platformsEnabled, phoneNumber);
        transferCallResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setPayload sets the given custom payload
     * @param {Object} payload The custom payload object (required)
     * @example
     *  {
     *      "facebook": {
     *          "attachment": {
     *              "type": "audio",
     *              "payload": {
     *                 "url": "https://example.com/audio/test.mp3"
     *              }
     *          }
     *      }
     *  }
     */
    setPayload(payload) {
        this._response.fulfillmentMessages.push({ "payload": payload });
    }

    /**
     * setOutputContext sets output contexts
     * @param {String} name Name of the context (required)
     * @example "Context Name"
     * @param {Number} lifespan Lifespan of the context (required)
     * @example 5
     * @param {Object} parameters Parameters to be associated with the context (optional)
     * @example 
     *  {
     *      "username": "abc"
     *  }
     */
    setOutputContext(name, lifespan, parameters = {}) {
        let pushContextInResponse = true;
        let context = JSON.parse(JSON.stringify(contextHelper.getContext(this._request.queryResult, name, this._request.session)));
        if (contextHelper.getContext(this._response, name, this._request.session)) {
            context = contextHelper.getContext(this._response, name, this._request.session);
            pushContextInResponse = false;
        }
        if (context) {
            context.parameters = context.parameters ? context.parameters : {};
            context.lifespanCount = lifespan;
            let paramKeys = Object.keys(parameters);
            if (paramKeys.length > 0) {
                paramKeys.forEach((paramKey) => {
                    context.parameters[paramKey] = parameters[paramKey];
                });
            }
            if (pushContextInResponse) {
                this._response.outputContexts.push(context);
            }
        } else {
            let template = {
                "name": `${this._request.session}/contexts/${name}`,
                "lifespanCount": lifespan,
                "parameters": parameters
            };
            this._response.outputContexts.push(template);
        }
    }

    /**
     * getContext returns the outputContext object of the context name given in the input
     * @param {String} name Name of the context (required)
     * @example "context-name"
     * @returns {Object} Output Context Object
     * @example 
     *  {
     *      "name": "context-name",
     *      "lifespanCount": 2,
     *      "parameters": {
     *          "username": "abc"
     *          "username.original": "abc"
     *      }
     *  }
     */
    getContext(name) {
        if (this._request && this._request.queryResult)
            return contextHelper.getContext(this._request.queryResult, name, this._request.session);
        return null;
    }

    /**
     * getAllOutputContexts returns the outputContexts Array
     * @returns {Array} outputContexts array in the fulfillment request
     * @example
     *  [
     *      {
     *          "name": "Output Context 1",
     *          "lifespanCount": 2,
     *          "parameters": {
     *              "username": "abc",
     *              "username.original": "abc"
     *          }
     *      },
     *      {
     *          "name": "Output Context 2",
     *          "lifespanCount": 4,
     *          "parameters": {
     *              "phoneNumber": "9876543210",
     *              "phoneNumber.original": "9876543210"
     *          }
     *      }
     *  ]
     */
    getAllOutputContexts() {
        return contextHelper.getAllOutputContexts(this._request);
    }

    /**
     * clearContext sets the lifespanCount to 0 and empties the parameters of the given context
     * @param {String} name Name of the context (required)
     * @example "context-name"
     */
    clearContext(name) {
        let clearedOutPutContext = contextHelper.clearContext(this._request, this._response, name, this._request.session);
        if (clearedOutPutContext) {
            this._response.outputContexts.push(clearedOutPutContext);
        }
    }

    /**
     * setEvent sets the followupEventInput
     * @param {String} name Name of the Event (required)
     * @example "Followup Event"
     * @param {String} languageCode (optional)
     * @example "en-US"
     * @param {Object} parameters (optional)
     * @example
     *  {
     *      "username": "abc"
     *  }
     */
    setEvent(name, languageCode, parameters) {
        this._response["followupEventInput"] = {
            "name": name,
            "languageCode": languageCode || "en-US",
            "parameters": parameters || {}
        };
    }

    /**
     * getCompiledResponse compiles the entire webhook response built and returns it
     * @returns {Object} Fulfillment Response sent to Dialogflow
     * @example
     *  {
     *      "fulfillmentText": "Hello, welcome.",
     *      "fulfillmentMessages": [
     *          {
     *              "platform": "ACTIONS_ON_GOOGLE",
     *              "simpleResponses": { "simpleResponses": [ { "textToSpeech": "Hello, welcome." } ] }
     *          },
     *          {
     *              "platform": "ACTIONS_ON_GOOGLE",
     *              "suggestions": { "suggestions": [ { "title": "Suggestion 1" } ] } 
     *          },
     *          { "text": { "text": [ "Hello, welcome." ] } }
     *      ],
     *      "outputContexts": [
     *          {
     *              "name": "projects/{PROJECT_ID}/agent/sessions/{CONTEXT_ID}/contexts/test",
     *              "lifespanCount": 7,
     *              "parameters": {
     *                  "username": "name"
     *              }
     *          }
     *      ]
     *  }
     */
    getCompiledResponse() {
        let globalContext = contextHelper.getContext(this._request.queryResult, "global", this._request.session)
        if (globalContext) {
            globalContext.lifespanCount = 50;
        }
        return this._response;
    }

    /**
     * getErrorResponse returns error response message
     * @returns {Object} Webhook Service Error response
     * @example
     *  {
     *      "queryResult": {
     *          "webhookStatus": {
     *              "code": 3,
     *              "message": "Webhook service failed."
     *          }
     *      }
     *  }
     */
    getErrorResponse() {
        return {
            "queryResult": {
                "webhookStatus": {
                    "code": 3,
                    "message": "Webhook service failed."
                }
            }
        };
    }
}

module.exports = DialogflowFulfillment;
