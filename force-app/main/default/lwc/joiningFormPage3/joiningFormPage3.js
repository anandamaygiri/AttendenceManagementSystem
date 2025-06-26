import { LightningElement , track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import updateOtherinfo from '@salesforce/apex/NewCandidateDetails.updateOtherinfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class JoiningFormPage3 extends NavigationMixin(LightningElement) {
    @api recordId;
    @track isRecordIdAvailable = false;
    @track otherInfoRecord = {
        speak :[],
        read:[],
        write:[],
        games:"",
        socialActivities:"",
        hobbies:"",
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
          options = [
                { label: 'Bengali', value: 'Bengali'},
                { label: 'English', value: 'English' },
                { label: 'Hindi', value: 'Hindi'},
                { label: 'Kannada', value: 'Kannada'},
                { label: 'Telugu/Tamil', value: 'Telugu/Tamil'}
        ];
        handleInputChange(event)
        {
            const { name, value } = event.target;
            if (name === 'speak' || name === 'read' || name === 'write') {
                this.otherInfoRecord[name] = event.detail.value; 
            } else {
                this.otherInfoRecord[name] = value;
            }
            console.log('${name} --->', this.otherInfoRecord[name]);
    }
 
handleClick() {
        console.log('Entered record-----' + JSON.stringify(this.otherInfoRecord));
        console.log("Record ID--->", this.recordId);
    if (this.otherInfoRecord) {
        updateOtherinfo({ wrapRecord: JSON.stringify(this.otherInfoRecord),
            recordId: this.recordId
            })
                .then(result => {
                    console.log('Result:' + JSON.stringify(result));
                    //this.recordId=result
                    if(result == 'success'){
                        const showSuccess = new ShowToastEvent({
                            title: 'Success',
                            message: 'OthersInfo details were successfully entered',
                            variant: 'Success',
                        });
                        this.dispatchEvent(showSuccess);
                        console.log("Result:" + JSON.stringify(this.otherInfoRecord));
                        if (this.recordId) {
                        this.isRecordIdAvailable = true;
                        } 
                    } 
                    })
                .catch((error) => {
                    console.log("Error----" + JSON.stringify(error.message));
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Error",
                        message: "Error in saving  Post Graduation details: " + error.message,
                        variant: "error",
                    })
                );
            });
    }
    else {
            const showFailure = new ShowToastEvent({
                title: 'Failure',
                message: 'Please enter all the details correctly!!',
                variant: 'Failed',
            });
            this.dispatchEvent(showFailure);
    }
}
}