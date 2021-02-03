import {LightningElement, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ORDER_OBJECT from '@salesforce/schema/Order__c';
import TOTAL_PRICE_FIELD from '@salesforce/schema/Order__c.TotalPrice__c';
import PAYMENT_TYPE_FIELD from '@salesforce/schema/Order__c.PaymentType__c';
import PAYMENT_PERIOD_FIELD from '@salesforce/schema/Order__c.PaymentPeriod__c';
import CLIENT_ID_FIELD from '@salesforce/schema/Order__c.Client__c';

export default class NewOrder extends LightningElement {
    orderObjectName = ORDER_OBJECT;
    totalPriceFieldName= TOTAL_PRICE_FIELD;
    paymentTypeFieldName = PAYMENT_TYPE_FIELD;
    paymentPeriodFieldName= PAYMENT_PERIOD_FIELD;
    clientIdFieldName= CLIENT_ID_FIELD;

    @track clientId;

    handleOnClientSelected(event) {
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
