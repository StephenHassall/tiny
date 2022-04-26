import Controller from "./../../tiny/controller.js";
import Form from "./../../tiny/form.js";
import Template from "./../../tiny/template.js";
import TemplateArray from "./../../tiny/template-array.js";

/**
 * Todo List
 * 
 * This web component is an example of a todo list application.
 */
export default class TodoListController extends Controller {
    /**
     * Todo list controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'todo-list.html',
            cssPath: 'todo-list.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });

        // Create form data
        this._formData = {};
        this._formData.info = '';
        this._formData.done = false;

        // Set mode (0=blank, 1=add, 2=edit)
        this.mode = 0;

        // Set form valid
        this.formValid = false;

        // Set current todo
        this.currentTodo = null;

        // Set todo list
        this.todoList = [
            { info: 'Go outside into the real world.', done: false },
            { info: 'Read a book. Not a computer one.', done: true },
            { info: 'Take some time off.', done: false }
        ];
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create form (links form data to form inputs)
        this._form = new Form(this._formData, this);

        // Add form inputs
        this._form.add('info', 'formInfo');
        this._form.add('done', 'formDone');

        // Create button area template
        this._buttonAreaTemplate = new Template('buttonArea', this);
        this._buttonAreaTemplate.update();

        // Create form area template
        this._formAreaTemplate = new Template('formArea', this);
        this._formAreaTemplate.update();

        // Create todo list template
        this._todoListTemplate = new TemplateArray('todoListParent', 'todoListList', this.todoList, this);
        this._todoListTemplate.update();
    }

    /**
     * Checks to see if the inputted form data is valid.
     * @return {boolean} True if the form data is valid, otherwise false if not.
     */
    _isFormValid() {
        // Set default result value
        let result = true;

        // Get form data
        this._form.formToData();

        // Check form data is valid or not
        if (this._formData.info.length === 0) result = false;

        // Return the result
        return result;
    }

    /**
     * Form change event.
     */
    formChange() {
        // Check if the form is valid
        const result = this._isFormValid();

        // If the result is still the same
        if (result === this.formValid) return;

        // Update current form valid result
        this.formValid = result;

        // Update the button template
        this._buttonAreaTemplate.update();
    }

    /**
     * Cancel button click event.
     */
    cancel() {
        // Reset mode to blank
        this.mode = 0;

        // Update the areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();
    }

    /**
     * Add button click event.
     */
    add() {
        // Set mode to add
        this.mode = 1;

        // Reset form valid to invalid
        this.formValid = false;

        // Update the areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();

        // Clear the form inputs
        this._form.clear();
    }

    /**
     * Save button click event.
     */
    save() {
        // If the form data is not valid
        if (this._isFormValid() === false) return;

        // Create new todo item
        const todo = {
            info: this._formData.info,
            done: this._formData.done
        };

        // Add to list
        this.todoList.push(todo);

        // Reset mode to blank
        this.mode = 0;

        // Update the areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();

        // Update the list
        this._todoListTemplate.update();
    }

    /**
     * Select todo list item click event.
     * @param {string} indexText The index of the todo item that was selected. This is the text value of the index.
     */
    select(indexText) {
        // Set current todo
        this.currentTodo = this.todoList[parseInt(indexText)];

        // Set mode to edit
        this.mode = 2;

        // Set the form data to the current one
        this._formData.info = this.currentTodo.info;
        this._formData.done = this.currentTodo.done;

        // Set form valid to valid
        this.formValid = true;

        // Update areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();

        // Transfer the form data to the form inputs
        this._form.dataToForm();        
    }

    /**
     * Update button click event.
     */
    update() {
        // If the form data is not valid
        if (this._isFormValid() === false) return;

        // Update the current todo with the updated information
        this.currentTodo.info = this._formData.info;
        this.currentTodo.done = this._formData.done;

        // Reset mode to blank
        this.mode = 0;

        // Update the areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();

        // Update the list
        this._todoListTemplate.update();
    }

    /**
     * Delete button click event.
     */
    delete() {
        // Get the index of the current todo item
        const index = this.todoList.indexOf(this.currentTodo);

        // If not found
        if (index === -1) return;

        // Remove the todo item from the list
        this.todoList.splice(index, 1);

        // Reset mode to blank
        this.mode = 0;

        // Update the areas
        this._buttonAreaTemplate.update();
        this._formAreaTemplate.update();

        // Update the list
        this._todoListTemplate.update();
    }
}
 
// Define controller web component
customElements.define('todo-list-controller', TodoListController);
