import Route from "./../../tiny/route.js";

/**
 * Help app route
 */
export default class HelpAppRoute extends Route {
    /**
     * 
     * @constructor
     */
    constructor() {
        // Call the super first
        super(import.meta.url);

        // Add route views
        this.add({
            path: '/',
            javaScriptPath: 'introduction/introduction.js',
            controllerTagName: 'introduction-controller',
            autoScroll: true
        });
        this.add({
            path: '/introduction',
            javaScriptPath: 'introduction/introduction.js',
            controllerTagName: 'introduction-controller',
            autoScroll: true
        });
        this.add({
            path: '/getting-started',
            javaScriptPath: 'getting-started/getting-started.js',
            controllerTagName: 'getting-started-controller',
            autoScroll: true
        });
        this.add({
            path: '/controller',
            javaScriptPath: 'controller/controller.js',
            controllerTagName: 'controller-controller',
            autoScroll: true
        });
        this.add({
            path: '/template',
            javaScriptPath: 'template/template.js',
            controllerTagName: 'template-controller',
            autoScroll: true
        });
        this.add({
            path: '/template-array',
            javaScriptPath: 'template-array/template-array.js',
            controllerTagName: 'template-array-controller',
            autoScroll: true
        });
        this.add({
            path: '/form',
            javaScriptPath: 'form/form.js',
            controllerTagName: 'form-controller',
            autoScroll: true
        });
        this.add({
            path: '/route',
            javaScriptPath: 'route/route.js',
            controllerTagName: 'route-controller',
            autoScroll: true
        });
        this.add({
            path: '/location',
            javaScriptPath: 'location/location.js',
            controllerTagName: 'location-controller',
            autoScroll: true
        });
        this.add({
            path: '/example-multilingual',
            javaScriptPath: 'example-multilingual/example-multilingual.js',
            controllerTagName: 'example-multilingual-controller',
            autoScroll: true
        });
        this.add({
            path: '/example-lucky7',
            javaScriptPath: 'example-lucky7/example-lucky7.js',
            controllerTagName: 'example-lucky7-controller',
            autoScroll: true
        });
        this.add({
            path: '/example-simple-list',
            javaScriptPath: 'example-simple-list/example-simple-list.js',
            controllerTagName: 'example-simple-list-controller',
            autoScroll: true
        });
        this.add({
            path: '/example-todo-list',
            javaScriptPath: 'example-todo-list/example-todo-list.js',
            controllerTagName: 'example-todo-list-controller',
            autoScroll: true
        });
        this.add({
            path: '/example-questionnaire',
            javaScriptPath: 'example-questionnaire/example-questionnaire.js',
            controllerTagName: 'example-questionnaire-controller',
            autoScroll: true
        });
        this.add({
            path: '/limitations',
            javaScriptPath: 'limitations/limitations.js',
            controllerTagName: 'limitations-controller',
            autoScroll: true
        });
        this.add({
            path: '/release-notes',
            javaScriptPath: 'release-notes/release-notes.js',
            controllerTagName: 'release-notes-controller',
            autoScroll: true
        });
        this.add({
            path: '/privacy',
            javaScriptPath: 'privacy/privacy.js',
            controllerTagName: 'privacy-controller',
            autoScroll: true
        });
        this.add({
            path: '/license',
            javaScriptPath: 'license/license.js',
            controllerTagName: 'license-controller',
            autoScroll: true
        });
        this.add({
            path: '/terms',
            javaScriptPath: 'terms/terms.js',
            controllerTagName: 'terms-controller',
            autoScroll: true
        });

        // Add default view
        this.default({
            javaScriptPath: 'introduction/introduction.js',
            controllerTagName: 'introduction-controller',
            autoScroll: true
        });
    }
}
 
// Define controller web component
customElements.define('help-app-route', HelpAppRoute);
