import Controller from "./../../../tiny/controller.js";

/**
 * Controller controller
 */ 
export default class ControllerController extends Controller {
    /**
     * Controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'controller.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('controller-controller', ControllerController);
