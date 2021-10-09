import Controller from "/lib/tiny/controller.js";

export default class HelloWorld extends Controller {
    constructor() {
        super({
            htmlPath: 'helloWorld.html',
            cssPath: 'helloWorld.css',
            importMetaUrl: import.meta.url,
            useShadowDom: false,
            cache: true
        });
    }
    loadedCallback() {
        // Override to perform tasks after HTML and CSS parts have loaded
    }
}

customElements.define('hello-world', HelloWorld);