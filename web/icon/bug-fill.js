/**
 * Icon Bug Fill <icon-bug-fill>.
 * @author Stephen Paul Hassall (Web: https://icon-svg.com, Twitter: https://twitter.com/StephenPHassall)
 */
export default class IconBugFill extends HTMLElement {
    /**
     * Icon Bug Fill constructor.
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
    d="M 5.5 0 C 5.2238576 0 5 0.22385763 5 0.5 L 5 2.3652344 C 4.5906429 2.8358518 4.2970173 3.3956802 4.1425781 4 L 3 4 L 3 2.5 C 3 2.2238576 2.7761424 2 2.5 2 C 2.2238576 2 2 2.2238576 2 2.5 L 2 4.5 A 0.5 0.5 0 0 0 2.5 5 L 4 5 L 4 6 L 12 6 L 12 5 L 13.5 5 A 0.5 0.5 0 0 0 14 4.5 L 14 2.5 C 14 2.2238576 13.776142 2 13.5 2 C 13.223858 2 13 2.2238576 13 2.5 L 13 4 L 11.871094 4 C 11.71406 3.3909615 11.415619 2.827537 11 2.3554688 L 11 0.5 C 11 0.22385763 10.776142 0 10.5 0 C 10.223858 0 10 0.22385763 10 0.5 L 10 1.5371094 C 9.3920405 1.1856128 8.7022567 1.0003682 8 1 C 7.2979208 0.99977434 6.6081487 1.1843423 6 1.5351562 L 6 0.5 C 6 0.22385763 5.7761424 0 5.5 0 z M 2.5 7 C 2.2238576 7 2 7.2238576 2 7.5 L 2 9.5 A 0.5 0.5 0 0 0 2.5 10 L 4 10 L 4 12 L 2.5 12 A 0.5 0.5 0 0 0 2 12.5 L 2 15.5 C 2 15.776142 2.2238576 16 2.5 16 C 2.7761424 16 3 15.776142 3 15.5 L 3 13 L 4.1425781 13 C 4.5548325 14.596706 5.8973861 15.75517 7.5 15.962891 L 7.5 7 L 4 7 L 4 9 L 3 9 L 3 7.5 C 3 7.2238576 2.7761424 7 2.5 7 z M 8.5 7 L 8.5 15.962891 C 10.102614 15.755156 11.445167 14.596706 11.857422 13 L 13 13 L 13 15.5 C 13 15.776142 13.223858 16 13.5 16 C 13.776142 16 14 15.776142 14 15.5 L 14 12.5 A 0.5 0.5 0 0 0 13.5 12 L 12 12 L 12 10 L 13.5 10 A 0.5 0.5 0 0 0 14 9.5 L 14 7.5 C 14 7.2238576 13.776142 7 13.5 7 C 13.223858 7 13 7.2238576 13 7.5 L 13 9 L 12 9 L 12 7 L 8.5 7 z ">
  </path>
</svg>
`;
    }
}

// Define custom control
customElements.define('icon-bug-fill', IconBugFill);