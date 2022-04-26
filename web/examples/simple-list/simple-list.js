import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";
import TemplateArray from "./../../tiny/template-array.js";

/**
 * Simple List
 * 
 * This web component shows how the TemplateArray class is used to set a list of HTML text areas using
 * string templates.
 */
export default class SimpleListController extends Controller {
    /**
     * Simple List controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'simple-list.html',
            cssPath: 'simple-list.css',
            importMetaUrl: import.meta.url
        });

        // Create a sample list
        this._list = [
            { id: 0, name: 'Alton McDermott', age: 23 },
            { id: 1, name: 'Kwabena Vance', age: 47 },
            { id: 2, name: 'Shyla Carney', age: 59 },
            { id: 3, name: 'Jared Keller', age: 17 },
            { id: 4, name: 'Annabelle North', age: 34 },
            { id: 5, name: 'Lena Zhang', age: 21 },
            { id: 6, name: 'Bernice Mayo', age: 21 },
            { id: 7, name: 'Milton Fitzgerald', age: 40 },
            { id: 8, name: 'Samiyah Orozco', age: 65 },
            { id: 9, name: 'Arielle Alfaro', age: 39 }
        ];

        // Set sort field and direction
        this.sortField = 'name';
        this.sortDirection = 'up';

        // Set current item (make it blank)
        this.currentItem = { id: -1, name: '', age: 0 };

        // Bind functions to this class instance
        this._compateItem = this._compateItem.bind(this);
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template array object
        this._templateArray = new TemplateArray('parent', 'list', this._list, this);

        // Update the template array
        this._templateArray.update();

        // Create template current item
        this._templateCurrentItem = new Template('currentItem', this);

        // Update the template current item for the first time
        this._templateCurrentItem.update();
    }

    /**
     * Set the sort field and direction.
     * @param {string} field The name of the field that has been clicked.
     */
    setSort(field) {
        // If the same as the current field
        if (field === this.sortField) {
            // Just swap the direction
            if (this.sortDirection === 'up') this.sortDirection = 'down'; else this.sortDirection = 'up';
        } else {
            // Move to the given field
            this.sortField = field;
        }

        // Re-sort the list
        this._list.sort(this._compateItem);

        // Update the template array
        this._templateArray.update();
    }

    /**
     * Select item event.
     * @param {string} indexText The index (as text) of the item in the list.
     */
    selectItem(indexText) {
        // Set the index
        const index = parseInt(indexText);

        // Set the current item
        this.currentItem = this._list[index];

        // Update the template current item
        this._templateCurrentItem.update();

        // Update the template array
        this._templateArray.update();
    }

    /**
     * Delete the current item from the list.
     */
    deleteItem() {
        // Get index of the current item
        const index = this._list.indexOf(this.currentItem);

        // If not found
        if (index === -1) return;

        // Remove the item from the list
        this._list.splice(index, 1);

        // Reset the current item
        this.currentItem = { id: -1, name: '', age: 0 };

        // Update the template current item
        this._templateCurrentItem.update();

        // Update the template array
        this._templateArray.update();
    }

    /**
     * Sort compare item function.
     * @param {*} item1 The first item to compare with.
     * @param {*} item2 The second item to compare to.
     * @return The compare result (0,1,-1).
     */
    _compateItem(item1, item2) {
        // Set result
        let result = 0;

        // If sorting by name field
        if (this.sortField === 'name') {
            // Compare the two items by name
            if (item1.name < item2.name) result = 1;
            if (item1.name > item2.name) result = -1;
        }

        // If sorting by age field
        if (this.sortField === 'age') {
            // Compare the two items by name
            if (item1.age < item2.age) result = 1;
            if (item1.age > item2.age) result = -1;
        }

        // If direction is down then swap result
        if (this.sortDirection === 'down') result *= -1;
        
        // Return the compare result
        return result;
    }
}
 
// Define controller web component
customElements.define('simple-list-controller', SimpleListController);
