/**
 * GDPR compliant cookie consent banner. Include this JavaScript file in the header of your HTML
 * file and it will automatically check for the GDPR setting (in localStorage) and if not yet
 * set then it will show the GDPR banner.
 */

/**
 * Add load event function. This is called after the page is loaded.
 */
window.addEventListener('load', function () {
    // Get the GDPR accept setting
    const gdprAccept = localStorage.getItem('gdprAccept');

    // If found
    if (gdprAccept) {
        // If yes then we can stop here
        if (gdprAccept === 'yes') return;
    }

    // Either the GDPR was not accepted or it does not exist. We need to show the banner

    // Set HTML
    const html = 
`
<style>
.gdpr-banner {
  display: inline-block;
  position: fixed;
  width: 20rem;
  padding: 1rem;
  top: 0;
  background-color: rgb(48, 48, 48);
  color: white;
  left: 50%;
  transform: translateX(-50%);
  margin: 0.5rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 30%);
  border-radius: 0.5rem;
  user-select: none;
}
.gdpr-banner .title {
  display: block;
  width: 100%;
  padding-bottom: 1rem;
  font-size: x-large;
}
.gdpr-banner a { color: white; }

.gdpr-banner #gprd-accept {
  cursor: pointer;
  background-color: lightgray;
  color: black;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: large;
  margin-top: 1rem;
}
@media (prefers-color-scheme: dark) {
  .gdpr-banner {
    background-color: rgb(248, 248, 248);
    color: rgb(48,48,48);
  }
  .gdpr-banner a { color: black; }
  .gdpr-banner #gprd-accept {
    background-color: black;
    color: rgb(248, 248, 248);
  }
}
</style>
<div class="gdpr-banner">
  <div class="title">Cookies & Privacy</div>
  <div>
    By using this website, you automatically accept our cookies & privacy policies.
    <br>
    <a href="/privacy.html">Read more</a>
  </div>
  <button id="gprd-accept">Understood</button>
</div>
`;

    // Create DIV element
    let divElement = document.createElement('DIV');

    // Set inner HTML
    divElement.innerHTML = html;

    // Get GPRD accept button element
    const gprdAcceptButtonElement = divElement.querySelector('#gprd-accept');

    // Add GPRD accept button click event
    gprdAcceptButtonElement.addEventListener('click', () => {
        // Set GPRD accept value in local storage (this will stop the banner being shown again)
        localStorage.setItem('gdprAccept', 'yes');
    
        // Remove the GPRD banner
        document.body.removeChild(divElement);
    });

    // Add HTML into document
    document.body.appendChild(divElement);
});


