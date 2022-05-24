import Controller from "./../../../tiny/controller.js";

/**
 * Release notes controller
 */ 
export default class ReleaseNotesController extends Controller {
    /**
     * Release notes web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'release-notes.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('release-notes-controller', ReleaseNotesController);
