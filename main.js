    // let keyCOllection = {
    //         // engish: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Control", "Meta", "Alt", " ", "Alt", "Control"],
    //         // russian: ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Control", "Meta", "Alt", " ", "Alt", "Control"],
    //         : ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "Shift",  "↑", "Shift", "Control", "Meta", "Alt", " ", "Alt", "←", "↓", "→", "Control"]
    //         // russianShifted: ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "Shift", "Control", "Meta", "Alt", " ", "Alt", "Control"]
    //     },

const Layout = {
    elements: {
        container: null,
        textField: null,
        keyboardContainer: null,
    },

    init() {
        // create text and keyboard container
        this.elements.container = document.createElement('div');
        this.elements.textField = document.createElement('textarea');
        this.elements.keyboardContainer = document.createElement('div');

        // add classes for text and keyboard container
        this.elements.textField.classList.add('textarea');
        this.elements.textField.setAttribute('autofocus', '');
        this.elements.keyboardContainer.classList.add('keyboard');

        // get back focus after blur
        this.elements.textField.addEventListener('blur', () => {
            this.elements.textField.focus();
        });

        // add to dom
        this.elements.container.appendChild(this.elements.textField);
        this.elements.container.appendChild(this.elements.keyboardContainer);
        document.body.appendChild(this.elements.container);

        // add keys to dom
        Layout.elements.keyboardContainer.appendChild(Keyboard.createKeys());

        // add text from both keyboards
        document.querySelectorAll('textarea').forEach(element => {
            element.addEventListener('focus', () => {
                Keyboard.addText(element.value, currentValue => {
                    element.value = currentValue;
                    this.elements.textField.focus();
                });
            });
        });
        
        // add and remove active class when clicked
        Layout.elements.keyboardContainer.addEventListener('mousedown', (event) => {
            Layout.elements.keyboardContainer.querySelectorAll('button').forEach(element => {
                if (element.dataset.value == event.target.dataset.value) {
                    event.target.classList.add('button--active');
                }
            });
        });
        Layout.elements.keyboardContainer.addEventListener('mouseup', () => {
            Layout.elements.keyboardContainer.querySelectorAll('button').forEach(element => {
                element.classList.remove('button--active');
            });
        });

        // add and remove active class when pressed
        document.addEventListener('keydown', (event) => {
            Layout.elements.keyboardContainer.querySelectorAll('button').forEach(element => {
                if (element.dataset.name == event.key) {    
                    element.classList.add('button--active');
                }
            });
        });        
        document.addEventListener('keyup', () => {
            Layout.elements.keyboardContainer.querySelectorAll('button').forEach(element => { 
                element.classList.remove('button--active');
            });
        });
    },
};

let Keyboard = {
    keys: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",  "↑", "Shift", "Control", "Meta", "Alt", " ", "Alt", "←", "↓", "→", "Control"],
    keysShifted: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "Shift",  "↑", "Shift", "Control", "Meta", "Alt", " ", "Alt", "←", "↓", "→", "Control"],

    events: {
        input: null,
    },
  
    properties: {
        value: '',
        capslockPressed: false,
        shiftPressed: false
    },

    createKeys() {
        const fragment = document.createDocumentFragment();        

        // create key element
        Keyboard.keys.forEach(keyItem => {
            const keyElement = document.createElement('button');
            keyElement.setAttribute('data-name', `${keyItem}`);
            // keyElement.innerHTML = `${keyItem}`;

            switch (keyItem) {
                case 'Backspace':
                    keyElement.classList.add('button-backspace');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('input');
                    });
                break;

                case 'Tab':
                    keyElement.classList.add('button-tab');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '  ';
                        this._triggerEvent('input');
                    });
                break;

                case 'CapsLock':
                    keyElement.classList.add('button-capslock');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('button--pressed', this.properties.capslockPressed);
                        this._triggerEvent('input');
                    });
                break;

                case 'Shift':
                    keyElement.classList.add('button-shift');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                        keyElement.classList.toggle('button--pressed', this.properties.shiftPressed);
                        this._triggerEvent('input');
                    });
                break;

                case 'Enter':
                    keyElement.classList.add('button-enter');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('input');
                    });
                break;
                
                case ' ':
                    keyElement.classList.add('button-space');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('input');
                    });
                break;

                case 'Control':
                    keyElement.classList.add('button-control');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._triggerEvent('input');
                    });
                break;

                case 'Meta':
                    keyElement.classList.add('button-win');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._triggerEvent('input');
                    });
                break;

                case 'Alt':
                    keyElement.classList.add('button-alt');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._triggerEvent('input');
                    });
                break;

                default:
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capslockPressed ? keyItem.toUpperCase() : keyItem.toLowerCase();
                            this._triggerEvent('input');
                    });
                break;   
            }
            fragment.appendChild(keyElement);
        });

        return fragment;
    },

    _triggerEvent(eventName) {
        if (typeof Keyboard.events[eventName] == 'function') {
            this.events[eventName](Keyboard.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capslockPressed = !this.properties.capslockPressed;

        for (const keyItem of this.keys) {
            if (keyItem.childElementCount === 0) {
                keyItem.textContent = this.properties.capslockPressed ? keyItem.textContent.toUpperCase() : keyItem.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        this.properties.shiftPressed = !this.properties.shiftPressed;
        for (const keyItem of this.keys) {
            if (keyItem.childElementCount === 0) {
                keyItem.textContent = this.properties.shiftPressed ? keyItem.textContent.toUpperCase() : keyItem.textContent.toLowerCase();
            }
        }
    },

    addText(initialValue, input) {
        Keyboard.properties.value = initialValue || '';
        Keyboard.events.input = input;
    }
};

// init when loaded
window.addEventListener('DOMContentLoaded', function () {
    Layout.init();
  });