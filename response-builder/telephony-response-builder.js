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
 * buildPlayAudioTelephony builds response for play audios for Telephony
 * @param {String} audioUri 
 * @example
 * "gs://<bucket>/<object> (required)"
 */
const buildPlayAudioTelephony = (audioUri) => {
    if(!audioUri) {
        throw new Error("Please enter an 'audioUri' and it should be a cloud storage object link");
    }
    return {
        "platform": "TELEPHONY",
        "telephonyPlayAudio": {
            "audioUri": audioUri
        }
    }
}

/**
 * buildSynthesizeSpeechTelephony builds response for synthesize speech for Telephony
 * @param {String} text 
 * @example
 * "<Text to convert to audio> (required)"
 */
const buildSynthesizeSpeechTelephony = (text) => {
    if(!text) {
        throw new Error("Please enter a response 'text'");
    }
    return {
        "platform": "TELEPHONY",
        "telephonySynthesizeSpeech": {
            "ssml": text
        }
    }
}

/**
 * buildTransferCallTelephony builds response for transfer call for Telephony
 * @param {String} phoneNumber 
 * @example
 * "+1987654321 (required)"
 */
const buildTransferCallTelephony = (phoneNumber) => {
    if(!phoneNumber) {
        throw new Error("Please enter a 'phoneNumber' to which you want to transfer the call to");
    } else if(phoneNumber.length != 10) {
        throw new Error("Please enter a valid 'phoneNumber'");
    }
    return {
        "platform": "TELEPHONY",
        "telephonyTransferCall": {
            "phoneNumber": `+1${phoneNumber}`
        }
    }
}

module.exports = { buildPlayAudioTelephony, buildSynthesizeSpeechTelephony, buildTransferCallTelephony };
