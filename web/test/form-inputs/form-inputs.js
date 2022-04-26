import Controller from "./../../tiny/controller.js";
import Form from "./../../tiny/form.js";
import Template from "./../../tiny/template.js";
import YesNoNotSure from './yes-no-not-sure.js';
import DateInput from './date-input.js';

/**
 * Form Inputs
 * 
 * This web component shows a number of different inputs and how to transfer data to and from them.
 */ 
export default class FormInputsController extends Controller {
    /**
     * FormInput controller web component constructor.
     * @constructor
     */
    constructor() {
        // Call the super with the page to load
        super({
            htmlPath: 'form-inputs.html',
            cssPath: 'form-inputs.css',
            importMetaUrl: import.meta.url
        });

        // Set form input data
        this.formData = {};
        this.formData.textString = '';
        this.formData.textNumber = 0;
        this.formData.textAreaString = '';
        this.formData.checkBoxBoolean = false;
        this.formData.checkBoxNumber = -1;
        this.formData.checkBoxString = '';
        this.formData.selectNumber = -1;
        this.formData.selectString = '';
        this.formData.radioString = '';
        this.formData.radioNumber = -1;
        this.formData.colorString = '';
        this.formData.dateString = '';
        this.formData.dateDate = new Date();
        this.formData.dateTimeLocalString = '';
        this.formData.dateTimeLocalDate = new Date();
        this.formData.weekString = '';
        this.formData.timeString = '';
        this.formData.timeDate = new Date();
        this.formData.dateAndTimeDate = new Date();
        this.formData.monthString = '';
        this.formData.monthDate = new Date();
        this.formData.numberString = '';
        this.formData.numberNumber = 0;
        this.formData.rangeString = '';
        this.formData.rangeNumber = 0;
        this.formData.yesNoNotSureString = '';
        this.formData.dateInputDate = new Date();
        this.formData.refocus = '';
    }

    /**
    * Override loadedCallback function to handle when HTML/CSS has been loaded.
    * @override
    */
    loadedCallback() {
        // Create form object
        this._form = new Form(this.formData, this);

        // Add inputs
        this._form.add('textString', 'inputTextString');
        this._form.add('textNumber', 'inputTextNumber');
        this._form.add('textAreaString', 'inputTextAreaString');
        this._form.add('checkBoxBoolean', 'inputCheckBoxBoolean');
        this._form.add('checkBoxNumber', 'inputCheckBoxNumber');
        this._form.add('checkBoxString', 'inputCheckBoxString');
        this._form.add('selectNumber', 'inputSelectNumber');
        this._form.add('selectString', 'inputSelectString');
        this._form.add('radioString', 'inputRadioString1');
        this._form.add('radioString', 'inputRadioString2');
        this._form.add('radioNumber', 'inputRadioNumber1');
        this._form.add('radioNumber', 'inputRadioNumber2');
        this._form.add('colorString', 'inputColorString');
        this._form.add('dateString', 'inputDateString');
        this._form.add('dateDate', 'inputDateDate');
        this._form.add('dateTimeLocalString', 'inputDateTimeLocalString');
        this._form.add('dateTimeLocalDate', 'inputDateTimeLocalDate');
        this._form.add('weekString', 'inputWeekString');
        this._form.add('timeString', 'inputTimeString');
        this._form.add('timeDate', 'inputTimeDate');
        this._form.add('dateAndTimeDate', 'inputDateAndTimeDate');
        this._form.add('dateAndTimeDate', 'inputDateAndTimeTime');
        this._form.add('monthString', 'inputMonthString');
        this._form.add('monthDate', 'inputMonthDate');
        this._form.add('numberString', 'inputNumberString');
        this._form.add('numberNumber', 'inputNumberNumber');
        this._form.add('rangeString', 'inputRangeString');
        this._form.add('rangeNumber', 'inputRangeNumber');
        this._form.add('yesNoNotSureString', 'customInputYesNoNotSure');
        this._form.add('dateInputDate', 'customInputDateInput', DateInput.formTranslateFunction);
        this._form.add('refocus', 'refocusInput');

        // Create template form
        this._templateForm = new Template('form', this);
        this._templateForm.update();

        // Create template refocus
        this._templateRefocus = new Template('testRefocus', this);
        this._templateRefocus.update();
    }

    /**
     * Clear form inputs event.
     */
    clearFormInputs() {
        // Clear the form so that all the inputs are blank/empty
        this._form.clear();
    }

    /**
     * Form to data event.
     */
    formToData() {
        // Transfer all the form input values into the data properties
        this._form.formToData();

        // Update the template HTML to update the values shown
        this._templateForm.update();

        // Refresh the form so that it contains the same values as before. The _formarForm.update function
        // rebuilds the HTML and the form input elements, so they will have been cleared
        this._form.refresh();
    }

    /**
     * Data to form event.
     */
    dataToForm() {
        // Transfer all the property values into the form inputs
        this._form.dataToForm();
    }

    /**
     * Refocus test event.
     */
    refocusTest() {
        // Get form data
        this._form.formToData();

        // Update the template refocus
        this._templateRefocus.update();

        // We need to refresh the form
        this._form.refresh();
    }
}
 
// Define controller web component
customElements.define('form-inputs-controller', FormInputsController);
