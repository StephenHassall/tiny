/**
 * Route
 *
 * Create a single page application with multiple views.
 * /singlePageApplication/#!/view1
 * /singlePageApplication/#!/view2/:param1
 * /singlePageApplication/#!/view3/:param2?search=123
 * /singlePageApplication/#!/view4/:param3?search=987#hash
 *
 * Each view will contain its own Controller that is only loaded in when needed.
 * 
 * This class is not itself a web component. You will need to derive your own web component from it. It is
 * more of a custom element than a web component as it does not have a shadow DOM.
 */
export default class Route extends HTMLElement {
    // Set static route list
    static _routeList = [];

    // Set current route
    static _route = undefined;

    // Set default route
    static _defaultRoute = undefined;

    /**
     * The Route constructor function.
     * @param {string=} importMetaUrl The "import.meta.url" value of the derived route. This will be used to set the default
     * relative path for all the added route files.
     */
    constructor(importMetaUrl) {
        // Must call super first
        super();

        // Set default importMetaUrl of derived class
        this._importMetaUrl = importMetaUrl;

        // Bind hash change events to this
        this._hashChange = this._hashChange.bind(this);
    }

    /**
     * Add a new page view to the route.
     * @param {Object} options The route options to add.
     * @param {string} options.path The path format. This must start with a / character. You can set parameters by
     * using the : character. Some examples
     * /
     * /view1
     * /view2/:param1
     * /view3/:param1/:param2
     * /view4/:param1/subView1/:param2 
     * @param {string} options.javaScriptPath The path to the JavaScript file that contains the controller of the view.
     * @param {string} options.controllerTagName The name of the controller tag. This is the <my-view-controller> name (without the < > characters).
     * @param {string=} options.importMetaUrl The "import.meta.url" value of the derived route. If this is given then the javaScriptPath parameter
     * is a relative path. If it is not given then the default one is used (see constructor). If there is no default value and this is not given
     * then the javaScriptPath must be the full path.
     * @param {*=} options.extra Any extra data you want to attach to the route.
     */
    add(options) {
        // Check parameters
        if (!options) throw new Error('Route add parameter options is missing');
        if (typeof options.path !== 'string') throw new Error('Route add parameter objects.path is not a string');
        if (options.path.length === 0) throw new Error('Route add parameter objects.path cannot be empty');
        if (options.path.startsWith('/') === false) throw new Error('Route add parameter objects.path must start with a / character');
        if (typeof options.javaScriptPath !== 'string') throw new Error('Route add parameter objects.javaScriptPath is not a string');
        if (options.javaScriptPath.length === 0) throw new Error('Route add parameter objects.javaScriptPath cannot be empty');
        if (typeof options.controllerTagName !== 'string') throw new Error('Route add parameter objects.controllerTagName is not a string');
        if (options.controllerTagName.length === 0) throw new Error('Route add parameter objects.controllerTagName cannot be empty');

        // Create route object
        const route = {};
        route.path = options.path;
        route.controllerTagName = options.controllerTagName;
        route.extra = options.extra;

        // Set importMetaUrl to use
        let importMetaUrl = this._importMetaUrl;
        if (options.importMetaUrl) importMetaUrl = options.importMetaUrl;

        // If JavaScript path is relative
        if (importMetaUrl) {
            // Set JavaScript's relative path
            route.javaScriptPath = this._getRelativePath(importMetaUrl) + options.javaScriptPath;
        } else {
            // Set JavaScript's full path
            route.javaScriptPath = options.javaScriptPath;
        }

        // Set JavaScript not loaded
        route.javaScriptLoaded = false;

        // Set path folder list
        route.folderList = route.path.split('/');

        // Add new route to global list
        Route._routeList.push(route);

        // Set to sort
        Route._sortRequired = true;
    }

    /**
     * Add a default view to the route. This will be shown if none of the other views paths match the URL.
     * @param {Object} options The route options to add.
     * @param {string} options.javaScriptPath The path to the JavaScript file that contains the controller of the view.
     * @param {string} options.controllerTagName The name of the controller tag. This is the <my-view-controller> name (without the < > characters).
     * @param {string=} options.importMetaUrl The "import.meta.url" value of the derived route. If this is given then the javaScriptPath parameter
     * is a relative path. If it is not given then the default one is used (see constructor). If there is no default value and this is not given
     * then the javaScriptPath must be the full path.
     */
    default(options) {
        // Check parameters
        if (!options) throw new Error('Route default parameter options is missing');
        if (typeof options.javaScriptPath !== 'string') throw new Error('Route default parameter objects.javaScriptPath is not a string');
        if (options.javaScriptPath.length === 0) throw new Error('Route default parameter objects.javaScriptPath cannot be empty');
        if (typeof options.controllerTagName !== 'string') throw new Error('Route default parameter objects.controllerTagName is not a string');
        if (options.controllerTagName.length === 0) throw new Error('Route default parameter objects.controllerTagName cannot be empty');

        // Create default route object
        Route._defaultRoute = {};
        Route._defaultRoute.path = 'default';
        Route._defaultRoute.controllerTagName = options.controllerTagName;

        // Set importMetaUrl to use
        let importMetaUrl = this._importMetaUrl;
        if (options.importMetaUrl) importMetaUrl = options.importMetaUrl;

        // If JavaScript path is relative
        if (importMetaUrl) {
            // Set JavaScript's relative path
            Route._defaultRoute.javaScriptPath = this._getRelativePath(importMetaUrl) + options.javaScriptPath;
        } else {
            // Set JavaScript's full path
            Route._defaultRoute.javaScriptPath = options.javaScriptPath;
        }

        // Set JavaScript not loaded
        Route._defaultRoute.javaScriptLoaded = false;
    }

