import Controller from "./../../../tiny/controller.js";

/**
 * License controller
 */ 
export default class LicenseController extends Controller {
    /**
     * License controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'license.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('license-controller', LicenseController);
