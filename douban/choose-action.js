function handleClick(selector, fn) {
  let node = document.querySelector(selector)
  node.addEventListener('click', fn)
}

handleClick('.show', evt => {
  console.log('show')
  browser.tabs.executeScript(null, {
    file: '/content-scripts/show-metadata.js'
  })
  window.close()
})
