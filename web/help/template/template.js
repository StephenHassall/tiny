import Controller from "./../../../tiny/controller.js";

/**
 * Template controller
 */ 
export default class TemplateController extends Controller {
    /**
     * Template web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'template.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('template-controller', TemplateController);