    /**
     * Get the route params for the current URL. Some examples.
     * /view1/:param1 > /view2/234 = { param1: '234' }
     * /view2/:param1/:param2 > /view2/list/9988 = { param1: 'list', param2: '9988' }
     * /view3/:param1/subView1/:param2 > /view3/11/subView1/22 = { param1: '11', param2: '22' }
     * @return {Object} An object with route parameter properties and values.
     */
    static routeParams() {
        // Set result object
        let result = {};

        // Get path
        const path = Route._getPath();

        // Get path folder list
        const pathFolderList = path.split('/');

        // For each path folder
        for (let folderIndex = 0; folderIndex < pathFolderList.length; folderIndex++) {
            // Get folders
            const pathFolder = pathFolderList[folderIndex];
            const routeFolder = Route._route.folderList[folderIndex];

            // If the route folder is not a parameter type
            if (routeFolder.startsWith(':') === false) continue;

            // Add param and value to result
            result[routeFolder.substr(1)] = decodeURIComponent(pathFolder);
        }

        // Return the result object
        return result;
    }

    /**
     * Go to the view given by the path.
     * @param {string} path The route path part, which could include any search or hash parts. For example,
     * /view1
     * /view2/123
     */
    static gotoView(path) {
        // Check parameters
        if (typeof path !== 'string') throw new Error('Route gotoView parameter path is not a string');
        if (path.length === 0) throw new Error('Route gotoView parameter path cannot be empty');
        if (path.startsWith('/') === false) throw new Error('Route gotoView parameter path must start with a / character');

        // The whole path part needs to come after the normal # character (with an extra ! character)
        window.location.hash = '#!' + path;
    }

    /**
     * Before load event that can be overrided. This is called just before the route parts are loaded.
     * @param {Object} route The route object containing information about the view that is about to be shown.
     * @return {boolean} True means you are happy to load in the route view. False means do nothing. You will need to go to a different page.
     */
    beforeLoad(route) {
        // Return that this route can be viewed by default
        return true;
    }

    /**
    * Override connectedCallback function to handle when component is attached into the DOM.
    * @override
    */
    connectedCallback() {
        // Add the hash change event
        window.addEventListener("hashchange", this._hashChange, false);

        // Set the route for the current page
        this._setRoute();
    }

    /**
     * Hash change event. The hash part of the URL has changed. This normally means a new route is required.
     */
    _hashChange() {
        // Set the route for the current page
        this._setRoute();
    }
    
    /**
     * Set the route to show depending on the current URL.
     */
    _setRoute() {
        // If sort is required
        if (Route._sortRequired === true) Route._sortRoute();

        // Get path
        const path = Route._getPath();

        // Search for route
        const routeListIndex = Route._searchRoute(path);

        // If not found
        if (routeListIndex === -1) {
            // If no default route set
            if (Route._defaultRoute === undefined) throw new Error('Unable to find matching route for page ' + window.location.href);

            // Set the route to the default one
            Route._route = Route._defaultRoute;
        }
        
        // If found
        if (routeListIndex !== -1) {
            // Get and set route
            Route._route = Route._routeList[routeListIndex];

            // Call the before load function to see if it is alright to show the route's view
            if (this.beforeLoad(Route._route) === false) return;
        }

        // If the route has already been loaded
        if (Route._route.javaScriptLoaded === true) {
            // Create the controller element
            const controller = document.createElement(Route._route.controllerTagName);

            // If there is already and controller child element then we need to remove it
            if (this.lastChild) this.removeChild(this.lastChild);

            // Add the controller as a child element
            this.appendChild(controller);

            // Stop here
            return;
        }

        // We need to import/load the JavaScript file for the controller
        import(Route._route.javaScriptPath)
        .then(() =>  {
            // Set the JavaScript file has been loaded
            Route._route.javaScriptLoaded = true;

            // Create the controller element
            const controller = document.createElement(Route._route.controllerTagName);

            // If there is already and controller child element then we need to remove it
            if (this.lastChild) this.removeChild(this.lastChild);

            // Add the controller as a child element
            this.appendChild(controller);
        })
        .catch((error) => {
            // Log the error
            console.error('Unable to load JavaScript file for route. ' + Route._route.javaScriptPath);
            console.error(error);
        });
    }

