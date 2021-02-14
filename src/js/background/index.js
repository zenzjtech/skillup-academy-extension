import cst from "../popup/constants";

require('chrome-extension-async')

import { process} from "./facebook-id";

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
