import Controller from "./../../../tiny/controller.js";

/**
 * Introduction controller
 */ 
export default class IntroductionController extends Controller {
    /**
     * Introduction web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'introduction.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('introduction-controller', IntroductionController);
