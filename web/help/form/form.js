import Controller from "./../../../tiny/controller.js";

/**
 * Form controller
 */ 
export default class FormController extends Controller {
    /**
     * Form web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'form.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('form-controller', FormController);
