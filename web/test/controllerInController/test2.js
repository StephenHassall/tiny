import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import Test1 from "./test1.js";

/**
 * Test 2
 */ 
export default class Test2Controller extends Controller {
    /**
     * Test 2 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'test2.html',
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
        this._templateArea = new Template('test2', this);

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
customElements.define('test-2-controller', Test2Controller);
