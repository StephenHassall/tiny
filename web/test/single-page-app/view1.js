import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import Route from "./../../tiny/route.js";
import GlobalService from "./global-service.js";

/**
 * View 1
 */ 
export default class View1Controller extends Controller {
    /**
     * View 1 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'view1.html',
            importMetaUrl: import.meta.url
        });

        // Set global service so the format area can see it
        this.globalService = GlobalService;

        // Set local view count
        this.localViewCount = 0;
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template area object
        this._templateArea = new Template('templateArea', this);

        // Update the template area for the first time
        this._templateArea.update();
    }

    /**
     * Update the template area values.
     */
    update() {
        // Update the template area
        this._templateArea.update();
    }

    /**
     * Add local view count event.
     */
    addLocalViewCount() {
        // Increase the local page count
        this.localViewCount++;

        // Update the template area
        this._templateArea.update();
    }

    /**
     * Minus local view count event.
     */
    minusLocalViewCount() {
        // Decrease the local view count
        this.localViewCount--;

        // Update the template area
        this._templateArea.update();
    }

    /**
     * Go to view event
     * @param {number} view The view number to go to.
     */
    gotoView(view) {
        // If view 1
        if (view === 1) Route.gotoView('/view1');

        // If view 2
        if (view === 2) Route.gotoView('/view2/' + this.localViewCount.toString());

        // If view 3
        if (view === 3) Route.gotoView('/view3/folder/' + this.localViewCount.toString() + '/' + GlobalService.globalCount.toString());
    }
}
 
// Define controller web component
customElements.define('view1-controller', View1Controller);