    /**
     * Get the relative path from the given "import.meta.url" object. This is the folder where the
     * single page application route JavaScript file exists.
     * @param {string} importMetaUrl The "import.meta.url" value of the derived route.
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
     * Get the path from the hash part of the URL. This is the part after the #! character to the start of the ? search
     * parameters or the # hash section.
     * @return {string} The path part of the URL.
     */
    static _getPath() {
        // Get the hash part of the URL
        let hash = window.location.hash;

        // If the hash does not start with the #! characters then there is no route set yet
        if (hash.startsWith('#!') === false) return '/';

        // Remove the starting characters
        hash = hash.substr(2);

        // Look for a ? character (the search part)
        let searchIndex = hash.indexOf('?');

        // If there is a search part
        if (searchIndex !== -1) {
            // Remove the search part from the hash
            hash = hash.substr(0, searchIndex);
        }

        // Look for a # character (the other hash part)
        let hashIndex = hash.indexOf('#');

        // If there is a hash part
        if (hashIndex !== -1) {
            // Remove the other hash part from the hash
            hash = hash.substr(0, hashIndex);
        }

        // Return the final hash that is the route path
        return hash;
    }

    /**
     * Sort the list of routes. Each route has a list of path folders. These will be used
     * to work out which route to use based on the URL. The order needs to be as follows.
     *
     * First by folder length
     * /folder1
     * /folder1/folder2
     * 
     * Then alphabetically
     * /folder1
     * /folder2
     * 
     * Then by parameter (all params are last)
     * /folder1
     * /:param1
     * @static
     */
    static _sortRoute() {
        // Sort the list of routes
        Route._routeList.sort((route1, route2) => {
            // Sort first by the length of the folders
            if (route1.folderList.length > route2.folderList.length) return 1;
            if (route1.folderList.length < route2.folderList.length) return -1;

            // For each folder
            for (let index = 0; index < route1.folderList.length; index++) {
                // Get folders
                const folder1 = route1.folderList[index];
                const folder2 = route2.folderList[index];

                // If both are params
                if (folder1.startsWith(':') === true && folder2.startsWith(':') === true) {
                    // Compare folders
                    if (folder1 > folder2) return 1;
                    if (folder1 < folder2) return -1;
                }

                // If both are not params
                if (folder1.startsWith(':') === false && folder2.startsWith(':') === false) {
                    // Compare folders
                    if (folder1 > folder2) return 1;
                    if (folder1 < folder2) return -1;                    
                }

                // If folder 1 is a param but folder 2 is not
                if (folder1.startsWith(':') === true && folder2.startsWith(':') === false) return -1;
                
                // If folder 1 is not a param but folder 2 is
                if (folder1.startsWith(':') === false && folder2.startsWith(':') === true) return 1;
            }

            // Return match
            return 0;
        });

        // Set no longer required to sort
        Route._sortRequired = false;
    }

    /**
     * Search the route list for one that matches the given path.
     * @param {string} path The path of the URL (after the #! part).
     * @return {number} The index in the routeList of the found route, or -1 if not found.
     */
    static _searchRoute(path) {
        // Get path folder list
        const pathFolderList = path.split('/');

        // Set search parts
        let min = 0;
        let max = Route._routeList.length - 1;
        let found = -1;

        // Loop until found
        while (min <= max) {
            // Set middle
            var middle = (min + max) / 2 | 0;
            
            // Set route
            var route = Route._routeList[middle];
            
            // Compare the route folder list to the path folder list
            var compare = Route._searchCompare(route.folderList, pathFolderList);
            
            // Process the compare result
            if (compare === -1) {
                // Reset minimum
                min = middle + 1;
            }
            else if (compare === 1) {
                // Reset maximum
                max = middle - 1;
            } else {
                // Set found
                found = middle;

                // Reset maximum
                max = middle - 1;
            }
        }
        
        // If found then return that
        if (found !== -1) return found;

        // Return not found
        return -1;
    }

    /**
     * Compare the route folder list items with the path folder list items. This is used when searching for
     * a path that best matches a route.
     * @param {string[]} routeFolderList The list of folders of the route to compare with.
     * @param {string[]} pathFolderList The list of folders of the path to compare to.
     * @return The result of the compare (0, -1, 1).
     */
    static _searchCompare(routeFolderList, pathFolderList) {
        // Sort first by the length of the folders
        if (routeFolderList.length > pathFolderList.length) return 1;
        if (routeFolderList.length < pathFolderList.length) return -1;

        // For each folder
        for (let index = 0; index < routeFolderList.length; index++) {
            // Get folders
            const routeFolder = routeFolderList[index];
            const pathFolder = pathFolderList[index];

            // If route folder is a param then move on to next folder
            if (routeFolder.startsWith(':') === true) continue;

            // Compare folders
            if (routeFolder > pathFolder) return 1;
            if (routeFolder < pathFolder) return -1;
        }

        // Return match
        return 0;
    }
}
