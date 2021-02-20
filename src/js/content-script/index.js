
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
    let result = await getTextInfo()
    result = JSON.parse(result)
    let entities = result.response.entities
      .map(entity => entity.entityId);
    entities = Array.from(new Set(entities)).sort().reverse().slice(0, 20)
    console.log(entities)
    entities.forEach(ent => {
      console.log(ent)
      hl.apply(ent, 1);
    })
  } catch (e) {
    console.log(e)
  }
}

process()
