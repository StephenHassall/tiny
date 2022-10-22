import Controller from "./../../tiny/controller.js";
import "./../../icon/dollar-ring.js";
import "./../../icon/bug-fill.js";
import "./../../icon/file1-angle-brackets.js";
import "./../../icon/play-ring.js";

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
