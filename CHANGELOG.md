# Change Log

Information about all releases and changes to the Tiny Web Application Framework will appear here.

## __1.5__ - 21 May 2022

- **New:** Added route option to automatically scroll to the top of the page when it is inserted.

## __1.4__ - 26 April 2022

- **Update:** Changed the names of files that used camelcase to use a hyphenated name instead. For example, templateArray.js
became template-array.js.

## __1.3__ - 15 January 2022

- **Update:** Now uses fetch instead of XMLHttpRequest.
- **Update:** Switched from using substr function to substring.

## __1.2__ - 30 October 2021

- **Bug:** The Form.refresh function uses the document.activeElement function, which does not work correctly if the controller
is using a shadow DOM.

- **New:** Added Controller.getActiveElememt function. This first checks if the controller is running in a shadow DOM or not. Calls document.activeElement if not using a shadow DOM, and calls shadowDom.activeElement if it is.

## __1.1__ - 22 October 2021

- **Bug:** When using a single page application, when a default view was being shown, calling Route.routeParams threw an exception.

## __1.0__ - 9th October 2021

- First created and deployed.
