import Controller from "./../../tiny/controller.js";
import Route from "./../../tiny/route.js";
import Results from "./results.js";

/**
 * Question 2
 */ 
export default class Question2Controller extends Controller {
    /**
     * Question 2 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'question2.html',
            importMetaUrl: import.meta.url
        });
    }

    /**
     * Answer event.
     * @param {number} result The resulting answer.
     */
    answer(result) {
        // Set the answer given
        Results.question2 = result;

        // Go to the next question view
        Route.gotoView('/question3');
    }
}
 
// Define controller web component
customElements.define('question2-controller', Question2Controller);
