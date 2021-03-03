const hl = new Highlight()

async function getTextInfo() {
  try {
    const response = await chrome.runtime.sendMessage({
      url: document.URL
    })
    if (response.type === 'FETCH_FAIL')
      throw new Error({ message: response.payload })
    
    return response.payload
  } catch (error) {
    throw new Error(error && error.message || 'There is some errors, please try again later' )
  }
}

async function process() {
  try {
    const state = await chrome.storage.local.get(['KEY_STATE'])
    if (state.KEY_STATE === false)
      return
    let result = await getTextInfo()
    setInterval(function() {
      let keywords = result.map(v => v.name)
      console.log(keywords)
      keywords.forEach(keyword => {
        console.log(keyword)
        hl.apply(keyword, 1);
      }, 500)
    })
  } catch (e) {
    console.log(e)
  }
}

process()
