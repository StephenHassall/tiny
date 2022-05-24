import Controller from "./../../tiny/controller.js";

/**
 * Privacy controller
 */ 
export default class PrivacyController extends Controller {
    /**
     * Privacy controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'privacy.html',
            cssPath: 'privacy.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });

    }
}
 
// Define controller web component
customElements.define('privacy-controller', PrivacyController);
