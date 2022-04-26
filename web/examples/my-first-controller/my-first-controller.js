import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";

/**
 * MyFirstController
 * 
 * This is the JavaScript part of the controller. Here is where we controller what happens
 * in the controller.
 */
export default class MyFirstController extends Controller {
    /**
     * MyFirstController controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super to load the HTML and CSS parts
        super({
            htmlPath: 'my-first-controller.html',
            cssPath: 'my-first-controller.css',
            importMetaUrl: import.meta.url
        });

        // Set count value to zero
        this.count = 0;
    }

    /**
     * Override function to perform tasks after the controller has been loaded.
     */
    loadedCallback() {
        // Create template area
        this._templateArea = new Template('templateId', this);

        // Update the template area for the first time
        this._templateArea.update();
    }

    /**
     * Increase count event.
     */
    increaseCount() {
        // Increase the count value
        this.count++;

        // Update the template area
        this._templateArea.update();
    }
}
 
// Define controller web component
customElements.define('my-first-controller', MyFirstController);
