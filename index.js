import { catsData } from "./data.js"

const emotionRadios = document.querySelector("#emotion-radios")
const getImageBtn = document.querySelector("#get-image-btn")

// Starting app
const radiosArray = getEmotionsArray()

renderEmotionRadios()

// Event Listeners
emotionRadios.addEventListener("change", (e) => {
  const selectedID = e.target.id
  renderSelectedStyling(selectedID)
})

getImageBtn.addEventListener("click", () => {
  if (document.querySelector("input[type='radio']:checked")) {
    renderMeme()
  }
})

// Functions
function getEmotionsArray() {
  const emotionsArray = []
  catsData.forEach((cat) => {
    cat.emotionTags.forEach((emotion) => {
      const isInArray = emotionsArray.includes(emotion)
      if (!isInArray) {
        emotionsArray.push(emotion)
      }
    })
  })
  return emotionsArray
}

function renderEmotionRadios() {
  radiosArray.forEach((emotion) => {
    emotionRadios.innerHTML += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input 
          type="radio"
          name="emotions"
          id="${emotion}"
          value="${emotion}"
      </div>
    `
  })
}

function renderSelectedStyling(id) {
  const preSelectedItem = document.querySelector(".highlight")
  if (preSelectedItem) {
    preSelectedItem.classList.remove("highlight")
  }
  const selectedItem = document.querySelector(`#${id}`).parentElement
  selectedItem.classList.add("highlight")
}

function getMatchingArray() {
  const emotionSelected = document.querySelector(
    "input[type='radio']:checked"
  ).value
  const onlyGifSelected = document.querySelector(
    "input[type='checkbox']"
  ).checked
  const matchingArray = catsData.filter((cat) => {
    const emotionMatches = cat.emotionTags.includes(emotionSelected)
    if (onlyGifSelected) {
      const isGif = cat.isGif
      return emotionMatches && isGif
    }
    return emotionMatches
  })
  return matchingArray
}

function chooseRandomMeme() {
  const array = getMatchingArray()
  const randomIndex = Math.floor(Math.random() * array.length)

  return array[randomIndex]
}

function renderMeme() {
  const meme = chooseRandomMeme()

  const memeModal = document.querySelector("#meme-modal")
  const memeModalInner = document.querySelector("#meme-modal-inner")
  const memeModalCloseBtn = document.querySelector("#meme-modal-close-btn")

  memeModal.style.display = "flex"
  memeModalInner.innerHTML = `
    <img class="cat-img" src="./images/${meme.image}" alt="${meme.alt}" />
  `

  memeModalCloseBtn.addEventListener("click", () => {
    memeModal.style.display = "none"
  })
}
