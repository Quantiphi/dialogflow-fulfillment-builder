<a name="DialogflowFulfillment"></a>

## DialogflowFulfillment
**Kind**: global class  

* [DialogflowFulfillment](#DialogflowFulfillment)
    * [new DialogflowFulfillment(config, request)](#new_DialogflowFulfillment_new)
    * [.setResponseText(responseText)](#DialogflowFulfillment+setResponseText)
    * [.setSimpleResponses(textToSpeech, displayText)](#DialogflowFulfillment+setSimpleResponses)
    * [.setSuggestions(suggestions)](#DialogflowFulfillment+setSuggestions)
    * [.setBasicCards(cardData)](#DialogflowFulfillment+setBasicCards)
    * [.setCarouselCards(carouselCardItems)](#DialogflowFulfillment+setCarouselCards)
    * [.setBrowseCarouselCards(browseCarouselCardItems)](#DialogflowFulfillment+setBrowseCarouselCards)
    * [.setLists(listData)](#DialogflowFulfillment+setLists)
    * [.setLinkOutSuggestions(linkOutSuggestionData)](#DialogflowFulfillment+setLinkOutSuggestions)
    * [.setMediaContents(mediaContentData)](#DialogflowFulfillment+setMediaContents)
    * [.setTableCards(tableCardData)](#DialogflowFulfillment+setTableCards)
    * [.setImages(imageData)](#DialogflowFulfillment+setImages)
    * [.setPlayAudio(audioUri)](#DialogflowFulfillment+setPlayAudio)
    * [.setSynthesizeSpeech(text)](#DialogflowFulfillment+setSynthesizeSpeech)
    * [.setTransferCall(phoneNumber)](#DialogflowFulfillment+setTransferCall)
    * [.setPayload(payload)](#DialogflowFulfillment+setPayload)
    * [.setOutputContext(name, lifespan, parameters)](#DialogflowFulfillment+setOutputContext)
    * [.getContext(name)](#DialogflowFulfillment+getContext) ⇒ <code>Object</code>
    * [.getAllOutputContexts()](#DialogflowFulfillment+getAllOutputContexts) ⇒ <code>Array</code>
    * [.clearContext(name)](#DialogflowFulfillment+clearContext)
    * [.setEvent(name, languageCode, parameters)](#DialogflowFulfillment+setEvent)
    * [.getCompiledResponse()](#DialogflowFulfillment+getCompiledResponse) ⇒ <code>Object</code>
    * [.getErrorResponse()](#DialogflowFulfillment+getErrorResponse) ⇒ <code>Object</code>

<a name="new_DialogflowFulfillment_new"></a>

### new DialogflowFulfillment(config, request)
The object of this DialogflowFulfillment class can be used to call all the functions of this class


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | config object which has the platformsEnabled array |
| request | <code>Object</code> | Dialogflow Fulfillment request object |

**Example**  
```js
{
    "platformsEnabled": [ "TEXT", "ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY" ]
} 
```
**Example**  
```js
{
     "responseId": "{RESPONSE_ID}",
     "queryResult": {
         "queryText": "Hello",
         "action": "input.welcome",
         "parameters": {},
         "allRequiredParamsPresent": true,
         "fulfillmentText": "Welcome",
         "fulfillmentMessages": [{ "text": { "text": [ "Welcome" ] } }],
         "outputContexts": [],
         "intent": {
             "name": "projects/{PROJECT_ID}/agent/intents/{INTENT_ID}",
             "displayName": "Default Welcome Intent"
         },
         "intentDetectionConfidence": 1,
         "languageCode": "en",
         "sentimentAnalysisResult": {
             "queryTextSentiment": {
                 "score": 0.1,
                 "magnitude": 0.1
             },
         },
     },
     "originalDetectIntentRequest": {
         "payload": {}
     },
     "session": "projects/{PROJECT_ID}/agent/sessions/{SESSION_ID}"
}
```
<a name="DialogflowFulfillment+setResponseText"></a>

### dialogflowFulfillment.setResponseText(responseText)
setResponseText sets text response

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| responseText | <code>String</code> | the text to be set in the response (required) |

**Example**  
```js
"Hello, welcome."
```
<a name="DialogflowFulfillment+setSimpleResponses"></a>

### dialogflowFulfillment.setSimpleResponses(textToSpeech, displayText)
setSimpleResponses sets simpleResponses for ACTIONS_ON_GOOGLE platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| textToSpeech | <code>String</code> | The text to be used for speech (required) |
| displayText | <code>String</code> | The text to be used for display optional (if not given, it will be same as textToSpeech) |

**Example**  
```js
"Hello, welcome."
```
**Example**  
```js
"Hello, welcome."
```
<a name="DialogflowFulfillment+setSuggestions"></a>

### dialogflowFulfillment.setSuggestions(suggestions)
setSuggestions sets suggestion chips for ACTIONS_ON_GOOGLE & FACEBOOK_MESSENGER platforms

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| suggestions | <code>Object</code> | The suggestions object containing the suggestions array (required) |

**Example**  
```js
{
     "title": "Suggestions Title (optional and only for FACEBOOK_MESSENGER)",
     "suggestions": ["Suggestion 1", "Suggestion 2"]
 }
```
<a name="DialogflowFulfillment+setBasicCards"></a>

### dialogflowFulfillment.setBasicCards(cardData)
setBasicCards sets basic cards for ACTIONS_ON_GOOGLE & FACEBOOK_MESSENGER platforms

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| cardData | <code>Object</code> | The object containing required data for cards |

**Example**  
```js
{
     "formattedText": "Card Description (required only for ACTIONS_ON_GOOGLE)",
     "title": "Card Title (optional for ACTIONS_ON_GOOGLE, required for FACEBOOK_MESSENGER)",
     "subtitle": "Card Subtitle (optional)",
     "imageUri": "http://imageUrl.com (optional and protocol must be http/https)",
     "imageAccessibilityText": "Image description for screen readers (required only if imageUri given and only for ACTIONS_ON_GOOGLE)",
     "buttons": [{
         "title": "Card Link title (optional for both)",
         "uri": "https://linkUrl.com (required only if title given and protocol must be http/https and only for ACTIONS_ON_GOOGLE)",
         "postback": "Text or URL (optional and only for FACEBOOK_MESSENGER)"
     }]
 }
```
<a name="DialogflowFulfillment+setCarouselCards"></a>

### dialogflowFulfillment.setCarouselCards(carouselCardItems)
setCarouselCards sets carousel cards for ACTIONS_ON_GOOGLE platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| carouselCardItems | <code>Array</code> | The array of carousel card objects (at least 2 items in the Array) |

**Example**  
```js
[
     {
         "infoKey": "itemOne (required)",
         "title": "Option One Title (required)",
         "description": "Option One Description (optional)",
         "synonyms": [
             "thing one",
             "object one"
         ],
         "imageUri": "http://imageOneUrl.com (optional)",
         "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
     },
     {
         "infoKey": "itemTwo (required)",
         "title": "Option Two Title (required)",
         "description": "Option Two Description (optional)",
         "synonyms": [
             "thing two",
             "object two"
         ],
         "imageUri": "http://imageTwoUrl.com (optional)",
         "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
     }
 ]
```
<a name="DialogflowFulfillment+setBrowseCarouselCards"></a>

### dialogflowFulfillment.setBrowseCarouselCards(browseCarouselCardItems)
setBrowseCarouselCards sets browse carousel cards for ACTIONS_ON_GOOGLE platform
setSimpleResponses function should be called before this function

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| browseCarouselCardItems | <code>Array</code> | The array of browse carousel card objects (at least 2 items in the Array) |

**Example**  
```js
[
     {
         "title": "Option one title (required)",
         "url": "https://optionOneUrl (required)",
         "urlTypeHint": "AMP_CONTENT (optional)",
         "description": "Option one description (optional)",
         "imageUri": "http://imageOneUrl.com (optional)",
         "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
         "footer": "Option one footer (optional)"
     },
     {
         "title": "Option two title (required)",
         "url": "https://optionTwoUrl (required)",
         "urlTypeHint": "AMP_CONTENT (optional)",
         "description": "Option two description (optional)",
         "imageUri": "http://imageTwoUrl.com (optional)",
         "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
         "footer": "Option two footer (optional)"
     }
 ]
```
<a name="DialogflowFulfillment+setLists"></a>

### dialogflowFulfillment.setLists(listData)
setLists sets lists for ACTIONS_ON_GOOGLE platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| listData | <code>Object</code> | The object containing required parameters for lists (required) |

**Example**  
```js
{
     "title": "List title (optional)",
     "items": 
     [
         {
             "title": "Item One (required)",
             "infoKey": "itemOne (required)",
             "description": "Item One Description (optional)",
             "synonyms": ["thing one", "object one"],
             "imageUri": "http://imageOneUrl.com (optional)",
             "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
         },
         {
             "title": "Item Two (required)",
             "infoKey": "itemTwo (required)",
             "description": "Item Two Description (optional)",
             "synonyms": ["thing two", "object two"],
             "imageUri": "http://imageTwoUrl.com (optional)",
             "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
         }
     ]
}
```
<a name="DialogflowFulfillment+setLinkOutSuggestions"></a>

### dialogflowFulfillment.setLinkOutSuggestions(linkOutSuggestionData)
setLinkOutSuggestions sets link out suggestions for ACTIONS_ON_GOOGLE platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| linkOutSuggestionData | <code>Object</code> | The object containing required parameter for link out suggestions (required) |

**Example**  
```js
{
     "destinationName": "Destination Name (required)",
     "uri": "http://Url.com (required)"
 }
```
<a name="DialogflowFulfillment+setMediaContents"></a>

### dialogflowFulfillment.setMediaContents(mediaContentData)
setMediaContents sets media contents for ACTIONS_ON_GOOGLE platform
setSimpleResponses function should be called before this function
setSuggestions function should be called before this function

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| mediaContentData | <code>Object</code> | The object containing required parameters for media contents (required) |

**Example**  
```js
{
     "mediaType": "AUDIO (required)",
     "mediaObjects": 
     [{
         "name": "Media content card title (required)",
         "contentUrl": "https://urlToMediaFile.com (required)",
         "description": "Media Content card description (optional)",
         "mediaContentType": "'largeImage' or 'icon' (required)",
         "imageUri": "http://imageUrl.com (optional)",
         "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
     }]
 }
```
<a name="DialogflowFulfillment+setTableCards"></a>

### dialogflowFulfillment.setTableCards(tableCardData)
setTableCards sets table cards for ACTIONS_ON_GOOGLE platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| tableCardData | <code>Object</code> | The object containing required parameters for table card (required) |

**Example**  
```js
{
     "title": "Table Card title (required)",
     "subtitle": "Table Card subtitle (optional)",
     "imageUri": "http://imageUrl.com (required)",
     "imageAccessibilityText": "Image description for screen readers (required)",
     "columnProperties": 
     [
         {
             "header": "Header 1, (required)",
             "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
         },
         {
             "header": "Header 2, (required)",
             "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
         }
     ],
     "rows": 
     [
         {
             "cells": 
             [
                 {
                     "text": "Cell A1 (optional)"
                 },
                 {
                     "text": "Cell A2 (optional)"
                 }
             ],
             "dividedAfter": "true or false (optional, default: false)"
         },
         {
             "cells": 
             [
                 {
                     "text": "Cell B1 (optional)"
                 },
                 {
                     "text": "Cell B2 (optional)"
                 }
             ],
             "dividedAfter": "true or false (optional, default: false)"
         }
     ],
     "buttons": [{
         "title": "Button title (optional)", 
         "uri": "https://linkUrl.com (required if title is given)"
     }]
 } 
```
<a name="DialogflowFulfillment+setImages"></a>

### dialogflowFulfillment.setImages(imageData)
setImages sets image cards for FACEBOOK_MESSENGER platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The object containing imageUri of the image (required) |

**Example**  
```js
{
     "imageUri": "http://imageUrl.com (required)"
 }
```
<a name="DialogflowFulfillment+setPlayAudio"></a>

### dialogflowFulfillment.setPlayAudio(audioUri)
setPlayAudio sets the given audio file as response for TELEPHONY platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| audioUri | <code>String</code> | The url of the Cloud Storage bucket object (required) |

**Example**  
```js
"gs://<bucket>/<object>"
```
<a name="DialogflowFulfillment+setSynthesizeSpeech"></a>

### dialogflowFulfillment.setSynthesizeSpeech(text)
setSynthesizeSpeech converts given text input to audio for TELEPHONY platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to be used for audio in TELEPHONY (required) |

**Example**  
```js
"<Text to convert to audio>"
```
<a name="DialogflowFulfillment+setTransferCall"></a>

### dialogflowFulfillment.setTransferCall(phoneNumber)
setTransferCall transfers call to the given number for TELEPHONY platform

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| phoneNumber | <code>String</code> | The 10 digit phone number to which the call is to be transferred (required) |

**Example**  
```js
"9876543210"
```
<a name="DialogflowFulfillment+setPayload"></a>

### dialogflowFulfillment.setPayload(payload)
setPayload sets the given custom payload

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The custom payload object (required) |

**Example**  
```js
{
     "facebook": {
         "attachment": {
             "type": "audio",
             "payload": {
                "url": "https://example.com/audio/test.mp3"
             }
         }
     }
 }
```
<a name="DialogflowFulfillment+setOutputContext"></a>

### dialogflowFulfillment.setOutputContext(name, lifespan, parameters)
setOutputContext sets output contexts

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the context (required) |
| lifespan | <code>Number</code> | Lifespan of the context (required) |
| parameters | <code>Object</code> | Parameters to be associated with the context (optional) |

**Example**  
```js
"Context Name"
```
**Example**  
```js
5
```
**Example**  
```js
{
     "username": "abc"
 }
```
<a name="DialogflowFulfillment+getContext"></a>

### dialogflowFulfillment.getContext(name) ⇒ <code>Object</code>
getContext returns the outputContext object of the context name given in the input

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  
**Returns**: <code>Object</code> - Output Context Object  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the context (required) |

**Example**  
```js
"context-name"
```
**Example**  
```js
{
     "name": "context-name",
     "lifespanCount": 2,
     "parameters": {
         "username": "abc"
         "username.original": "abc"
     }
 }
```
<a name="DialogflowFulfillment+getAllOutputContexts"></a>

### dialogflowFulfillment.getAllOutputContexts() ⇒ <code>Array</code>
getAllOutputContexts returns the outputContexts Array

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  
**Returns**: <code>Array</code> - outputContexts array in the fulfillment request  
**Example**  
```js
[
     {
         "name": "Output Context 1",
         "lifespanCount": 2,
         "parameters": {
             "username": "abc",
             "username.original": "abc"
         }
     },
     {
         "name": "Output Context 2",
         "lifespanCount": 4,
         "parameters": {
             "phoneNumber": "9876543210",
             "phoneNumber.original": "9876543210"
         }
     }
 ]
```
<a name="DialogflowFulfillment+clearContext"></a>

### dialogflowFulfillment.clearContext(name)
clearContext sets the lifespanCount to 0 and empties the parameters of the given context

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the context (required) |

**Example**  
```js
"context-name"
```
<a name="DialogflowFulfillment+setEvent"></a>

### dialogflowFulfillment.setEvent(name, languageCode, parameters)
setEvent sets the followupEventInput

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the Event (required) |
| languageCode | <code>String</code> | (optional) |
| parameters | <code>Object</code> | (optional) |

**Example**  
```js
"Followup Event"
```
**Example**  
```js
"en-US"
```
**Example**  
```js
{
     "username": "abc"
 }
```
<a name="DialogflowFulfillment+getCompiledResponse"></a>

### dialogflowFulfillment.getCompiledResponse() ⇒ <code>Object</code>
getCompiledResponse compiles the entire webhook response built and returns it

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  
**Returns**: <code>Object</code> - Fulfillment Response sent to Dialogflow  
**Example**  
```js
{
     "fulfillmentText": "Hello, welcome.",
     "fulfillmentMessages": [
         {
             "platform": "ACTIONS_ON_GOOGLE",
             "simpleResponses": { "simpleResponses": [ { "textToSpeech": "Hello, welcome." } ] }
         },
         {
             "platform": "ACTIONS_ON_GOOGLE",
             "suggestions": { "suggestions": [ { "title": "Suggestion 1" } ] } 
         },
         { "text": { "text": [ "Hello, welcome." ] } }
     ],
     "outputContexts": [
         {
             "name": "projects/{PROJECT_ID}/agent/sessions/{CONTEXT_ID}/contexts/test",
             "lifespanCount": 7,
             "parameters": {
                 "username": "name"
             }
         }
     ]
 }
```
<a name="DialogflowFulfillment+getErrorResponse"></a>

### dialogflowFulfillment.getErrorResponse() ⇒ <code>Object</code>
getErrorResponse returns error response message

**Kind**: instance method of [<code>DialogflowFulfillment</code>](#DialogflowFulfillment)  
**Returns**: <code>Object</code> - Webhook Service Error response  
**Example**  
```js
{
     "queryResult": {
         "webhookStatus": {
             "code": 3,
             "message": "Webhook service failed."
         }
     }
 }
```
