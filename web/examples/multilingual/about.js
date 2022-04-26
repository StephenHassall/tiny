import Controller from "./../../tiny/controller.js";

/**
 * About
 * 
 * This web component gives the user a simple welcome message in the current language. There are
 * 3 languages, english, spanish and french.
 */
export default class AboutController extends Controller {
    /**
     * About controller web component constructor.
     * @constructor
     */
    constructor() {
        // Set the language dependant HTML
        let htmlPage = 'about-en.html';
        if (window.localStorage.langaugeCode === 'es') htmlPage = 'about-es.html';
        if (window.localStorage.langaugeCode === 'fr') htmlPage = 'about-fr.html';

        // Call the super with the page to load
        super({
            htmlPath: htmlPage,
            cssPath: 'about.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }
}
 
// Define controller web component
customElements.define('about-controller', AboutController);
