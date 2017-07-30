function handleClick(selector, fn) {
  let node = document.querySelector(selector)
  node.addEventListener('click', fn)
}


handleClick('.show', evt => {
  browser.tabs.executeScript({
    code: 'showMetadata()'
  })
  window.close()
})

handleClick('.download', evt => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {action: 'getSongs'})
    window.close()
  })
})
