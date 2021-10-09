import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";

/**
 * Test Shadow DOM 1
 */ 
export default class TestShadowDom1Controller extends Controller {
    /**
     * Test Shadow DOM 1 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'testShadowDom1.html',
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
        this._templateArea = new Template('testShadowDom1', this);

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
customElements.define('test-shadow-dom-1-controller', TestShadowDom1Controller);
