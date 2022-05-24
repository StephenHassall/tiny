import Controller from "./../../../tiny/controller.js";

/**
 * Limitations controller
 */ 
export default class LimitationsController extends Controller {
    /**
     * Limitations web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'limitations.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('limitations-controller', LimitationsController);
