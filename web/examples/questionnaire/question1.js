import Controller from "./../../tiny/controller.js";
import Route from "./../../tiny/route.js";
import Results from "./results.js";

/**
 * Question 1
 */ 
export default class Question1Controller extends Controller {
    /**
     * Question 1 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'question1.html',
            importMetaUrl: import.meta.url
        });
    }

    /**
     * Answer event.
     * @param {number} result The resulting answer.
     */
    answer(result) {
        // Set the answer given
        Results.question1 = result;

        // Go to the next question view
        Route.gotoView('/question2');
    }
}
 
// Define controller web component
customElements.define('question1-controller', Question1Controller);
