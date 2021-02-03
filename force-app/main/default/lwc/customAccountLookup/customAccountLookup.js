import {LightningElement, api} from 'lwc';

export default class CustomAccountLookup extends LightningElement {
    @api sObjectName;
    @api fieldName;
    @api value;
    @api required = false;

    handleOnChange(event) {
        this.dispatchEvent(
            new CustomEvent('selected', {
                detail: event.detail.value
            }));
    }

    @api isValid() {
        if (this.required) {
            this.template.querySelector('lightning-input-field').reportValidity();
        }
    }
}
