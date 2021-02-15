import cst from "../popup/constants";

require('chrome-extension-async')

import { process} from "./facebook-id";

chrome.webRequest.onBeforeSendHeaders.addListener/**
 *
 */
(function(requestHeaders) {
  requestHeaders = requestHeaders.requestHeaders;
  
  let temp = requestHeaders.findIndex(function(d) {
    return "Origin" === d.name
  });
  if (temp === -1)
    requestHeaders.push({
      name: "Origin",
      value: "https://www.facebook.com"
    })
  else
    requestHeaders[temp].value = "https://www.facebook.com";
  
  temp = requestHeaders.findIndex(function(d) {
    return "referer" === d.name
  });
  if (temp === -1)
    requestHeaders.push({
      name: "Referer",
      value: "https://www.facebook.com"
    })
  else
    requestHeaders[temp].value = "https://www.facebook.com";
  return {
    requestHeaders
  }
}, {
  urls: ["https://*.facebook.com/*"]
}, ["blocking", "requestHeaders", "extraHeaders"]);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  (async () => {
    const { url }  = message;
    try {
      const id = await process(url)
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
