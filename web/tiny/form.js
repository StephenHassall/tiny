import Controller from './controller.js';

/**
 * Form
 *
 * Allows data to be transferred between inputs in a form and properties in a data object.
 */
export default class Form {
    /**
     * The Form constructor function.
     * @param {*} data The data object that contains each property for each form input.
     * @param {Controller} controller Any web component derived from the Tiny Web Application Framework Controller class.
     */
    constructor(data, controller) {
        // Check parameters
        if (typeof data !== 'object') throw new Error('Form constructor parameter data is not an object');
        if (!(controller instanceof Controller)) throw new Error('Form constructor parameter controller is not derived from Tiny Web Application Framework Controller class');

        // Set the data
        this._data = data;

        // Set controller
        this._controller = controller;

        // Create a list of inputs
        this._inputList = [];

        // Bind functions to this class instance
        this._defaultTranslate = this._defaultTranslate.bind(this);

        // Set active element
        this.activeElement = {};
        this.activeElement.id = '';
        this.activeElement.selectionStart = -1;
        this.activeElement.selectionEnd = -1;
    }

    /**
     * Add a link between a data property and a form input element.
     * @param {string} propertyName The name of the property in the data.
     * @param {string} inputElementId The id of the form input element.
     * @param {callback=} translateFunction If you are not using a normal input element then you may need your own
     * function to translate the value to and from the custom form input.
     */
    add(propertyName, inputElementId, translateFunction) {
        // Check parameters
        if (typeof propertyName !== 'string') throw new Error('Form add parameter propertyName is not a string');
        if (propertyName.length === 0) throw new Error('Form add parameter propertyName cannot be empty');
        if (typeof inputElementId !== 'string') throw new Error('Form add parameter inputElementId is not a string');
        if (inputElementId.length === 0) throw new Error('Form add parameter inputElementId cannot be empty');
        if (translateFunction !== undefined) {
            if (typeof translateFunction !== 'function') throw new Error('Form add parameter translateFunction is defined but is not a function');
        }

        // Create input object
        const input = {};
        input.propertyName = propertyName;
        input.elementId = inputElementId;
        input.elementAttribute = undefined;
        input.translateFunction = translateFunction;
        input.lastValue = undefined;

        // Set translate function to use
        if (translateFunction === undefined) input.translateFunction = this._defaultTranslate;

        // Add to input list
        this._inputList.push(input);
    }

    /**
     * Transfer the data property values into the form inputs.
     */
    dataToForm() {
        // Perform an update to transfer data to the form inputs
        this._update(2);
    }

    /**
     * Transfer the form input value into the data properties.
     */
    formToData() {
        // Perform an update to transfer form inputs to the data
        this._update(3);
    }

    /**
     * Refresh the form inputs so they contain the same values they had the last time they where updated. This
     * is used to reset the form elements after they have been recreated by using the Template.update(...) function.
     */
    refresh() {
        // Perform an update to refresh the form inputs
        this._update(0);
    }

    /**
     * Clear all the form inputs so they are empty and blank.
     */
    clear() {
        // Perform an update to clear the form inputs
        this._update(1);
    }

    /**
     * Set the data to use. This will replace the data set in the constructor.
     * @param {Object} data The data object that contains each property for each form input.
     */
    setData(data) {
        // Check parameters
        if (typeof data !== 'object') throw new Error('Form setData parameter data is not an object');

        // Set the data
        this._data = data;
    }

