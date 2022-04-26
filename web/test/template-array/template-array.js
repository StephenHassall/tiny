import Controller from "./../../tiny/controller.js";
import TemplateArray from "./../../tiny/template-array.js";
import SpecialTemplateArray from "./special-template-array.js";

/**
 * Template Array
 * 
 * This web component tests the TemplateArray class.
 */
export default class TemplateArrayController extends Controller {
    /**
     * Template Array controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'template-array.html',
            cssPath: 'template-array.css',
            importMetaUrl: import.meta.url
        });

        // Set test variable
        this.abc = 'hello world';

        // Set array list 1
        this.arrayList1 = [
            { text: 'Test #1', number: 1 },
            { text: 'Test #2', number: 2 },
            { text: 'Test #3', number: 3 },
            { text: 'Test #4', number: 4 }
        ];

        // Set array list 2
        this.arrayList2 = [];

        // Set array list 3
        this.arrayList3 = [
            { text: 'Test #1', number: 1 },
            { text: 'Test #2', number: 2 },
            { text: 'Test #3', number: 3 },
            { text: 'Test #4', number: 4 }
        ];

        // Set array list 4
        this.arrayList4 = [
            { text: 'Test #1', number: 1 },
            { text: 'Test #2', number: 2 },
            { text: 'Test #3', number: 3 },
            { text: 'Test #4', number: 4 }
        ];
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create test 1
        this.test1TemplateArray = new TemplateArray('test1Parent', 'test1List', this.arrayList1, this);

        // Create test 2
        this.test2TemplateArray = new TemplateArray('test2Parent', 'test2List', this.arrayList2, this);

        // Create test 3
        this.test3TemplateArray = new TemplateArray(undefined, 'test3List', this.arrayList3, this);

        // Create test 4
        this.test4SpecialTemplateArray = new SpecialTemplateArray('test4Parent', 'test4List', this.arrayList4, this);

        // Update the templates for the first time
        this.test1TemplateArray.update();
        this.test2TemplateArray.update();
        this.test3TemplateArray.update();
        this.test4SpecialTemplateArray.update();
    }
}
 
// Define controller web component
customElements.define('template-array-controller', TemplateArrayController);
