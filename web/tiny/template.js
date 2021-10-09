import Controller from './controller.js';

/**
 * Template
 *
 * Takes HTML from an element and uses it as a template to format/create HTML.
 */
export default class Template {
    /**
     * The Template constructor function.
     * @param {string} elementId The id of the element that contains the string template literals.
     * @param {Controller}controller Any web component derived from the Tiny Web Application Framework Controller class.
     */
    constructor(elementId, controller) {
        // Check parameters
        if (typeof elementId !== 'string') throw new Error('Template constructor parameter elementId is not a string');
        if (elementId.length === 0) throw new Error('Template constructor parameter elementId cannot be empty');
        if (!(controller instanceof Controller)) throw new Error('Template constructor parameter controller is not derived from Tiny Web Application Framework Controller class');

        // Set element id
        this._elementId = elementId;

        // Set controller
        this._controller = controller;

        // Get the element
        const element = this._controller.getElementById(this._elementId);

        // If not found
        if (element === null) throw new Error('Element is missing ' + this._elementId);

        // Set the template HTML, which will be the element's outer HTML.
        this._templateHtml = element.outerHTML;

        // Hide the element for now. It will be shown when the update function is called
        element.style.visibility = 'hidden';

        // Set empty template function
        this._templateFunction = null;
    }

    /**
     * Update the element with any updated controller data changes. This performs a template format to
     * create a new HTML to use.
     */
    update() {
        // Get the element
        const element = this._controller.getElementById(this._elementId);

        // If not found
        if (element === null) throw new Error('Element is missing ' + this._elementId);

        // If no template function exists yet
        if (this._templateFunction === null) {
            // Format the template HTML
            const formattedTemplateHtml = Template._formatTemplateHtml(this._templateHtml);
            
            try {
                // Create and set the template function
                this._templateFunction = new Function('return `' + formattedTemplateHtml + '`;');
            } catch (error) {
                // Log the invalid formatted template HTML
                console.error(formattedTemplateHtml);

                // Throw the error
                throw error;
            }

            // Show the element. We only show it after the first update
            element.style.visibility = 'visible';
        }

        // Use the template function to format the HTML
        let html = this._templateFunction.call(this._controller);

        // Perform the extra formatting required
        html = this.extraFormat(html);
        html = Template._defaultExtraFormat(html);

        // Set the elements outer HTML to the final formatted HTML
        element.outerHTML = html;
    }

    /**
     * You can create our own class deprived from Template and then override this function to perform any
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
        if (Template._regexTinyAttribute) return;

        // Create regex parts
        Template._regexTemplate = RegExp('\\$\\{(.+)\\}', 'g');
        Template._regexEntities = RegExp('(&amp;)|(&#38;)|(&lt;)|(&#60;)|(&gt;)|(&#62;)', 'gi');
        Template._regexTinyAttribute = RegExp('tiny-([^<\\s]\\S+)(="[^"]*")', 'g');        
    }

    /**
     * Format the template HTML. The HTML will properly have changed some special characters, & into &amp, for example, so
     * we need to check it and make corrections.
     * @param {string} html The template HTML to format.
     * @return {string} The formatted template HTML.
     */
    static _formatTemplateHtml(html) {
        // Check regex is setup
        Template._checkRegex();

        // Replace all the ${...} parts
        let result = html.replace(Template._regexTemplate, function(fullMatch, group1) {
            // Replace all the special characters we will properly see inside
            let formatString = group1.replace(Template._regexEntities, function (fullMatch, amp1, amp2, lessThan1, lessThan2, greaterThan1, greaterThan2) {
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
        Template._checkRegex();

        // Look for tiny-[attribute]="[data]" parts and replacing them. If the data part is blank then
        // the whole attribute is removed. If there is data then the attribute is added without the
        // starting "tiny-" part.

        // Replace all the tiny-[attribute]=".." parts
        let result = html.replace(Template._regexTinyAttribute, function (fullMatch, group1, group2) {
            // If there is no data inside the attribute then remove the attribute altogether
            if (group2.length === 3) return '';

            // Return the attribute with its data but without the starting "tiny-" part
            return group1 + group2;
        });

        // Return the result
        return result;
    }
}
