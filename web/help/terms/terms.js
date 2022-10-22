import Controller from "./../../../tiny/controller.js";

/**
 * Terms controller
 */ 
export default class TermsController extends Controller {
    /**
     * Terms controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'terms.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('terms-controller', TermsController);
