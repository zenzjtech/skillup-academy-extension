/**
 *
 * @param str
 * @return {string} userID or pageID
 */
function getPageType(str) {
  let res = str.match(/"entity_id":{"source":"prop","value":"\w+"}/g)
  try {
    res = JSON.parse(res[0].replace('"entity_id":', ''))
    return res.value
  } catch (e) {
    console.log(e)
    return null
  }
}
function getIdByType(str, type) {
  if (!type)
    return null;
  const regrex = new RegExp(`"${type}":"*\\w*`, 'g')
  let res = str.match(regrex)
  try {
    res = res[0].match(/\d+/g)
    return res[0];
  } catch (e) {
    console.log(e)
    return null;
  }
}

async function getPageDOM(url) {
  const parser = new DOMParser();
  try {
    const doc = await fetch(url)
      .then(res => res.text())
      .then(res =>  parser.parseFromString(res, 'text/html'))
    return doc
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function process(url) {
  try {
    const doc = await getPageDOM(url)
    const str = doc.documentElement.innerHTML
    const type = getPageType(str)
    return getIdByType(str, type)
  } catch (e) {
    console.log(e)
    throw e
  }
}
