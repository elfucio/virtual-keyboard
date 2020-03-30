document.body.onload = addElement;
let newInput = null;
let newDiv = null;

function addElement() {
    let newInput = document.createElement('input');
    let newDiv = document.createElement('div');

    newDiv.innerHTML = btn;
    newInput.classList.add('input');
    newDiv.classList.add('keyboard');
    document.body.insertAdjacentElement('afterbegin', newInput);
    newInput.insertAdjacentElement('afterend', newDiv);
}

let englishKeys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Control", "Meta", "Alt", " ", "Alt", "Control"];

let russianKeys = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Control", "Meta", "Alt", " ", "Control", "AltGraph", "Control"];

let btn = '';

function initEnglish() {
    for (let i = 0; i < englishKeys.length; i++) {
        if (englishKeys[i].length > 1) {
            btn += `<button class ="button-special"> ${englishKeys[i]} </button>`;
        } else if (englishKeys[i] === ' ') {
            btn += `<button class ="button-space"> ${englishKeys[i]} </button>`;
        }   else {
            btn += `<button class ="button"> ${englishKeys[i]} </button>`;
        }
    }
}
initEnglish();

// document.addEventListener('keyup', function(event) {
//     console.log(event.key);
// });