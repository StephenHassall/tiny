import Controller from "./../../../tiny/controller.js";

/**
 * Template array controller
 */ 
export default class TemplateArrayController extends Controller {
    /**
     * Template array web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'template-array.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('template-array-controller', TemplateArrayController);
