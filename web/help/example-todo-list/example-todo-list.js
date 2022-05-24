import Controller from "./../../../tiny/controller.js";

/**
 * Example todo list controller
 */ 
export default class ExampleTodoListController extends Controller {
    /**
     * Example todo list web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'example-todo-list.html',
            cssPath: './../help.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('example-todo-list-controller', ExampleTodoListController);
