let Layout = {
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
                if (element.dataset.name == event.key || element.dataset.name == event.code) {
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
    keys: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",  "↑", "ShiftRight", "ControlLeft", "Meta", "AltLeft", " ", "AltRight", "←", "↓", "→", "ControlRight"],
    keysShifted: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", " Shift",  "↑", "Shift ", "Control", "Meta", "Alt", " ", "Alt", "←", "↓", "→", "Control"],

    events: {
        input: null
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
                        this._triggerInput('input');
                    });
                break;

                case 'Tab':
                    keyElement.classList.add('button-tab');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '  ';
                        this._triggerInput('input');
                    });
                break;

                case 'CapsLock':
                    keyElement.classList.add('button-capslock');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('button--pressed', this.properties.capslockPressed);
                        this._triggerInput('input');
                    });
                break;

                case 'ShiftLeft':
                    keyElement.classList.add('button-shift');
                    keyElement.innerHTML = 'Shift';
                    keyElement.setAttribute('data-name', 'ShiftLeft'); 
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('button--pressed', this.properties.capslockPressed);
                        this._triggerInput('input');
                    });
                break;

                case 'ShiftRight':
                    keyElement.classList.add('button-shift');
                    keyElement.innerHTML = 'Shift';
                    keyElement.setAttribute('data-name', 'ShiftRight'); 
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('button--pressed', this.properties.capslockPressed);
                        this._triggerInput('input');
                    });
                break;

                case 'Enter':
                    keyElement.classList.add('button-enter');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerInput('input');
                    });
                break;
                
                case ' ':
                    keyElement.classList.add('button-space');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerInput('input');
                    });
                break;

                case 'ControlLeft':
                    keyElement.classList.add('button-control');
                    keyElement.innerHTML = 'Control';
                    keyElement.setAttribute('data-name', 'ControlLeft'); 
                    keyElement.addEventListener('click', () => {
                        this._triggerInput('input');
                    });
                break;

                case 'ControlRight':
                    keyElement.classList.add('button-control');
                    keyElement.innerHTML = 'Control';
                    keyElement.setAttribute('data-name', 'ControlRight'); 
                    keyElement.addEventListener('click', () => {
                        this._triggerInput('input');
                    });
                break;

                case 'Meta':
                    keyElement.classList.add('button-win');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this._triggerInput('input');
                    });
                break;

                case 'AltLeft':
                    keyElement.classList.add('button-alt');
                    keyElement.innerHTML = 'Alt';
                    keyElement.setAttribute('data-name', 'AltLeft'); 
                    keyElement.addEventListener('click', () => {
                        this._triggerInput('input');
                    });
                break;

                case 'AltRight':
                    keyElement.classList.add('button-alt');
                    keyElement.innerHTML = 'Alt';
                    keyElement.setAttribute('data-name', 'AltRight'); 
                    keyElement.addEventListener('click', () => {
                        this._triggerInput('input');
                    });
                break;

                case '↑':
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.setAttribute('data-name', 'ArrowUp');                    
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↑';
                        this._triggerInput('input');
                    });
                break;

                case '←':
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.setAttribute('data-name', 'ArrowLeft');  
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '←';
                        this._triggerInput('input');
                    });
                break;

                case '↓':
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.setAttribute('data-name', 'ArrowDown');  
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↓';
                        this._triggerInput('input');
                    });
                break;

                case '→':
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.setAttribute('data-name', 'ArrowRight');  
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '→';
                        this._triggerInput('input');
                    });
                break;

                default:
                    keyElement.classList.add('button');
                    keyElement.innerHTML = `${keyItem}`;
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capslockPressed ? keyItem.toUpperCase() : keyItem.toLowerCase();
                            this._triggerInput('input');
                    });
                break;   
            }
            fragment.appendChild(keyElement);
        });

        return fragment;
    },

    _triggerInput(eventName) {
        if (typeof Keyboard.events[eventName] == 'function') {
            this.events[eventName](Keyboard.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capslockPressed = !this.properties.capslockPressed;
    },

    // _toggleShift() {
    //     this.properties.shiftPressed = !this.properties.shiftPressed;
    // },

    addText(initialValue, input) {
        Keyboard.properties.value = initialValue || '';
        Keyboard.events.input = input;
    }
};

// init when loaded
window.addEventListener('DOMContentLoaded', function () {
    Layout.init();
  });

