console.log('background')

browser.runtime.onMessage.addListener(request => {
  if (request.action === 'downloadSongs') {
    for (let song of request.data) {
      // console.log(song.filename, song.url)
      browser.downloads.download({
        url: song.url,
        filename: 'douban/' + song.filename
      })
    }
  }
})

browser.webRequest.onBeforeRequest.addListener(
  details => {
    if (details.url.endsWith('.mp3')) {
      console.log('Before request:', details.requestId, details.url)
    }
  },
  {urls: ['*://*.doubanio.com/*']}
)

browser.webRequest.onCompleted.addListener(
  details => {
    let url = details.url
    console.log('Complete:', details.requestId, url)
    let parts = url.split('/')
    let filename = parts[parts.length - 1]
    browser.downloads.download({
      url: url,
      filename: 'douban/' + filename,
      conflictAction: 'overwrite'      
    })
  },
  {urls: ['*://*/*.mp3']}
)
