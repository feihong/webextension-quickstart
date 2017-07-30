
function showMetadata() {
  let playlist = getPlaylist()
  populateList(playlist)
  // for (let song of playlist) {
  //     console.log(song.url, song.artist.name, song.title)
  // }
}


function copyMetadata() {
  document.execCommand('copy')
}



function getPlaylist() {
  console.log('Get playlist')
  let scripts = $('script').filter(function() {
    return this.innerText.includes('var __bootstrap_data = ')
  })

  if (scripts.length) {
    let text = scripts[0].innerText
    let start = text.indexOf('{"playlist": ')
    let end = text.lastIndexOf(';')
    let data = JSON.parse(text.substring(start, end))
    let playlist = data.playlist
    console.log(`Found ${playlist.length} songs in playlist`)
    return playlist.map(song => {
      let parts = song.url.split('/')
      song.filename = parts[parts.length - 1]
      return song
    })
  } else {
    console.log('No playlist found')
    return []
  }
}

function populateList(playlist) {
  let ol = $('ol#douban-metadata')
  if (ol.length === 0) {
    ol = $('<ol id="douban-metadata">').prependTo(document.body)
  } else {
    ol.empty()
  }
  for (let song of playlist) {
    let li = $('<li>').appendTo(ol)
    $('<a>').text(song.filename).attr('href', song.url).appendTo(li)

    $('<a style="margin: 0 1rem">')
      .attr('href', song.artist.url)
      .attr('target', '_blank')
      .html(song.artist.name)
      .appendTo(li)

    $('<span style="margin-right: 1rem">').html(song.title).appendTo(li)
  }
}


browser.runtime.onMessage.addListener(request => {
  if (request.action === 'getSongs') {
    browser.runtime.sendMessage({
      action: 'downloadSongs',
      data: getPlaylist()
    })
  }
});
