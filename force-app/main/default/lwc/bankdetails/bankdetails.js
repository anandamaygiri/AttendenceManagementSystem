import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import UpdateBankdetails from '@salesforce/apex/NewCandidateDetails.UpdateBankdetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Bankdetails extends NavigationMixin(LightningElement) {
    @api recordId
    @track errorMessage='';
    @track bankRecord = {
        accountholderName:"",
        IFSCcode:"",
        branchName:"",
        accountNumber:"",
        bankName:"",
        errors:{
            IFSCcode:"",
            accountNumber:"",
        }
    };

    connectedCallback() {
        if (this.recordId) {
          console.log("Reccc--->", this.recordId);
          console.log("Record received successfully");
        } 
        else
        {
          console.log("Record not found");
        }
      }

      validateIFSCCode(ifscCode) {
        const IFSC_CODE_PATTERN = /^[A-Za-z]{4}\d{7}$/;
        return IFSC_CODE_PATTERN.test(ifscCode);
    }
    validateAccountNumber(accountNumber) {
        const ACCOUNT_NUMBER_PATTERN = /^\d{9,18}$/;
        return ACCOUNT_NUMBER_PATTERN.test(accountNumber);
    }
    handleInputChange(event)
    {
      if(event.target.name=='accountholderName')
        this.bankRecord.accountholderName = event.target.value;
        console.log('Account holder name--->' , this.bankRecord.accountholderName);
    if(event.target.name=='IFSCcode'){
        this.bankRecord.IFSCcode = event.target.value;
    }
    if(event.target.name=='branchName')
        this.bankRecord.branchName = event.target.value;
    if(event.target.name=='accountNumber')
        this.bankRecord.accountNumber = event.target.value;
    if(event.target.name=='bankName')
        this.bankRecord.bankName = event.target.value;
}
validateForm() {
    let isValid = true;
    const inputFields = this.template.querySelectorAll('lightning-input');
    inputFields.forEach(field => {
        if (!field.reportValidity()) {
            isValid = false;
        }
    });
    if (!this.validateIFSCCode(this.bankRecord.IFSCcode)) {
       // this.displayToastMessage("Error", "Invalid IFSC format", "error");
       this.bankRecord.errors.IFSCcode="Invalid IFSC Code";
        isValid = false;
    }
    if (!this.validateAccountNumber(this.bankRecord.accountNumber)) {
       // this.displayToastMessage("Error", "Invalid Account Number", "error");
       this.bankRecord.errors.accountNumber="Invalid Account Number";
        isValid = false;
    }
    return isValid;
}
    handleClick() {
        if (this.validateForm()) {
            UpdateBankdetails({ wrapRecord: JSON.stringify(this.bankRecord),
                recordId: this.recordId
                })
                    .then(result => {
                        console.log('Result:' + JSON.stringify(result));
                        //this.recordId=result
                        if(result == 'success'){
                            this.displayToastMessage("Success", "Bank details were successfully entered", "success");
                            console.log("Result:" + JSON.stringify(this.bankRecord));
                            if (this.recordId) {
                            this.isRecordIdAvailable = true;
                            } 
                            //after saving record refresh the page
                            setTimeout(() => {
                                location.reload();
                            }, 4000);
                        } 
                        })
                    .catch((error) => {
                        console.log("Error----" + JSON.stringify(error.message));
                    this.displayToastMessage("Error", "Error in saving Bank details", "error");
                });
        }
        else {
            this.displayToastMessage("Error", "Please enter all the details correctly!", "error");
        }
    } 
    displayToastMessage(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }       
}