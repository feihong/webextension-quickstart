function main() {
//=============================================================================
let scripts = [...document.querySelectorAll('script')].filter(
  node => node.innerText.includes('var __bootstrap_data = '))

if (scripts.length) {
  let text = scripts[0].innerText
  let start = text.indexOf('{"playlist": ')
  let end = text.lastIndexOf(';')
  let data = JSON.parse(text.substring(start, end))

  for (let song of data.playlist) {
      console.log(song.url, song.artist.name, song.title)
    }
}
//=============================================================================
}

main()
