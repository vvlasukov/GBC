import {LightningElement, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class NewOrder extends LightningElement {
    @track totalPrice;
    @track paymentType;
    @track paymentPeriod;
    @track clientId;

    handleOnSelected(event) {
        this.clientId = event.detail[0];
    }

    handleOnSubmit(event) {
        event.preventDefault();

        if (this.clientId) {
            const fields = event.detail.fields;

            fields.Client__c = this.clientId;

            this.template.querySelector('lightning-record-edit-form').submit(fields);

            this.dispatchEvent(new ShowToastEvent({
                title: 'Order is created',
                variant: 'success',
            }));

            this.resetFields();
        }
    }

    validateCustomLookup() {
        this.template.querySelector('c-custom-account-lookup').isValid();
    }

    resetFields() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }

        let customLookupElem = this.template.querySelector('c-custom-account-lookup')

        if (customLookupElem) {
            customLookupElem.value = null;
        }
    }
}
