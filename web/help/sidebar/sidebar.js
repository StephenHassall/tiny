import Controller from "./../../tiny/controller.js";

/**
 * Sidebar controller
 */ 
export default class SidebarController extends Controller {
    /**
     * Sidebar controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'sidebar.html',
            cssPath: 'sidebar.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}

// Define controller web component
customElements.define('sidebar-controller', SidebarController);
