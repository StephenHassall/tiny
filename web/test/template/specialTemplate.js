import Template from './../../tiny/template.js';

/**
 * Special Template
 * 
 * This derives from the Template class to add extra formatting.
 */
export default class SpecialTemplate extends Template {
    // Set regex special
    static _regexSpecial;

    /**
     * Override the extra format function to perform extra formatting.
     * @param {string} html The HTML that needs extra formatting.
     * @return {string} The HTML with extra formatting.
     * @override
     */
    extraFormat(html) {
        // If regex special not created yet
        if (!SpecialTemplate._regexSpecial) {
            // Create regex special
            SpecialTemplate._regexSpecial = RegExp('special-highlight="([^"]*)"', 'g');
        }

        // Replace all the tiny-show=".." parts
        let result = html.replace(SpecialTemplate._regexSpecial, function (fullMatch, group1) {
            // If group1 is true
            if (group1 === 'true') {
                return 'style="background-color: gold;"';
            }

            // Otherwise return nothing
            return '';
        });

        // Return the result
        return result;
    }
}