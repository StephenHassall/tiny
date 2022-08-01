import Controller from "./../../tiny/controller.js";
import "./../../dollar-ring.js";

/**
 * Footer controller
 */ 
export default class FooterController extends Controller {
    /**
     * Footer controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'footer.html',
            cssPath: 'footer.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}

// Define controller web component
customElements.define('footer-controller', FooterController);
