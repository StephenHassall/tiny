import Controller from "./../../../tiny/controller.js";

/**
 * Example simple list controller
 */ 
export default class ExampleSimpleListController extends Controller {
    /**
     * Example simple list web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'example-simple-list.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('example-simple-list-controller', ExampleSimpleListController);
