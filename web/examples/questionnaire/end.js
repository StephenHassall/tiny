import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import Route from "./../../tiny/route.js";
import Results from "./results.js";

/**
 * End
 */ 
export default class EndController extends Controller {
    /**
     * End controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'end.html',
            importMetaUrl: import.meta.url
        });

        // Set results object
        this.results = Results;
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template area and update for the first time
        this._templateArea = new Template('templateArea', this);
        this._templateArea.update();
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
customElements.define('end-controller', EndController);
