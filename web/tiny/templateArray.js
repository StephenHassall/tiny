import Controller from './controller.js';

/**
 * Template Array
 *
 * Takes an array of items, the HTML inside an element as string template literal, and creates a list of formatted HTML.
 *
 * <element id="parentPart">
 * ...
 *   <element id="listPart">
 *      ... repeated for each item in array
 *   </element>
 * ...
 * </element>
 */
export default class TemplateArray {
    /**
     * The TemplateArray constructor function.
     * @param {string} parentElementId The id of the element that contains the parent parts. If unused then set to undefined.
     * @param {string} listElementId The id of the element that contains the list parts.
     * @param {Object[]} array An array of items that are shown.
     * @param {Controller} controller Any web component derived from the Tiny Web Application Framework Controller class.
     */
    constructor(parentElementId, listElementId, array, controller) {
        // Check parameters
        if (typeof listElementId !== 'string') throw new Error('TemplateArray constructor parameter listElementId is not a string');
        if (listElementId.length === 0) throw new Error('TemplateArray constructor parameter listElementId cannot be empty');
        if (parentElementId !== undefined) {
            if (typeof parentElementId !== 'string') throw new Error('TemplateArray constructor parameter parentElementId is given but is not a string');
            if (parentElementId.length === 0) throw new Error('TemplateArray constructor parameter parentElementId is given but cannot be empty');
            if (listElementId.toLowerCase() === parentElementId.toLowerCase()) throw new Error('TemplateArray constructor parameter parentElementId and listElementId cannot be the same');
        }
        if (Array.isArray(array) === false) throw new Error('TemplateArray constructor parameter array is not an array');
        if (!(controller instanceof Controller)) throw new Error('TemplateArray constructor parameter controller is not derived from Tiny Web Application Framework Controller class');

        // Set parent element id
        this._parentElementId = parentElementId;

        // Set list element id
        this._listElementId = listElementId;

        // Set array
        this._array = array;

        // Set the controller
        this._controller = controller;

        // Set elements
        let listElement = undefined;
        let parentElement = undefined;

        // If there is a parent element
        if (this._parentElementId !== undefined) {
            // Get the parent element
            parentElement = this._controller.getElementById(this._parentElementId);

            // If not found
            if (parentElement === null) throw new Error('Parent element is missing ' + this._parentElementId);

            // Get the list element
            listElement = parentElement.querySelector('#' + this._listElementId);
        } else {
            // Get the list element
            listElement = this._controller.getElementById(this._listElementId);
        }

        // If list element not found
        if (listElement === null) throw new Error('List element is missing or is not inside its parent element. ' + this._listElementId);

        // Set the list template HTML. This is the inner HTML that contains the template formatting
        this._listTemplateHtml = listElement.innerHTML;

        // Clear the list element inner HTML
        listElement.innerHTML = '';

        // If there is a parent element
        if (this._parentElementId !== undefined) {
            // Set the parent template HTML. This is the outer HTML that contains the template formatting (but not the list parts)
            this._parentTemplateHtml = parentElement.outerHTML;

            // Hide the parent element for now. It will be shown when the update function is called
            parentElement.style.visibility = 'hidden';
        }

        // Hide the list element for now. It will be shown when the update function is called
        listElement.style.visibility = 'hidden';

        // Set empty template functions
        this._parentTemplateFunction = null;
        this._listTemplateFunction = null;
    }

    /**
     * Reset the array of items to use.
     * @param {Object[]} array An array of items that are shown.
     */
    reset(array) {
        // Check parameters
        if (Array.isArray(array) === false) throw new Error('TemplateArray reset parameter array is not an array');

        // Reset the array
        this._array = array;
    }

    /**
     * Update the element by recreating the list of items using the HTML formatting.
     */
    update() {
        // If there is a parent element
        if (this._parentElementId !== undefined) this._updateParent();

        // Update list
        this._updateList();
    }

    /**
     * Update the parent element with any updated controller data changes.
     */
    _updateParent() {
        // Get the element
        const parentElement = this._controller.getElementById(this._parentElementId);

        // If not found
        if (parentElement === null) throw new Error('Parent element is missing ' + this._parentElementId);

        // If no parent template function exists yet
        if (this._parentTemplateFunction === null) {
            // Format the template HTML
            const formattedTemplateHtml = TemplateArray._formatTemplateHtml(this._parentTemplateHtml);
            
            try {
                // Create and set the parent template function
                this._parentTemplateFunction = new Function('return `' + formattedTemplateHtml + '`;');
            } catch (error) {
                // Log the invalid formatted template HTML
                console.error(formattedTemplateHtml);

                // Throw the error
                throw error;
            }

            // Show the element. We only show it after the first update
            parentElement.style.visibility = 'visible';
        }

        // Use the parent template function to format the HTML
        let html = this._parentTemplateFunction.call(this._controller);

        // Perform the extra formatting required
        html = this.extraFormat(html);
        html = TemplateArray._defaultExtraFormat(html);

        // Set the elements outer HTML to the final formatted HTML
        parentElement.outerHTML = html;
    }

