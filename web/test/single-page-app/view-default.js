import Controller from "./../../tiny/controller.js";

/**
 * View Default
 */ 
export default class ViewDefaultController extends Controller {
    /**
     * View default controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'view-default.html',
            importMetaUrl: import.meta.url
        });
    }
}
 
// Define controller web component
customElements.define('view-default-controller', ViewDefaultController);
