/**
 * Date input example web component. This is used to show how web componets can be used with the Form class
 * if they require a translate function to convert a data property to/from the element
 */
export default class DateInput extends HTMLElement {
    /**
     * Create a new DateInput object.
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
select {
  margin: 0.15rem;
  padding: 1rem;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;  
  border-radius: 0.5rem;
  font-size: 120%;
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
<select id="year"></select>
<select id="month"></select>
<select id="day"></select>
`;

        // Add root HTML to shadow DOM
        this._shadowRoot.appendChild(rootHtml);

        // Get elements
        this._yearElement = this._shadowRoot.getElementById('year');
        this._monthElement = this._shadowRoot.getElementById('month');
        this._dayElement = this._shadowRoot.getElementById('day');

        // Add years, months, days
        this._addYears();
        this._addMonths();
        this._addDays();

        // Set default to emply
        this._yearElement.value = '';
        this._monthElement.value = '';
        this._dayElement.value = '';

        // Bind click events to this
        this._changeEvent = this._changeEvent.bind(this);
    }

    /**
    * Override connectedCallback function to handle when component is attached into the DOM.
    * @override
    */
    connectedCallback() {
        // Get elements
        this._yearElement = this._shadowRoot.getElementById('year');
        this._monthElement = this._shadowRoot.getElementById('month');
        this._dayElement = this._shadowRoot.getElementById('day');

        // Add change event listener
        this._yearElement.addEventListener('change', this._changeEvent);
        this._monthElement.addEventListener('change', this._changeEvent);
        this._dayElement.addEventListener('change', this._changeEvent);
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
            // Check parameter
            if (newValue.length !== 10) return;
            if (newValue.charAt(4) !== '-') return;
            if (newValue.charAt(7) !== '-') return;

            // Set date parts
            this._yearElement.value = parseInt(newValue.substr(0, 4));
            this._monthElement.value = parseInt(newValue.substr(5, 2));
            this._dayElement.value = parseInt(newValue.substr(8, 2));
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
     * Gets the value of the whole date currently set.
     * @type {string}
     */
    get value() {
        // Check all parts exist
        if (this._yearElement.value.length === 0) return '';
        if (this._monthElement.value.length === 0) return '';
        if (this._dayElement.value.length === 0) return '';

        // Get the year, month and day parts
        const year = parseInt(this._yearElement.value);
        const month = parseInt(this._monthElement.value);
        const day = parseInt(this._dayElement.value);

        // Set year text
        const yearText = year.toString();

        // Set month text
        let monthText = month.toString();
        if (monthText.length === 1) monthText = '0' + monthText;

        // Set day text
        let dayText = day.toString();
        if (dayText.length === 1) dayText = '0' + dayText;

        // Set date text
        const dateText = yearText + '-' + monthText + '-' + dayText;

        // Return the value of the current date
        return dateText;
    }

    /**
     * The value attribute value that is the current date in YYYY-MM-DD format.
     * @param {string} value The value of the day.
     * @type {string}
     */
    set value(value) {
        // Set the attribute
        this.setAttribute('value', value.toString());
    }

    /**
     * Form translate function. This is used by the Form class to move a date between the web component and a Date object.
     * @param {object} data The data that contains the property that will be transferred in and out of the form input elements.
     * @param {string} propertyName The name of the property inside the data object (we only use Date object).
     * @param {Element} element The form input element to translate the data to/from (this web component).
     * @param {number} task The task to perform.
     * 1 = Clear all form inputs to be empty/blank
     * 2 = Data to form transfer
     * 3 = Form to data transfer
     * @return {string} The name of the attribute used with the form input element to get/set its value.
     */
    static formTranslateFunction(data, propertyName, element, task) {
        // Get elements
        const yearElement = element._shadowRoot.getElementById('year');
        const monthElement = element._shadowRoot.getElementById('month');
        const dayElement = element._shadowRoot.getElementById('day');

        // If task is clear
        if (task === 1) {
            // Set date parts
            yearElement.value = '';
            monthElement.value = '';
            dayElement.value = '';
        }

        // If task is data to form
        if (task === 2) {
            // If the data property is a Date
            if (!(data[propertyName] instanceof Date)) throw new Error('Can only translate from a Date object');

            // Get date
            const date = data[propertyName];

            // Set the year, month and day parts
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            // Set year text
            const yearText = year.toString();

            // Set month text
            let monthText = month.toString();
            if (monthText.length === 1) monthText = '0' + monthText;

            // Set day text
            let dayText = day.toString();
            if (dayText.length === 1) dayText = '0' + dayText;

            // Set date text
            const dateText = yearText + '-' + monthText + '-' + dayText;

            // Set element date parts
            yearElement.value = year.toString();
            monthElement.value = month.toString();
            dayElement.value = day.toString();

            // Set the attribute
            element.setAttribute('value', dateText);
        }

        // If task is form to data
        if (task === 3) {
            // If the data property is a Date
            if (!(data[propertyName] instanceof Date)) throw new Error('Can only translate to a Date object');

            // Check all parts exist
            if (yearElement.value.length === 0 || monthElement.value.length === 0 || dayElement.value.length === 0) return 'value';

            // Get the year, month and day parts
            const year = parseInt(yearElement.value);
            const month = parseInt(monthElement.value);
            const day = parseInt(dayElement.value);

            // Get date
            const date = data[propertyName];

            // Get current time parts
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            // Create date object
            data[propertyName] = new Date(year, month - 1, day, hour, minute, second);
        }

        // Return the name of the attribute
        return 'value';
    }

    /**
    * Add the year <option> parts.
    * @private
    */
    _addYears() {
        // Set year from
        const yearFrom = 1970;

        // Set year to
        const today = new Date();
        const yearTo = today.getFullYear() + 20;

        // For each year
        for (let year = yearFrom; year <= yearTo; year++) {
            // Create <option> element
            const option = document.createElement('option');

            // Set member
            option.innerText = year.toString();
            option.value = year.toString();

            // Add to select year element
            this._yearElement.appendChild(option);
        }
    }

    /**
    * Add the month <option> parts.
    * @private
    */
    _addMonths() {
        // Set month text
        const monthText = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        // For each month
        for (let month = 1; month <= 12; month++) {
            // Create <option> element
            const option = document.createElement('option');

            // Set member
            option.innerText = month.toString() + ', ' + monthText[month - 1];
            option.value = month.toString();

            // Add to select month element
            this._monthElement.appendChild(option);
        }
    }

    /**
    * Add the days <option> parts.
    * @private
    */
    _addDays() {
        // For each day
        for (let day = 1; day <= 31; day++) {
            // Create <option> element
            const option = document.createElement('option');

            // Set member
            option.innerText = day.toString();
            option.value = day.toString();

            // Add to select day element
            this._dayElement.appendChild(option);
        }
    }

    /**
     * change event.
     * @param {object} event The change event object.
     */
    _changeEvent(event) {
        // Set the attribute
        this.setAttribute('value', this.value);
    }
}

// Define date-input component
customElements.define('date-input', DateInput);
