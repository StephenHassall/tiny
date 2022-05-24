import Controller from "./../../../tiny/controller.js";

/**
 * Example lucky7 controller
 */ 
export default class ExampleLucky7Controller extends Controller {
    /**
     * Example lucky7 web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'example-lucky7.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('example-lucky7-controller', ExampleLucky7Controller);
