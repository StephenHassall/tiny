import Route from "./../../tiny/route.js";

/**
 * Single page app route
 */
export default class SinglePageAppRoute extends Route {
    /**
     * 
     * @constructor
     */
    constructor() {
        // Call the super first
        super(import.meta.url);

        // Add route views
        this.add({
            path: '/view1',
            javaScriptPath: 'view1.js',
            controllerTagName: 'view1-controller'
        });
        this.add({
            path: '/view2/:param1',
            javaScriptPath: 'view2.js',
            controllerTagName: 'view2-controller'
        });
        this.add({
            path: '/view3/folder/:param1/:param2',
            javaScriptPath: 'view3.js',
            controllerTagName: 'view3-controller'
        });

        // Set default
        this.default({
            javaScriptPath: 'view-default.js',
            controllerTagName: 'view-default-controller'
        });
    }
}
 
// Define controller web component
customElements.define('single-page-app-route', SinglePageAppRoute);
