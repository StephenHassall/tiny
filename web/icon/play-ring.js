/**
 * Icon Play Ring <icon-play-ring>.
 * @author Stephen Paul Hassall (Web: https://icon-svg.com, Twitter: https://twitter.com/StephenPHassall)
 */
export default class IconPlayRing extends HTMLElement {
    /**
     * Icon Play Ring constructor.
     */
    constructor() {
        // Must call super first
        super();

        // Set class name
        this.classList.add('icon-svg');

        // Set the inner HTML to the SVG
        this.innerHTML =
`
<svg
  viewBox="0 0 16 16" style="display: block; height: inherit;">
  <path
    d="M 8 0 A 8 8 0 0 0 0 8 A 8 8 0 0 0 8 16 A 8 8 0 0 0 16 8 A 8 8 0 0 0 8 0 z M 8 1 A 7 7 0 0 1 15 8 A 7 7 0 0 1 8 15 A 7 7 0 0 1 1 8 A 7 7 0 0 1 8 1 z M 5.6953125 4.3867188 A 0.61803399 0.61803399 0 0 0 5 5 L 5 11 A 0.61803399 0.61803399 0 0 0 5.8945312 11.552734 L 12.105469 8.4472656 A 0.5 0.5 0 0 0 12.105469 7.5527344 L 5.8945312 4.4472656 A 0.61803399 0.61803399 0 0 0 5.6953125 4.3867188 z ">
  </path>
</svg>
`;
    }
}

// Define custom control
customElements.define('icon-play-ring', IconPlayRing);