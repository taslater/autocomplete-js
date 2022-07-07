let maxResults
const wordTree = {}

window.addEventListener("load", async () => {
  const textInput = document.getElementById("text-input")
  const resultUl = document.getElementById("result-ul")
  maxResults = resultUl.childElementCount

  fetch('./words.txt')
    .then(res => res.text())
    .then(text => text.split('\n'))
    .then(wordsArray => buildWordTree(wordsArray))
    .then(() => textInput.addEventListener("input", textListener))
    .then(() => console.log('Word tree is built'))
    .catch(error => console.log(error))
})

function buildWordTree(wordsArray) {
  for (const word of wordsArray) {
    let layer = wordTree
    for (const c of word.toLowerCase()) {
      if (!layer.hasOwnProperty(c)) {
        layer[c] = {}
      }
      layer = layer[c]
    }
    layer["word"] = word
  }
}

function textListener(e) {
  const partialText = e.target.value
  let layer = wordTree
  for (const c of partialText) {
    layer = layer[c]
    if (layer === undefined) break
  }
  const done = []
  if (layer === undefined) {
    showResults(done)
    return
  }
  active = Object.values(layer)
  while (done.length < maxResults) {
    if (active.length === 0) break
    current = active.shift()
    if (typeof current === 'string') {
      done.push(current)
      continue
    }
    active = active.concat(Object.values(current))
  }
  done.sort()
  showResults(done)
}

function showResults(done) {
  for (let i = 0; i < maxResults; i++) {
    const result = done[i]
    const li = document.getElementById(`li-${i}`)
    if (li === null) continue
    li.innerHTML = result === undefined ? "" : result
  }
}