import Controller from "./../../tiny/controller.js";
import Route from "./../../tiny/route.js";
import Results from "./results.js";

/**
 * Question 3
 */ 
export default class Question3Controller extends Controller {
    /**
     * Question 3 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'question3.html',
            importMetaUrl: import.meta.url
        });
    }

    /**
     * Answer event.
     * @param {number} result The resulting answer.
     */
    answer(result) {
        // Set the answer given
        Results.question3 = result;

        // Go to the end view
        Route.gotoView('/end');
    }
}
 
// Define controller web component
customElements.define('question3-controller', Question3Controller);
