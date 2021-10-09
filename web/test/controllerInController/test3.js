import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import Test2 from "./test2.js";

/**
 * Test 3
 */ 
export default class Test3Controller extends Controller {
    /**
     * Test 3 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'test3.html',
            importMetaUrl: import.meta.url,
            useShadowDom: false
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
        this._templateArea = new Template('test3', this);

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
customElements.define('test-3-controller', Test3Controller);
