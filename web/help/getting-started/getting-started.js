import Controller from "./../../../tiny/controller.js";

/**
 * Getting started controller
 */ 
export default class GettingStartedController extends Controller {
    /**
     * Getting started controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'getting-started.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('getting-started-controller', GettingStartedController);
