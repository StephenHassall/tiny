import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import SpecialTemplate from "./special-template.js";

/**
 * Template
 * 
 * This web component tests the Template class.
 */
export default class TemplateController extends Controller {
    /**
     * Template controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'template.html',
            cssPath: 'template.css',
            importMetaUrl: import.meta.url
        });

        // Set test variable
        this.a = 1;
        this.b = 2;
        this.c = 3;
        this.abc = 'hello world';
        this.color1 = 'red';
        this.color2 = 'green';
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template object
        this._template = new Template('templateTest', this);

        // Create special template object
        this._specialTemplate = new SpecialTemplate('specialTemplateTest', this);

        // Update the tempates for the first time
        this._template.update();
        this._specialTemplate.update();
    }

    /**
     * Test double function.
     * @param {number} value The value to double.
     * @return {number} The result of the value doubled.
     */
    double(value) {
        // Return the value amount doubled
        return value * value;
    }
}
 
// Define controller web component
customElements.define('template-controller', TemplateController);
