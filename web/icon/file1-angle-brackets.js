/**
 * Icon File 1 Angle Brackets <icon-file1-angle=brackets>.
 * @author Stephen Paul Hassall (Web: https://icon-svg.com, Twitter: https://twitter.com/StephenPHassall)
 */
export default class IconFile1AngleBrackets extends HTMLElement {
    /**
     * Icon File 1 Angle Brackets constructor.
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
    d="M 4 0 C 2.892 0 2 0.892 2 2 L 2 14 C 2 15.108 2.892 16 4 16 L 12 16 C 13.108 16 14 15.108 14 14 L 14 7 L 14 5.5 A 1.2071068 1.2071068 0 0 0 13.646484 4.6464844 L 9.3535156 0.35351562 A 1.2071068 1.2071068 0 0 0 8.5 0 L 7 0 L 4 0 z M 4 1 L 8 1 L 8 5 A 1 1 0 0 0 9 6 L 13 6 L 13 14 C 13 14.554 12.554 15 12 15 L 4 15 C 3.446 15 3 14.554 3 14 L 3 2 C 3 1.446 3.446 1 4 1 z M 6.421875 8.7128906 A 0.5 0.5 0 0 0 6.1464844 8.8535156 L 4.3535156 10.646484 A 0.5 0.5 0 0 0 4.3535156 11.353516 L 6.1464844 13.146484 A 0.5 0.5 0 0 0 6.8535156 13.146484 L 7.1464844 12.853516 A 0.5 0.5 0 0 0 7.1464844 12.146484 L 6 11 L 7.1464844 9.8535156 A 0.5 0.5 0 0 0 7.1464844 9.1464844 L 6.8535156 8.8535156 A 0.5 0.5 0 0 0 6.421875 8.7128906 z M 9.421875 8.7128906 A 0.5 0.5 0 0 0 9.1464844 8.8535156 L 8.8535156 9.1464844 A 0.5 0.5 0 0 0 8.8535156 9.8535156 L 10 11 L 8.8535156 12.146484 A 0.5 0.5 0 0 0 8.8535156 12.853516 L 9.1464844 13.146484 A 0.5 0.5 0 0 0 9.8535156 13.146484 L 11.646484 11.353516 A 0.5 0.5 0 0 0 11.646484 10.646484 L 9.8535156 8.8535156 A 0.5 0.5 0 0 0 9.421875 8.7128906 z ">
  </path>
</svg>
`;
    }
}

// Define custom control
customElements.define('icon-file1-angle-brackets', IconFile1AngleBrackets);