import { catsData } from './data.js';

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderCat);

memeModalCloseBtn.addEventListener("click", closeBtn);

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio");
    for (let radio of radios) {
        radio.classList.remove("highlight");
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
    const isGif = document.getElementById("gifs-only-option").checked;

    if (document.querySelector('input[type="radio"]:checked')) {
        const checkedRadio = document.querySelector('input[type="radio"]:checked').value;

        const matchingCatsArray = catsData.filter(function(cat) {
            if (isGif) {
                return cat.emotionTags.includes(checkedRadio) && cat.isGif
            } else {
                return cat.emotionTags.includes(checkedRadio)
            }
        })
        return matchingCatsArray;
    }
}

function getSingleCatObject() {
    const CatsArray = getMatchingCatsArray();

    if (CatsArray.length === 1) {
        return CatsArray[0];
    } else {
        return CatsArray[Math.floor(Math.random() * CatsArray.length)];
    }
}

function renderCat() {
    const catObject = getSingleCatObject();
    memeModal.style.display = "flex";

    memeModalInner.innerHTML = `<img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">`
}

function closeBtn() {
    memeModal.style.display = "none";
}

function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionRadios(cats) {
    const emotions = getEmotionsArray(cats);
    let radioItems = ``;
    for (let emotion of emotions) {
        radioItems += 
        `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio"
                   name="radio"
                   id="${emotion}"
                   value="${emotion}">
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionRadios(catsData)




