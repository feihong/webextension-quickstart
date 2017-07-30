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
