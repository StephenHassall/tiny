import Route from "./../../tiny/route.js";
import Results from "./results.js";

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
            path: '/question1',
            javaScriptPath: 'question1.js',
            controllerTagName: 'question1-controller'
        });
        this.add({
            path: '/question2',
            javaScriptPath: 'question2.js',
            controllerTagName: 'question2-controller'
        });
        this.add({
            path: '/question3',
            javaScriptPath: 'question3.js',
            controllerTagName: 'question3-controller'
        });
        this.add({
            path: '/end',
            javaScriptPath: 'end.js',
            controllerTagName: 'end-controller'
        });
        this.add({
            path: '/error',
            javaScriptPath: 'error.js',
            controllerTagName: 'error-controller'
        });

        // Add default view
        this.default({
            javaScriptPath: 'error.js',
            controllerTagName: 'error-controller'
        });
    }

    /**
     * Override the beforeLoad function to do some checks before loading the questions.
     * @param {Object} route The route object containing information about the view that is about to be shown.
     * @return {boolean} True means you are happy to load in the route view. False means do nothing. You will need to go to a different page.
     */
    beforeLoad(route) {
        // Set error
        let error = false;

        // Check for errors
        if (route.path === '/question2' && Results.question1 === -1) error = true;
        if (route.path === '/question3' && Results.question2 === -1) error = true;
        if (route.path === '/end' && Results.question3 === -1) error = true;

        // If there is no error
        if (error === false) return true;

        // Set to go to error page
        Route.gotoView('/error');

        // Return error
        return false;
    }
}
 
// Define controller web component
customElements.define('single-page-app-route', SinglePageAppRoute);
