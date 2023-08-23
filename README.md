# Tiny Web Application Framework

>I have come to the conclusion that any framework, even a tiny one, is now no longer required. You can perform most of the tasks required using Web Components and JavaScript classes and modules.
>
>This framework is now deprecated. The domain has been removed but you can still find it at [tiny-web-framework.netlify.com](https://tiny-web-framework.netlify.com)
>
>For information able how to use Web Components and other interesting stuff, go to my main site at [CodeRunDebug.com](https://CodeRunDebug.com)

Build websites without unnecessary complexity. Use existing standards in a simple way.

No build tools. No TypeScript. No JSX. No mountain of code to learn. No framework that goes out of date in a month. Just a small library and simple code.

**Model-View-Controller (MVC)**

A controller has its own separate HTML, CSS and JavaScript files, making it easier to edit their different parts.

**String Templates & HTML**

Format HTML using standard JavaScript string template literals. The **${...}** notation can include variables, functions, and embedded conditions.

**Two Way Data Binding**

Transfer information between data and form inputs. Create a link between the property of an object and an input element.

**Single Page Apps & Routing**

Create a single page application with multiple views for quick and dynamic web sites.

**ES6 & Web Components**

Using modern web standards. These are more resilient to change. So, the code you write today, will be working long into the future.

## What the HTML looks like

Keep HTML, CSS and JavaScript files separate. Use string template literal notation to format the HTML. Use inline events to call controller functions.

```html
<div class="lucky7">
	<h3>Role the dice and see how lucky you are? Will you get the lucky 7?</h3>
	<div id="templateArea">
		<div class="dice">${this.dice1}</div>
		<div class="dice">${this.dice2}</div>
		<div class="equal">=</div>
		<div class="dice ${this.diceTotal===7 ? 'dice-lucky' : ''}">${this.diceTotal}</div>
	</div>
	<button
		class="roleDice"
		onclick="getController(this).roleDice()">
		Role Dice
	</button>
</div>
```

## What the code looks like

Load in HTML and CSS files dynamically. Set local variables. Handle the loaded event. Create template area. Process inline event.

```javascript
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
```