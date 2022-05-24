import Controller from "./../../../tiny/controller.js";

/**
 * Example questionnaire controller
 */ 
export default class ExampleQuestionnaireController extends Controller {
    /**
     * Example questionnaire web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'example-questionnaire.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('example-questionnaire-controller', ExampleQuestionnaireController);
