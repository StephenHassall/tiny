/**
 * Controller
 *
 * Base class used to create a Tiny Web Application Framework controller web component.
 *
 * It dynamically loads in HTML and CSS from separate files. The general idea is to have your controller code (the web component) in
 * a *.js file and the HTML/CSS parts in *.html and *.css files.
 *
 * myController.js
 * myController.html
 * myController.css
 *
 * This class is not itself a web component. You will need to derive your own web component from it.
 */
export default class Controller extends HTMLElement {
    /**
     * The Controller constructor function.
     * @param {Object} options The controller options.
     * @param {string} options.htmlPath Either the relative path or the full path to the HTML file.
     * @param {string=} options.cssPath Either the relative path or the full path to the CSS file.
     * @param {string=} options.importMetaUrl The "import.meta.url" value of the derived web component. If this is used then the HTML and CSS file locations
     * will be relative to the path of the derived web component JavaScript file.
     * @param {boolean=} options.useShadowDom Is the controller using a shadow DOM. A shadow DOM stops styles leaking in or out of the controller. Default is false.
     * @param {boolean=} options.cache Should the HTML and CSS files be cached, or should the files be fetched each time the controller is created. Default is true. 
     */
    constructor(options) {
        // Must call super first
        super();

        // Check parameters
        if (!options) throw new Error('Controller constructor parameter options is missing');
        if (typeof options.htmlPath !== 'string') throw new Error('Controller constructor parameter objects.htmlPath is not a string');
        if (options.htmlPath.length === 0) throw new Error('Controller constructor parameter objects.htmlPath cannot be empty');

        // Set defaults
        this._useShadowDom = false;
        this._cache = true;

        // Check parameter defaults
        if (typeof options.useShadowDom === 'boolean') this._useShadowDom = options.useShadowDom;
        if (typeof options.cache === 'boolean') this._cache = options.cache;

        // Check the get controller function exists
        this._checkGetController();

        // Set inner HTML
        this._innerHtml = null;

        // Set attached flag
        this._attached = false;

        // Set connected flag
        this._connected = false;

        // If using a shadow DOM
        if (this._useShadowDom === true) {
            // Attach shadow DOM root
            this._shadowRoot = this.attachShadow({mode: 'open'});
        }

        // Bind functions to this class instance
        this._loadHtml = this._loadHtml.bind(this);
        this._loadCss = this._loadCss.bind(this);

        // If paths are relative
        if (options.importMetaUrl) {
            // Get relative path
            const relativePath = this._getRelativePath(options.importMetaUrl);

            // Set HTML path
            this._htmlPath = relativePath + options.htmlPath;

            // If there is a CSS path given
            if (options.cssPath) this._cssPath = relativePath + options.cssPath;
        } else {
            // Set HTML path
            this._htmlPath = options.htmlPath;

            // If there is a CSS path given
            if (options.cssPath) this._cssPath = options.cssPath;
        }

        // Set HTML
        this._html = null;

        // Set CSS
        this._css = null;

        // If cache used
        if (this._cache === true) {
            // Check if the HTML file has been cached
            if (Controller._cacheMap.has(this._htmlPath) === true) this._html = Controller._cacheMap.get(this._htmlPath);

            // Check if the CSS file has been cached
            if (Controller._cacheMap.has(this._cssPath) === true) this._css = Controller._cacheMap.get(this._cssPath);
        }

        // If no HTML data yet
        if (this._html === null) {
            // Load the HTML
            this._loadHtml();
        }

        // If there is a CSS file
        if (options.cssPath) {
            // If no CSS data yet
            if (this._css === null) {
                // Load the CSS
                this._loadCss();
            }
        }

        // If we already have the HMTL and CSS cached then just call gotData function
        if (this._html !== null) this._gotData();
    }

    // Cache of previously loaded HTML/CSS files
    static _cacheMap = new Map();

    /**
    * Override connectedCallback function to handle when component is attached into the DOM.
    * @override
    */
    connectedCallback() {
        // Hide this element for now. It will be shown after loadedCallback is called
        this.style.visibility = 'hidden';

        // Set connected flag
        this._connected = true;

        // If no inner HTML
        if (this._innerHtml === null) return;

        // If using a shadow DOM
        if (this._useShadowDom === true) {
            // Put inner HTML into shadow root
            this._shadowRoot.innerHTML = this._innerHtml;
        } else {
            // Put inner HTML into this customer element
            this.innerHTML = this._innerHtml;
        }

        // Set attached flag
        this._attached = true;

        // Call loadedCallback event
        this.loadedCallback();

        // Show this element. It was hidden until loadCallback was called
        this.style.visibility = 'visible';
    }

