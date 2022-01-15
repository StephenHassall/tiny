/**
 * Location
 *
 * Similar to the browser location object but used with Route to cope with /#!/ URL formats.
 */
export default class Location {
    /**
     * Gets the href part of the location. This is the full URL.
     * @type {string}
     */
    static get href() {
        // Return the location's href value
        return window.location.href;
    }

    /**
     * Set the location's href. This will move to a different page.
     * @param {string} value The full URL href value.
     * @type {string}
     */
    static set href(value) {
        // Set the location's href value
        window.location.href = value;
    }

    /**
     * Gets the protocol part of the location. This is the starting part including the : character (https:).
     * @type {string}
     */
    static get protocol() {
        // Return the location's protocol value
        return window.location.protocol;
    }

    /**
     * Gets the host part of the location. This is the the domain name with port number if set (mysite.com, mysite.com:8081).
     * @type {string}
     */
    static get host() {
        // Return the location's host value
        return window.location.host;
    }

    /**
     * Gets the hostname part of the location. This is the the domain name (mysite.com).
     * @type {string}
     */
    static get hostname() {
        // Return the location's hostname value
        return window.location.hostname;
    }

    /**
     * Gets the port part of the location. This port value if given, 8081 in http://mysite.com:8081.
     * @type {string}
     */
    static get port() {
        // Return the location's port value
        return window.location.port;
    }

    /**
     * Gets the pathname part of the URL. The pathname could be,
     * http://mysite.com/folder/page.html?search=123#middlePage == /folder/page.html
     * http://mysite.com/folder/spa/#!/route1?search=123#middlePage == /folder/spa/#!/route1
     * http://mysite.com/folder/spa/#!/route1#middlePage == /folder/spa/#!/route1
     * @type {string}
     */
    static get pathname() {
        // If the location hash does not start with the route characters
        if (location.hash.startsWith('#!') === false) {
            // This is not a Route page therefore just return the location's pathname
            return window.location.pathname;
        }

        // Set the hash path
        let hashPath = location.hash;

        // Get the index of the start of the ? character
        const searchIndex = hashPath.indexOf('?');

        // If there is a search part then remove it
        if (searchIndex !== -1) hashPath = hashPath.substring(0, searchIndex);

        // Look for non-route hash character
        const hashIndex = hashPath.indexOf('#', 2);

        // If there is a hash part then remove it
        if (hashIndex !== -1) hashPath = hashPath.substring(0, hashIndex);

        // Return the route pathname
        return window.location.pathname + hashPath;
    }

    /**
     * Gets the search part of the URL. The search could be,
     * http://mysite.com/folder/page.html?search=123#middlePage == search=123
     * http://mysite.com/folder/spa/#!/route1?search=123#middlePage == search=123
     * http://mysite.com/folder/spa/#!/route1#middlePage == ''
     * @type {string}
     */
    static get search() {
        // If the location hash does not start with the route characters
        if (location.hash.startsWith('#!') === false) {
            // This is not a Route page therefore just return the location's search
            return window.location.search;
        }

        // Get the index of the start of the ? character
        const searchIndex = location.hash.indexOf('?');

        // If no search character then return an empty string
        if (searchIndex === -1) return '';

        // Set search
        let search = location.hash.substring(searchIndex);

        // Look for hash character
        const hashIndex = search.indexOf('#');

        // If there is a hash part then remove it
        if (hashIndex !== -1) search = search.substring(0, hashIndex);

        // Return the search part
        return search;
    }

    /**
     * Gets the search parameters for the URL.
     * @return {Object} An object with the search properties and values.
     */
    static searchParams() {
        // Get the search part or the URL
        let search = Location.search;

        // If nothing then return empty object
        if (search.length === 0) return {};

        // The format of the search is ?param1=encodedValue1&param2=encodedValue2

        // Set result object
        let result = {};

        // Remove the first ? character
        search = search.substring(1);

        // Split the search into param=value items
        const paramValueList = search.split('&');

        // For each param value item
        paramValueList.forEach((paramValue) => {
            // Split into a param and value parts
            const parts = paramValue.split('=');

            // Must have 2 parts
            if (parts.length !== 2) return;

            // Add param and value to result
            result[parts[0]] = decodeURIComponent(parts[1]);
        });

        // Return the result object
        return result;
    }

    /**
     * Gets the hash part of the URL. The hash could be,
     * http://mysite.com/folder/page.html?search=123#middlePage == middlePage
     * http://mysite.com/folder/spa/#!/route1?search=123#middlePage == middlePage
     * http://mysite.com/folder/spa/#!/route1#middlePage == middlePage
     * @type {string}
     */
    static get hash() {
        // If the location hash does not start with the route characters
        if (location.hash.startsWith('#!') === false) {
            // This is not a Route page therefore just return the location's hash
            return window.location.hash;
        }

        // Get the index of the non-route hash character
        const hashIndex = location.hash.indexOf('#', 2);

        // If no hash character then return empty string
        if (hashIndex === -1) return '';

        // Return the hash part
        return location.hash.substring(hashIndex);
    }
}
