import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";

/**
 * Test Shadow DOM 3
 */ 
export default class TestShadowDom3Controller extends Controller {
    /**
     * Test Shadow DOM 3 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'test-shadow-dom3.html',
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
        this._templateArea = new Template('testShadowDom3', this);

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
customElements.define('test-shadow-dom-3-controller', TestShadowDom3Controller);
