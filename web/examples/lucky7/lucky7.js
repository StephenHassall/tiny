import Controller from "./../../tiny/controller.js";
import Template from "./../../tiny/template.js";

/**
 * Luck 7
 * 
 * This web component shows how the Template class is used to set HTML text areas using
 * string templates.
 */
export default class Lucky7Controller extends Controller {
    /**
     * Lucky 7 controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'lucky7.html',
            cssPath: 'lucky7.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });

        // Set the dice parts
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        this.diceTotal = this.dice1 + this.dice2;
    }

    /**
    * Override loadCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create template area object
        this._templateArea = new Template('templateArea', this);

        // Update the template area for the first time
        this._templateArea.update();
    }

    /**
     * Role dice button event.
     */
    roleDice() {
        // Reset the dice parts
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        this.diceTotal = this.dice1 + this.dice2;

        // Update the template area with the new values
        this._templateArea.update();
    }
}
 
// Define controller web component
customElements.define('lucky7-controller', Lucky7Controller);
