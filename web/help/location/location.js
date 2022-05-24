import Controller from "./../../../tiny/controller.js";

/**
 * Location controller
 */ 
export default class LocationController extends Controller {
    /**
     * Location web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'location.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('location-controller', LocationController);
