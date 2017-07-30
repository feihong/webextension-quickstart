
function showMetadata() {
  let playlist = getPlaylist()
  populateList(playlist)
  // for (let song of playlist) {
  //     console.log(song.url, song.artist.name, song.title)
  // }
}


function getPlaylist() {
  let scripts = $('script').filter(function() {
    return this.innerText.includes('var __bootstrap_data = ')
  })

  if (scripts.length) {
    let text = scripts[0].innerText
    let start = text.indexOf('{"playlist": ')
    let end = text.lastIndexOf(';')
    let data = JSON.parse(text.substring(start, end))
    return data.playlist
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
    let parts = song.url.split('/')
    let fileName = parts[parts.length - 1]
    $('<a>').text(fileName).attr('href', song.url).appendTo(li)

    $('<a style="margin: 0 1rem">')
      .attr('href', song.artist.url)
      .attr('target', '_blank')
      .html(song.artist.name)
      .appendTo(li)

    $('<span style="margin-right: 1rem">').html(song.title).appendTo(li)
  }
}
