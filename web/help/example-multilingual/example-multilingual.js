import Controller from "./../../../tiny/controller.js";

/**
 * Example Multilingual controller
 */ 
export default class ExampleMultilingualController extends Controller {
    /**
     * Example Multilingual web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'example-multilingual.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('example-multilingual-controller', ExampleMultilingualController);
