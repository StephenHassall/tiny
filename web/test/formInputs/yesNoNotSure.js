/**
 * Yes No Not Sure example web component. This is used to show how web componets can be used with the Form class
 * if they use the "value" attribute.
 */
export default class YesNoNotSure extends HTMLElement {
    /**
     * Create a new YesNoNotSure object.
     * @constructor
     */
    constructor() {
        // Must call super first
        super();

        // Create the CSS parts for the shadow DOM
        const style = document.createElement('style');

        // Set style
        style.textContent =
`
button {
  margin: 0.15rem;
  padding: 1rem;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;  
  border-radius: 0.5rem;
  font-size: 120%;
  cursor: pointer;
}
.selected {
  background-color: #419641;
  color: white;
}
`;

        // Attach shadow DOM root
        this._shadowRoot = this.attachShadow({mode: 'open'});

        // Add styles
        this._shadowRoot.appendChild(style);

        // Create root HTML
        const rootHtml = document.createElement('div');

        // Set inner HTML
        rootHtml.innerHTML =
`
<button id="yes" type="button">Yes</button>
<button id="no" type="button">No</button>
<button id="not-sure" type="button">Not Sure</button>
`;

        // Add root HTML to shadow DOM
        this._shadowRoot.appendChild(rootHtml);

        // Set value
        this._value = '';

        // Bind click events to this
        this._clickEvent = this._clickEvent.bind(this);
    }

    /**
    * Override connectedCallback function to handle when component is attached into the DOM.
    * @override
    */
    connectedCallback() {
        // Get elements
        this._yesElement = this._shadowRoot.getElementById('yes');
        this._noElement = this._shadowRoot.getElementById('no');
        this._notSureElement = this._shadowRoot.getElementById('not-sure');

        // Add click event listener
        this._yesElement.addEventListener('click', this._clickEvent);
        this._noElement.addEventListener('click', this._clickEvent);
        this._notSureElement.addEventListener('click', this._clickEvent);
    }

    /**
     * Override attributeChangedCallback function to handle attribute changes
     * @param {string} name Then name of the attribute that has changed.
     * @param {string} oldValue The old value of the attribute before it was changed.
     * @param {string} newValue The new value the attribute is being changed to.
     * @override
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // If value attribute changed
        if (name === 'value') {
            // Check and change yes
            if (newValue === 'yes') {
                // Set yes as selected
                this._yesElement.classList = ['selected'];
            } else {
                // Remove classes from yes
                this._yesElement.classList = [];
            }

            // Check and change no
            if (newValue === 'no') {
                // Set no as selected
                this._noElement.classList = ['selected'];
            } else {
                // Remove classes from no
                this._noElement.classList = [];
            }

            // Check and change not-sure
            if (newValue === 'not sure') {
                // Set not sure as selected
                this._notSureElement.classList = ['selected'];
            } else {
                // Remove classes from not sure
                this._notSureElement.classList = [];
            }
        }
    }

    /**
     * Override the observedAttributes function to return the list
     * of attributes to monitor.
     * @return {Array} List of attribute names.
     * @static
     * @override
     */
    static get observedAttributes() {
        // Return the list of attributes
        return ['value'];
    }

    /**
     * Gets the value of the value currently set.
     * @type {string}
     */
    get value() {
        // Return the current value
        return this._value;
    }

    /**
     * The yes, no or not sure option to show.
     * @param {string} value The option value to show.
     * @type {string}
     */
    set value(value) {
        // Set value
        this._value = value;

        // Set the attribute
        this.setAttribute('value', value);
    }

    /**
     * Click event.
     * @param {object} event The click event object.
     */
    _clickEvent(event) {
        // Check and change yes
        if (event.target.id === 'yes') {
            // Set value to yes
            this._value = 'yes';
        }

        // Check and change no
        if (event.target.id === 'no') {
            // Set value to no
            this._value = 'no';
        }

        // Check and change not-sure
        if (event.target.id === 'not-sure') {
            // Set value to not sure
            this._value = 'not sure';
        }

        // Set the value attribute
        this.setAttribute('value', this._value);
    }
}

// Define yes-no-not-sure component
customElements.define('yes-no-not-sure', YesNoNotSure);