    /**
     * Update the data and form inputs.
     * @param {number} task The task to perform when updating. This can be one of the following.
     * 0 = Refresh all form inputs to the ones used last
     * 1 = Clear all form inputs to be empty/blank
     * 2 = Data to form transfer
     * 3 = Form to data transfer
     */
    _update(task) {
        // For each input
        this._inputList.forEach((input) => {
            // Get the element
            const element = this._controller.getElementById(input.elementId);

            // If not found
            if (element === null) throw new Error('Element is missing ' + input.elementId);

            // If task is to refresh form input elements
            if (task === 0) {
                // If this input does not have a last value set
                if (input.lastValue === undefined) return;

                // If there is no element attribute set yet
                if (input.elementAttribute === undefined) return;

                // Set the element to the last known value
                element[input.elementAttribute] = input.lastValue;
                return;
            }

            // Call the translate function
            const attribute = input.translateFunction(this._data, input.propertyName, element, task);

            // If we have not set the element attribute yet then set it now
            if (input.elementAttribute === undefined) input.elementAttribute = attribute;

            // Update the last value of the element
            input.lastValue = element[input.elementAttribute];
        });

        // If task is refresh
        if (task === 0) {
            // If there is an active element
            if (this.activeElement.id !== '') {
                // Get the element
                let element = this._controller.getElementById(this.activeElement.id);

                // If element is found
                if (element !== null) {
                    // If selection start is set
                    if (this.activeElement.selectionStart !== undefined) element.selectionStart = this.activeElement.selectionStart;

                    // If selection end is set
                    if (this.activeElement.selectionEnd !== undefined) element.selectionEnd = this.activeElement.selectionEnd;

                    // Give the element the focus
                    element.focus();
                }
            }
        }

        // Reset active element to be empty
        this.activeElement.id = '';

        // If task is form to data
        if (task === 3) {
            // If active element exists
            if (document.activeElement) {
                // Set active element parts
                this.activeElement.id = document.activeElement.id;
                this.activeElement.selectionStart = document.activeElement.selectionStart;
                this.activeElement.selectionEnd = document.activeElement.selectionEnd;
            }
        }
    }

