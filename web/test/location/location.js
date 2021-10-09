import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import Location from "./../../tiny/location.js";

/**
 * Location
 * 
 * This web component tests the Location class.
 */
export default class LocationController extends Controller {
    /**
     * Location controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'location.html',
            cssPath: 'location.css',
            importMetaUrl: import.meta.url
        });

        // Set location members
		this.href = '';
		this.protocol = '';
		this.host = '';
		this.hostname = '';
		this.port = '';
		this.pathname = '';
		this.search = '';
		this.hash = '';
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Reset location members
		this.href = Location.href;
		this.protocol = Location.protocol;
		this.host = Location.host;
		this.hostname = Location.hostname;
		this.port = Location.port;
		this.pathname = Location.pathname;
		this.search = Location.search;
		this.hash = Location.hash;

        // Log search params
        console.log(Location.searchParams());

        // Create template area object
        this._templateArea = new Template('templateArea', this);

        // Update the template area for the first time
        this._templateArea.update();
    }

    /**
     * Update button event.
     */
    update() {
        // Reset location members
		this.href = Location.href;
		this.protocol = Location.protocol;
		this.host = Location.host;
		this.hostname = Location.hostname;
		this.port = Location.port;
		this.pathname = Location.pathname;
		this.search = Location.search;
		this.hash = Location.hash;

        // Log search params
        console.log(Location.searchParams());

        // Update the template area with the new values
        this._templateArea.update();
    }
}
 
// Define controller web component
customElements.define('location-controller', LocationController);