    /**
     * Update the element by recreating the list of items using the HTML formatting.
     */
    _updateList() {
        // Get the element
        const listElement = this._controller.getElementById(this._listElementId);

        // If not found
        if (listElement === null) throw new Error('List element is missing ' + this._listElementId);

        // If no list template function exists yet
        if (this._listTemplateFunction === null) {
            // Format the template HTML
            const formatTemplateHtml = TemplateArray._formatTemplateHtml(this._listTemplateHtml);

            try {
                // Create and set the list template function
                this._listTemplateFunction = new Function('item', 'index', 'return `' + formatTemplateHtml + '`;');
            } catch (error) {
                // Log the invalid formatted item HTML
                console.error(formatTemplateHtml);

                // Throw the error
                throw error;
            }

            // Show the element. We only show it after the first update
            listElement.style.visibility = 'visible';
        }

        // Set the html list
        const htmlList = [];

        // For each array item
        for (let index = 0; index < this._array.length; index++) {
            // Get item
            const item = this._array[index];

            // Use the list template function to format the HTML for this item
            const html = this._listTemplateFunction.call(this._controller, item, index);

            // Add to HTML list
            htmlList.push(html);
        }

        // Set combined HTML
        let html = htmlList.join('');

        // Perform the extra formatting required
        html = this.extraFormat(html);
        html = TemplateArray._defaultExtraFormat(html);

        // Add all the formatted HTML to the inner HTML of the element
        listElement.innerHTML = html
    }

    /**
     * You can create our own class deprived from TemplateArray and then override this function to perform any
     * extra HTML formatting. This is done after the template function has be called and the final HTML is
     * created, but before it is inserted into the element.
     * @param {string} html The HTML that needs extra formatting.
     * @return {string} The HTML with extra formatting.
     */
    extraFormat(html) {
        // Just return the HTML with no extra formatting
        return html;
    }

    // Set static regex
    static _regexTemplate;
    static _regexEntities;
    static _regexTinyAttribute;

    /**
     * Check the regex parts have been created.
     */
    static _checkRegex() {
        // If static regex parts have been created
        if (TemplateArray._regexTinyAttribute) return;

        // Create regex parts
        TemplateArray._regexTemplate = RegExp('\\$\\{(.+)\\}', 'g');
        TemplateArray._regexEntities = RegExp('(&amp;)|(&#38;)|(&lt;)|(&#60;)|(&gt;)|(&#62;)', 'gi');
        TemplateArray._regexTinyAttribute = RegExp('tiny-([^<\\s]\\S+)(="[^"]*")', 'g');        
    }

    /**
     * Format the template HTML. The HTML will properly have changed some special characters, & into &amp, for example, so
     * we need to check it and make corrections.
     * @param {string} html The template HTML to format.
     * @return {string} The formatted template HTML.
     */
    static _formatTemplateHtml(html) {
        // Check regex is setup
        TemplateArray._checkRegex();

        // Replace all the ${...} parts
        let result = html.replace(TemplateArray._regexTemplate, function(fullMatch, group1) {
            // Replace all the special characters we will properly see inside
            let formatString = group1.replace(TemplateArray._regexEntities, function (fullMatch, amp1, amp2, lessThan1, lessThan2, greaterThan1, greaterThan2) {
                // Replace the special characters with what we entered in the first place
                if (amp1) return '&';
                if (amp2) return '&';
                if (lessThan1) return '<';
                if (lessThan2) return '<';
                if (greaterThan1) return '>';
                if (greaterThan2) return '>';
                return fullMatch;
            });

            // Return the formatted string
            return '${' + formatString + '}';
        });
        
        // Return the result
        return result;
    }

    /**
     * The default extra formatting.
     * @param {string} html The HTML that the template function created.
     * @return {string} The final HTML to show.
     */
    static _defaultExtraFormat(html) {
        // Check regex is setup
        TemplateArray._checkRegex();

        // Look for tiny-[attribute]="[data]" parts and replacing them. If the data part is blank then
        // the whole attribute is removed. If there is data then the attribute is added without the
        // starting "tiny-" part.

        // Replace all the tiny-[attribute]=".." parts
        let result = html.replace(TemplateArray._regexTinyAttribute, function (fullMatch, group1, group2) {
            // If there is no data inside the attribute then remove the attribute altogether
            if (group2.length === 3) return '';

            // Return the attribute with its data but without the starting "tiny-" part
            return group1 + group2;
        });

        // Return the result
        return result;
    }    
}
