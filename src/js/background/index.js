import cst from "../popup/constants";
import { API_KEY, API_URL } from "../popup/config";
import axios from "axios";
import { handleResponse } from "../popup/services/helper";

require('chrome-extension-async')

chrome.webRequest.onBeforeSendHeaders.addListener
(function(requestHeaders) {
  requestHeaders = requestHeaders.requestHeaders;
  
  let temp = requestHeaders.findIndex(function(d) {
    return "Origin" === d.name
  });
  if (temp === -1)
    requestHeaders.push({
      name: "Origin",
      value: "https://textrazor.com"
    })
  else
    requestHeaders[temp].value = "https://textrazor.com";
  
  temp = requestHeaders.findIndex(function(d) {
    return "referer" === d.name
  });
  if (temp === -1)
    requestHeaders.push({
      name: "Referer",
      value: "https://textrazor.com"
    })
  else
    requestHeaders[temp].value = "https://textrazor.com"
  return {
    requestHeaders
  }
}, {
  urls: ["https://*.textrazor.com/*"]
}, ["blocking", "requestHeaders", "extraHeaders"]);


async function handleApiCall(url) {
  return fetch(API_URL, {
    method: 'POST',
    "headers": {
      "Content-Type": 'application/x-www-form-urlencoded',
      "x-textRazor-key": API_KEY
    },
    body: `url=${url}&extractors=entities, topics, words, phrases, dependency-trees, relations, entailments, senses, spelling&cleanup.mode=cleanHTML`
    
  }).then(handleResponse)
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  (async () => {
    const { url }  = message;
    try {
      const id = await handleApiCall(url)
      sendResponse({
        type: cst.FETCH_SUCCESS,
        payload: id
      })
    } catch (e) {
      sendResponse({
        type: cst.FETCH_FAIL,
        payload: e.message || "Failed to fetch"
      })
    }
  })()
  return true
})
