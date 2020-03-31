const Keyboard = {
    elements: {
        container: null,
        textField: null,
        keyboardContainer: null,
        keys: []
        // keys: {
        //     english: englishKeys,
        //     russian: russianKeys
        // }
    },
  
    eventHandlers: {
        input: null
    },
  
    properties: {
        value: '',
        capslockPressed: false,
        shiftPressed: false
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
        this.elements.keyboardContainer.appendChild(this._createKeys());

        // add classes for keys
        this.elements.keys = this.elements.keyboardContainer.querySelectorAll('.button');

        // add to dom
        this.elements.container.appendChild(this.elements.textField);
        this.elements.container.appendChild(this.elements.keyboardContainer);
        document.body.appendChild(this.elements.container);

        // add text from both keyboards
        document.querySelectorAll('textarea').forEach(element => {
            element.addEventListener('focus', () => {
                this.addText(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
        document.querySelectorAll('textarea').forEach(element => {
            element.addEventListener('change', () => {
                this.addText(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const englishKeys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Control", "Win", "Alt", " ", "Alt", "Control"];

        // const russianKeys = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Control", "Win", "Alt", " ", "Alt", "Control"];

        // create key element
        englishKeys.forEach(key => {
            const keyElement = document.createElement('button');
            keyElement.classList.add('button');
            keyElement.innerHTML = `${keyElement}`;

            // add class active for clicked keys
            document.addEventListener('mousedown', (event) => {
                document.querySelectorAll('.button').forEach(element => {
                    event.target.classList.add('button--active');
                });
            });

            // remove class active for clicked keys
            document.addEventListener('mouseup', (event) => {
                document.querySelectorAll('.button').forEach(element => {
                    element.classList.remove('button--active');
                });
            });

            // document.addEventListener('keydown', (event) => {
            //     document.querySelectorAll('.button').forEach(element => {
            //         if (element.dataset.key === event.key) {
            //             element.classList.add('button--active');
            //         }
            //     });
            // });

            // document.addEventListener('keyup', () => {
            //     document.querySelectorAll('.button').forEach(element => {
            //         if (element.classList.contains('button--active')) {
            //             element.classList.remove('button--active');
            //         }
            //     });
            // });

            switch (key) {
                case 'Backspace':
                    keyElement.classList.add('button-backspace');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('input');
                    });

                break;

                case 'Tab':
                    keyElement.classList.add('button-tab');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '  ';
                        this._triggerEvent('input');
                    });

                break;

                case 'CapsLock':
                    keyElement.classList.add('button-capslock');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('button--active', this.properties.capslockPressed);
                    });

                break;

                case 'Enter':
                    keyElement.classList.add('button-enter');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('input');
                    });

                break;

                case 'Shift':
                    keyElement.classList.add('button-shift');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                        keyElement.classList.toggle('button--active', this.properties.shiftPressed);
                    });

                break;
                
                case ' ':
                    keyElement.classList.add('button-space');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('input');
                    });

                break;

                case 'Control':
                    keyElement.classList.add('button-control');
                    keyElement.innerHTML = `${key}`;

                    keyElement.addEventListener('click', () => {
                        this._triggerEvent('input');
                    });

                break;

                case 'Alt':
                    keyElement.classList.add('button-alt');
                    keyElement.innerHTML = `${key}`;

                    // keyElement.addEventListener('click', () => {
                    //     this._triggerEvent('input');
                    // });

                break;

                default:
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${key}`;
                    keyElement.addEventListener('click', () => {
                        if (key.length == 1) {
                            this.properties.value += this.properties.capslockPressed ? key.toUpperCase() : key.toLowerCase();
                            this._triggerEvent('input');
                        }
                    });

                break;   
            }

            fragment.appendChild(keyElement);
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capslockPressed = !this.properties.capslockPressed;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capslockPressed ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        this.properties.shiftPressed = !this.properties.shiftPressed;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.shiftPressed ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    addText(initialValue, input) {
        this.properties.value = initialValue || '';
        this.eventHandlers.input = input;
    }
};

// document.addEventListener('keydown', (event) => {
//     document.querySelectorAll('.button').forEach(element => {
//         if (element.dataset.key === event.key) {
//             element.classList.add('button--active');
//         }
//     });
// });

// document.addEventListener('keyup', () => {
//     document.querySelectorAll('.button').forEach(element => {
//         if (element.classList.contains('button--active')) {
//             element.classList.remove('button--active');
//         }
//     });
// });

// document.addEventListener('mousedown', (event) => {
//     document.querySelectorAll('.button').forEach(element => {
//         event.target.classList.add('button--active');
//     });
// });

// document.addEventListener('mouseup', (event) => {
//     document.querySelectorAll('.button').forEach(element => {
//         element.classList.remove('button--active');
//     });
// });

// init when loaded
window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
  });