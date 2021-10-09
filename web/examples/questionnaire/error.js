import Controller from "./../../tiny/controller.js";
import Route from "./../../tiny/route.js";

/**
 * Error
 */ 
export default class ErrorController extends Controller {
    /**
     * Error controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'error.html',
            importMetaUrl: import.meta.url
        });
    }

    /**
     * Restart event.
     */
    restart() {
        // Go to the first question view
        Route.gotoView('/question1');
    }
}
 
// Define controller web component
customElements.define('error-controller', ErrorController);