    /**
     * Default translate function.
     * @param {object} data The data that contains the property that will be transferred in and out of the form input elements.
     * @param {string} propertyName The name of the property inside the data object.
     * @param {Element} element The form input element to translate the data to/from.
     * @param {number} task The task to perform.
     * 1 = Clear all form inputs to be empty/blank
     * 2 = Data to form transfer
     * 3 = Form to data transfer
     * @return {string} The name of the attribute used with the form input element to get/set its value.
     */
    _defaultTranslate(data, propertyName, element, task) {
        // Set the default attribute to look for
        let attribute = 'value';

        // If the element is of type INPUT
        if (element.nodeName === 'INPUT') {
            // Check for special types of inputs
            if (element.type === 'checkbox') attribute = 'checked';
            if (element.type === 'radio') attribute = 'checked';
        }

        // If no element attribute used
        if (element[attribute] === undefined) {
            // Do nothing and just return the attribute name
            return attribute;
        }

        // Get data property type
        const propertyType = typeof data[propertyName];

        // If task is to clear the form input
        if (task === 1) {
            // Set value
            let value = '';

            // If the element is of type INPUT and checkbox or radio
            if (element.nodeName === 'INPUT' && (element.type === 'checkbox' || element.type === 'radio')) {
                // Set value to be false
                value = false;
            }

            // If the element is of type INPUT and color
            if (element.nodeName === 'INPUT' && element.type === 'color') {
                // Set value to be black
                value = '#000000';
            }

            // Set input element
            element[attribute] = value;
        }

        // If task is transferring from the data to the form inputs
        if (task === 2) {
            // Set value
            let value = undefined;

            // If the element is of type INPUT
            if (element.nodeName === 'INPUT') {
                // Switch on the input's element type
                switch (element.type) {
                    case 'color':
                    case 'email':
                    case 'number':
                    case 'password':
                    case 'range':
                    case 'search':
                    case 'tel':
                    case 'text':
                    case 'url':
                        value = this._translateDataToFormByText(propertyType, data[propertyName]);
                        break;
                    case 'checkbox':
                        value = this._translateDataToFormByBoolean(propertyType, data[propertyName]);
                        break;
                    case 'week':
                        value = data[propertyName];
                        break;
                }
            }

            // If the element is of type SELECT or TEXTAREA
            if (element.nodeName === 'SELECT' || element.nodeName === 'TEXTAREA') {
                // Translate using type text
                value = this._translateDataToFormByText(propertyType, data[propertyName]);
            }

            // If the element is of type INPUT and radio
            if (element.nodeName === 'INPUT' && element.type === 'radio') {
                // Check to see if the translated text is the same as the element/radio value
                if (this._translateDataToFormByText(propertyType, data[propertyName]) === element.value) {
                    // Set the element as checked
                    element.checked = true;
                }

                // Return the name of the attribute we used to get/set the form element input data
                return attribute;
            }

            // If the element is of type INPUT and date
            if (element.nodeName === 'INPUT' && element.type === 'date') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the Date object into a string for the element value
                    value = this._convertDateToString(data[propertyName], false);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, data[propertyName]);
                }
            }

            // If the element is of type INPUT and datetime-local
            if (element.nodeName === 'INPUT' && element.type === 'datetime-local') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the Date object into a string for the element value (that includes the time parts)
                    value = this._convertDateToString(data[propertyName], true);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, data[propertyName]);
                }
            }

            // If the element is of type INPUT and time
            if (element.nodeName === 'INPUT' && element.type === 'time') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the Date object (the time parts) into a string for the element value
                    value = this._convertTimeToString(data[propertyName]);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, data[propertyName]);
                }
            }

            // If the element is of type INPUT and month
            if (element.nodeName === 'INPUT' && element.type === 'month') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the Date object (the day and month parts) into a string for the element value
                    value = this._convertMonthToString(data[propertyName]);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, data[propertyName]);
                }
            }

            // If still undefined
            if (value === undefined) {
                // Set to the default custom control value as a string
                value = data[propertyName].toString();
            }

            // If the value is not undefined (we translated it)
            if (value !== undefined) {
                // Set input element
                element[attribute] = value;
            }
        }

        // If task is transferring from the form inputs to the data
        if (task === 3) {
            // Set value
            let value = undefined;

            // If the element is of type INPUT
            if (element.nodeName === 'INPUT') {
                // Switch on the input's element type
                switch (element.type) {
                    case 'color':
                    case 'email':
                    case 'number':
                    case 'password':
                    case 'range':
                    case 'search':
                    case 'tel':
                    case 'text':
                    case 'url':
                        value = this._translateFormToDataByText(propertyType, element[attribute]);
                        break;
                    case 'checkbox':
                        value = this._translateFormToDataByBoolean(propertyType, element[attribute]);
                        break;
                    case 'week':
                        value = element[attribute];
                        break;
                }
            }

            // If the element is of type SELECT or TEXTAREA
            if (element.nodeName === 'SELECT' || element.nodeName === 'TEXTAREA') {
                // Translate using type text
                value = this._translateFormToDataByText(propertyType, element[attribute]);
            }

            // If the element is of type INPUT and radio
            if (element.nodeName === 'INPUT' && element.type === 'radio') {
                // If checked
                if (element.checked) {
                    // Translate the value by text
                    value = this._translateFormToDataByText(propertyType, element.value);

                    // Set input data
                    data[propertyName] = value;
                }

                // Return the name of the attribute we used to get/set the form element input data
                return attribute;
            }

            // If the element is of type INPUT and date
            if (element.nodeName === 'INPUT' && element.type === 'date') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the element value into a Date object (using the current date's time)
                    value = this._convertStringToDate(element.value, data[propertyName]);
                } else {
                    // Translate using type text
                    value = this._translateFormToDataByText(propertyType, element.value);
                }
            }

            // If the element is of type INPUT and datetime-local
            if (element.nodeName === 'INPUT' && element.type === 'datetime-local') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the element value into a Date object (including the time parts)
                    value = this._convertStringToDate(element.value);

                    // If no date time then just leave it as it is
                    if (value === undefined) {
                        // Return the name of the attribute we used to get/set the form element input data
                        return attribute;
                    }
                } else {
                    // Translate using type text
                    value = this._translateFormToDataByText(propertyType, element.value);
                }
            }

            // If the element is of type INPUT and time
            if (element.nodeName === 'INPUT' && element.type === 'time') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the element value (which contains the time value) and set the date's time parts
                    value = this._convertStringToTime(element.value, data[propertyName]);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, element.value);
                }
            }

            // If the element is of type INPUT and month
            if (element.nodeName === 'INPUT' && element.type === 'month') {
                // If the data property is a Date
                if (data[propertyName] instanceof Date) {
                    // Convert the element value (which contains the month value) and set the date's year and month parts
                    value = this._convertStringToMonth(element.value, data[propertyName]);
                } else {
                    // Translate using type text
                    value = this._translateDataToFormByText(propertyType, element.value);
                }
            }

            // If still undefined
            if (value === undefined) {
                // Set to the default custom control value (it still may not exist)
                value = element[attribute];
            }

            // If value is not undefined (we translated it)
            if (value !== undefined) {
                // Set input data
                data[propertyName] = value;
            }
        }

        // Return the name of the attribute we used to get/set the form element input data
        return attribute;
    }

    /**
     * Translate form to data of type text. The form has a text attribute.
     * @param {string} propertyType The type of the property to translate to.
     * @param {string} elementValue The element's attribate value.
     * @return {*} The translated value in the data's property type or nearest to it.
     */
    _translateFormToDataByText(propertyType, elementValue) {
        // Switch on the property type
        switch (propertyType) {
            case 'string':
                return elementValue.trim();
            case 'number': {
                if (elementValue.length === 0) return 0;
                if (elementValue.indexOf('.') !== -1) return parseFloat(elementValue);
                if (elementValue.indexOf('e') !== -1) return parseFloat(elementValue);
                return parseInt(elementValue);
            }
            case 'boolean': {
                const lowerCase = elementValue.toLowerCase();
                if (lowerCase === 'true') return true;
                if (lowerCase === 'false') return false;
                return false;
            }
            default:
                return elementValue;
        }
    }

    /**
     * Translate form to data of type boolean.
     * @param {string} propertyType The type of the property to translate to.
     * @param {boolean} elementValue The element's attribate value.
     * @return {*} The translated value in the data's property type or nearest to it.
     */
    _translateFormToDataByBoolean(propertyType, elementValue) {
        // Switch on the property type
        switch (propertyType) {
            case 'string':
                if (elementValue === true) return 'true';
                if (elementValue === false) return 'false';
                return '';
            case 'number': {
                if (elementValue === true) return 1;
                if (elementValue === false) return 0;
                return -1;
            }
            case 'boolean': {
                if (elementValue === true) return true;
                if (elementValue === false) return false;
                return false;
            }
            default:
                return elementValue;
        }
    }

    /**
     * Translate data to form of type text. The form wants a text attribute.
     * @param {string} propertyType The type of the data property to translate from.
     * @param {*} dataValue The data's property value.
     * @return {*} The translated value for the attribute.
     */
    _translateDataToFormByText(propertyType, dataValue) {
        switch (propertyType) {
            case 'string':
                return dataValue;
            case 'number':
                return dataValue.toString();
            case 'boolean':
                if (dataValue === true) return 'true';
                if (dataValue === false) return 'false';
                return 'false';
            default:
                return dataValue;
        }
    }

    /**
     * Translate data to form of type boolean. The form wants a boolean attribute.
     * @param {string} propertyType The type of the data property to translate from.
     * @param {*} dataValue The data's property value.
     * @return {*} The translated value in the property type or nearest to it.
     */
    _translateDataToFormByBoolean(propertyType, dataValue) {
        switch (propertyType) {
            case 'string':
                if (dataValue.toLowerCase() === 'true') return true;
                if (dataValue.toLowerCase() === 'false') return false;
                return '';
            case 'number':
                if (dataValue === 0) return false;
                if (dataValue === 1) return true;
                return -1;
            case 'boolean':
                return dataValue;
            default:
                return dataValue;
        }
    }

    /**
     * Convert the given string into a Date object. This uses local date time values (not UTC). You
     * can keep the current time and only change the date parts.
     * @param {string} dateText The date in either YYYY-MM-DD or YYYY-MM-DDTHH:MM format.
     * @param {Date=} time The time part to use when setting the new Date object.
     * @return {Date} The converted date or undefined if there was an error.
     */
    _convertStringToDate(dateText, time) {
        // Check parameter
        if (dateText === undefined) return undefined;
        if (dateText.length === 0) return time;
        if (dateText.length !== 10 && dateText.length !== 16) return undefined;
        if (dateText.charAt(4) !== '-') return undefined;
        if (dateText.charAt(7) !== '-') return undefined;
        if (dateText.length === 16) {
            if (dateText.charAt(10) !== 'T') return undefined;
            if (dateText.charAt(13) !== ':') return undefined;
        }

        // Set date parts
        const year = parseInt(dateText.substr(0, 4));
        const month = parseInt(dateText.substr(5, 2));
        const day = parseInt(dateText.substr(8, 2));
        let hour = 0;
        let minute = 0;
        let second = 0;
        if (dateText.length === 16) {
            hour = parseInt(dateText.substr(11, 2));
            minute = parseInt(dateText.substr(14, 2));
        }

        // If there is a time part to use
        if (time !== undefined) {
            // Get the time parts from the time object
            hour = time.getHours();
            minute = time.getMinutes();
            second = time.getSeconds();
        }

        // Create date object
        const date = new Date(year, month - 1, day, hour, minute, second);

        // Return the date
        return date;
    }

    /**
     * Convert the date into a string. This can include the time parts. This uses local timezone (not UTC).
     * @param {Date} date The date to convert.
     * @param {boolean} includeTime Should the string include time parts.
     * @return {string} The date in YYYY-MM-DD or YYYY-MM-DDTHH:MM format.
     */
    _convertDateToString(date, includeTime) {
        // Get date parts
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        // Set year text
        const yearText = year.toString();

        // Set month text
        let monthText = month.toString();
        if (monthText.length === 1) monthText = '0' + monthText;

        // Set day text
        let dayText = day.toString();
        if (dayText.length === 1) dayText = '0' + dayText;

        // Set hour text
        let hourText = hour.toString();
        if (hourText.length === 1) hourText = '0' + hourText;

        // Set minute text
        let minuteText = minute.toString();
        if (minuteText.length === 1) minuteText = '0' + minuteText;

        // Set date text
        let dateText = yearText + '-' + monthText + '-' + dayText;

        // If including the time parts
        if (includeTime === true) dateText += 'T' + hourText + ':' + minuteText;

        // Return the date text
        return dateText;
    }

    /**
     * Convert the time into a string.
     * @param {Date} date The date that contains the time parts that will be converted into a string.
     * @return {string} The time as a string in the format hh:mm:ss (24 hour clock style).
     */
    _convertTimeToString(date) {
        // Get date parts
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        // Set hour text
        let hourText = hour.toString();
        if (hourText.length === 1) hourText = '0' + hourText;

        // Set minute text
        let minuteText = minute.toString();
        if (minuteText.length === 1) minuteText = '0' + minuteText;

        // Set second text
        let secondText = second.toString();
        if (secondText.length === 1) secondText = '0' + secondText;

        // Set time text
        const timeText = hourText + ':' + minuteText + ':' + secondText;

        // Return the time text
        return timeText;
    }

    /**
     * Convert the given string into a Date object. This uses local date time values (not UTC). You can keep
     * the current date and only change the time parts.
     * @param {string} timeText The time in either hh:mm or hh:mm:ss format.
     * @param {Date} date The date part to use when setting the new Date object.
     * @return {Date} The converted date or undefined if there was an error.
     */
    _convertStringToTime(timeText, date) {
        // Check parameter
        if (timeText === undefined) return undefined;
        if (timeText.length === 0) return date;
        if (timeText.length !== 5 && timeText.length !== 8) return undefined;
        if (timeText.charAt(2) !== ':') return undefined;
        if (timeText.length === 8) {
            if (timeText.charAt(5) !== ':') return undefined;
        }

        // Set time parts
        const hour = parseInt(timeText.substr(0, 2));
        const minute = parseInt(timeText.substr(3, 2));
        let second = 0;
        if (timeText.length === 8) second = parseInt(timeText.substr(6, 2));

        // Set date parts
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Create date object
        const time = new Date(year, month - 1, day, hour, minute, second);

        // Return the time
        return time;
    }

    /**
     * Convert the month into a string.
     * @param {Date} date The date that contains the month parts that will be converted into a string.
     * @return {string} The month as a string in the format YYYY-MM.
     */
    _convertMonthToString(date) {
        // Get date parts
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        // Set year text
        const yearText = year.toString();

        // Set month text
        let monthText = month.toString();
        if (monthText.length === 1) monthText = '0' + monthText;

        // Set date text
        const dateText = yearText + '-' + monthText;

        // Return the date text
        return dateText;
    }

    /**
     * Convert the given string into a Date object. This uses local date time values (not UTC). You can keep
     * the current day and time and only change the year and month parts.
     * @param {string} monthText The month in YYYY-MM format.
     * @param {Date} date The day and time parts to use when setting the new Date object.
     * @return {Date} The converted date or undefined if there was an error.
     */
    _convertStringToMonth(monthText, date) {
        // Check parameter
        if (monthText === undefined) return undefined;
        if (monthText.length === 0) return date;
        if (monthText.length !== 7) return undefined;
        if (monthText.charAt(4) !== '-') return undefined;

        // Set month parts
        const year = parseInt(monthText.substr(0, 4));
        const month = parseInt(monthText.substr(5, 2));
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        // Create date object
        const newDate = new Date(year, month - 1, day, hour, minute, second);

        // Return the date
        return newDate;
    }
}
