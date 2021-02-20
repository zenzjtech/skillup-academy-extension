import cst from "../popup/constants";

export async function getTextInfo() {
  try {
    const response = await chrome.runtime.sendMessage({
      url: document.URL
    })
    if (response.type === cst.FETCH_FAIL)
      throw new Error({ message: response.payload })
    
    return response.payload
  } catch (error) {
    throw new Error(error && error.message || 'There is some errors, please try again later' )
  }
}
