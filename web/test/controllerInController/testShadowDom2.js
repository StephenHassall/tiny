import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import TestShadowDom1 from "./testShadowDom1.js";

/**
 * Test Shadow DOM 2
 */ 
export default class TestShadowDom2Controller extends Controller {
    /**
     * Test Shadow Dom 2 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'testShadowDom2.html',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });

        // Set count
        this.count = 0;
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template area object
        this._templateArea = new Template('testShadowDom2', this);

        // Update the template area for the first time
        this._templateArea.update();
    }

    /**
     * Test button event.
     */
    test() {
        // Increate count
        this.count++;

        // Update the template area
        this._templateArea.update();
    }
}
 
// Define controller web component
customElements.define('test-shadow-dom-2-controller', TestShadowDom2Controller);
