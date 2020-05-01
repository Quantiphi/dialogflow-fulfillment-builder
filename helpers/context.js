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
 * getContext returns contexts of a particular intent
 * @param {Object} queryResult queryResult
 * @param {String} name name of the context which we want
 * @param {String} session Dialogflow session id
 */
const getContext = (queryResult, name, session) => {
    if (queryResult && queryResult.outputContexts && queryResult.outputContexts.length > 0) {
        for (let i = 0; i < queryResult.outputContexts.length; i++) {
            if (queryResult.outputContexts[i]["name"] === `${session}/contexts/${name}`) {
                return queryResult.outputContexts[i];
            }
        }
    }
    return null;
}

/**
 * clearContext clears context of the intent given as input
 * @param {Object} request Fulfillment request
 * @param {Object} response Fulfillment response
 * @param {String} name 
 * @param {String} session Dialogflow session id
 */
const clearContext = (request, response, name, session) => {
    if (getContext(response, name, request.session)) {
        let context = getContext(response, name, request.session);
        context["lifespanCount"] = 0;
        context["parameters"] = {};
        return null;
    }
    if (request.queryResult && request.queryResult.outputContexts && request.queryResult.outputContexts.length > 0) {
        for (let i = 0; i < request.queryResult.outputContexts.length; i++) {
            if (request.queryResult.outputContexts[i]["name"] === `${session}/contexts/${name}`) {
                let context = {};
                context["name"] = request.queryResult.outputContexts[i]["name"];
                context["lifespanCount"] = 0;
                context["parameters"] = {};
                return context;
            }
        }
    }
    return null;
}

/**
 * getAllOutputContexts returns the outputContexts Array
 * @param {Object} request 
 * @returns {Array}
 */
const getAllOutputContexts = (request) => {
    if (request.queryResult && request.queryResult.outputContexts && request.queryResult.outputContexts.length > 0) {
        return request.queryResult.outputContexts;
    }
    return null;
}

module.exports = { getContext, clearContext, getAllOutputContexts };
