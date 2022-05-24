import Controller from "./../../tiny/controller.js";

/**
 * Header controller
 */ 
export default class HeaderController extends Controller {
    /**
     * Header controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'header.html',
            cssPath: 'header.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }

}
 
// Define controller web component
customElements.define('header-controller', HeaderController);
