function handleClick(selector, fn) {
  let node = document.querySelector(selector)
  node.addEventListener('click', fn)
}

handleClick('.show', evt => {
  browser.tabs.executeScript(null, {
    code: 'showMetadata()'
  })
  window.close()
})
