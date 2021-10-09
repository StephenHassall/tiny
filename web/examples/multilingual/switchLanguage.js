import Controller from "./../../tiny/controller.js";

/**
 * Switch Language
 * 
 * This web component gives the user the option to switch which language to use. There are
 * 3 languages, english, spanish and french.
 */ 
export default class SwitchLanguageController extends Controller {
    /**
     * Switch language controller web component constructor.
     * @constructor
     */
    constructor() {
        // Set the language dependant HTML
        let htmlPage = 'switchLanguage_en.html';
        if (window.localStorage.langaugeCode === 'es') htmlPage = 'switchLanguage_es.html';
        if (window.localStorage.langaugeCode === 'fr') htmlPage = 'switchLanguage_fr.html';

        // Call the super with the page to load
        super({
            htmlPath: htmlPage,
            cssPath: 'switchLanguage.css',
            importMetaUrl: import.meta.url,
            useShadowDom: true
        });
    }

    /**
     * Set the language to use.
     * @param {string} languageCode The code of the language to use.
     */
    setLanguage(languageCode) {
        // Store the locale language code to use
        window.localStorage.langaugeCode = languageCode;

        // Reload the current page
        location.reload();
    }
}
 
// Define controller web component
customElements.define('switch-language-controller', SwitchLanguageController);
