import Controller from "./../../tiny/controller.js";

/**
 * Home controller
 */ 
export default class HomeController extends Controller {
    /**
     * Home controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'home.html',
            cssPath: 'home.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });

    }
}
 
// Define controller web component
customElements.define('home-controller', HomeController);
