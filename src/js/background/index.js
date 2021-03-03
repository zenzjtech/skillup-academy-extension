import cst from "../popup/constants";
import { API_KEY, API_URL } from "../popup/config";
import axios from "axios";
const origin = 'https://skillup-academy.s3.amazonaws.com'
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
      value: origin
    })
  else
    requestHeaders[temp].value = origin
  
  temp = requestHeaders.findIndex(function(d) {
    return "referer" === d.name
  });
  if (temp === -1)
    requestHeaders.push({
      name: "Referer",
      value: origin
    })
  else
    requestHeaders[temp].value = origin
  return {
    requestHeaders
  }
}, {
  urls: ["https://skillup-academy.s3.amazonaws.com/*"]
}, ["blocking", "requestHeaders", "extraHeaders"]);


async function handleApiCall() {
  return fetch(API_URL).then(handleResponse)
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  (async () => {
    const { url }  = message;
    try {
      const data = await handleApiCall(url)
      sendResponse({
        type: cst.FETCH_SUCCESS,
        payload: data
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