    /**
     * Get the element from its id value.
     * @param {string} elementId The id of the element to get.
     * @return {Element} The found element or null if not found.
     */
    getElementById(elementId) {
        // Set element
        let element = null;

        // If using a shadow DOM
        if (this._useShadowDom === true) {
            // Look inside the shadow DOM for the element
            element = this.shadowRoot.getElementById(elementId);
        } else {
            // Look inside the custom element for the element
            element = this.querySelector('#' + elementId);
        }

        // Return the found element
        return element;
    }

    /**
     * Loaded callback event that needs overriding. This is called when the controller's HTML/CSS is loaded and attached to the DOM.
     */
    loadedCallback() {
    }

    /**
     * Check the get controller function.
     */
    _checkGetController() {
        // If the get controller function exists
        if (window.getController) return;

        /**
         * Get the web controller element. This is used with inline events, to allow you to run your own controller
         * functions. For example <div onclick="getController(this).foo(...)">.
         * @param {Element} eventElement The element that fired the inline event.
         * @return {Element} The controller element the inline event fired from.
         */
        window.getController = function(eventElement) {
            // Set element to start moving up through
            let element = eventElement;

            // Move up the DOM
            while (element !== null) {
                // Move to the parent node
                element = element.parentNode;

                // If this element is the shadow root
                if (element instanceof ShadowRoot) {
                    // The controller is the host element of the shadow root
                    return element.host;
                }

                // If this element derived from Controller class
                if (element instanceof Controller) {
                    // This element is the controller
                    return element;
                }
            }

            // Not found so throw exception
            throw new Error('Unable to find controller. Are you calling this function outside a Tiny controller?');
        };
    }

    /**
     * Get the relative path from the given "import.meta.url" object. This is the folder where web
     * component JavaScript file exists.
     * @param {string} importMetaUrl The "import.meta.url" value of the derived web component.
     * @return {string} The full relative path. This ends with the / character.
     */
    _getRelativePath(importMetaUrl) {
        // Check parameter
        if (!importMetaUrl) return '/';

        // Find the last / character
        const lastForwardSlash = importMetaUrl.lastIndexOf('/');

        // If there is no / character then return the root
        if (lastForwardSlash === -1) return '/';

        // Get the relative path
        const relativePath = importMetaUrl.substr(0, lastForwardSlash + 1);

        // Return the relative path
        return relativePath;
    }

    /**
     * Load the HTML file.
     */
    _loadHtml() {
        // Set self
        const self = this;

        // Create HTTP request
        const xhttp = new XMLHttpRequest();

        // Set state change function
        xhttp.onreadystatechange = function() {
            // If got file
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                // Set HTML data
                self._html = xhttp.responseText;

                // Add HTML to cache
                Controller._cacheMap.set(self._htmlPath, self._html);

                // Call the got data event
                self._gotData();
            }
        };

        // Set path
        xhttp.open('GET', this._htmlPath, true);

        // Get file
        xhttp.send();
    }

    /**
     * Load the CSS file.
     */
    _loadCss() {
        // Set self
        const self = this;

        // Create HTTP request
        const xhttp = new XMLHttpRequest();

        // Set state change function
        xhttp.onreadystatechange = function() {
            // If got file
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                // Set CSS data
                self._css = xhttp.responseText;

                // Add CSS to cache
                Controller._cacheMap.set(self._cssPath, self._css);

                // Call the got data event
                self._gotData();
            }
        };

        // Set path
        xhttp.open('GET', this._cssPath, true);

        // Get file
        xhttp.send();
    }

    /**
     * Got data event. This is called when we have gotten either the HTML or CSS file data.
     */
    _gotData() {
        // If no HTML data yet
        if (this._html === null) return;

        // If CSS is required
        if (this._cssPath) {
            // If no CSS data yet
            if (this._css === null) return;
        }

        // If there is CSS
        if (this._cssPath) {
            // Set the inner HTML that includes the CSS style
            this._innerHtml = '<style>' + this._css + '</style>' + this._html;
        } else {
            // Set the inner HTML that has no CSS style
            this._innerHtml = this._html;
        }

        // If not connected
        if (this._connected === false) return;

        // If attached
        if (this._attached === true) return;

        // If using a shadow DOM
        if (this._useShadowDom === true) {
            // Put inner HTML into shadow root
            this._shadowRoot.innerHTML = this._innerHtml;
        } else {
            // Put inner HTML into this customer element
            this.innerHTML = this._innerHtml;
        }

        // Set attached flag
        this._attached = true;

        // Call loadedCallback event
        this.loadedCallback();

        // Show this element. It was hidden until loadedCallback was called
        this.style.visibility = 'visible';
    }
}
