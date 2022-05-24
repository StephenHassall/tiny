import Controller from "./../../../tiny/controller.js";

/**
 * Route controller
 */ 
export default class RouteController extends Controller {
    /**
     * Route web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'route.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('route-controller', RouteController);
