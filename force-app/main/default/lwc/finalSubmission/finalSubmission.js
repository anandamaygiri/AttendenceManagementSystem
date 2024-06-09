import { LightningElement ,track,api,wire } from 'lwc';
import checkOut from '@salesforce/apex/checkOutController.checkOut';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import userId from '@salesforce/user/Id';
import profile from '@salesforce/schema/User.Profile.Name';
import hasApprovedLeave from '@salesforce/apex/checkInController.hasApprovedLeave';
import getAttendenceDetails from '@salesforce/apex/checkOutController.getAttendenceDetails';

export default class FinalSubmission extends LightningElement {
@track recordId;
@api errorMessage;  
@api userId;
@track isOnLeave = false;    // Define a property to track button visibility
isButtonVisible = false;
    // Get the current time
    connectedCallback() {
        // Call a method to check visibility when the component is connected to the DOM
        this.checkButtonVisibility();
        this.checkLeaveStatus()
    }

    async checkLeaveStatus() {
        try {
            const result = await hasApprovedLeave({ userId: userId });
            this.isOnLeave = result;
        } catch (error) {
            console.error('Error checking leave status:', error);
        }
    }
  
checkButtonVisibility() {
    // Get the current time
    const currentTime = new Date();

    // Define the start and end time for button visibility
    const startTime = new Date(); // Replace this with your desired start time
    startTime.setHours(7); // Example: 8 AM
    startTime.setMinutes(0);
    startTime.setSeconds(0);

    const endTime = new Date(); // Replace this with your desired end time
    endTime.setHours(20); // Example: 5 PM
    endTime.setMinutes(45);
    endTime.setSeconds(0);

    // Check if the current time is within the defined time period
    if (currentTime >= startTime && currentTime <= endTime) {
        this.isButtonVisible = true;
    } else {
        this.isButtonVisible = false;
    }
}
//@wire(getAttendenceDetails, { recordId : userId ,userId: userId, fields: [profile] })
handleCheckOut( ){
    if (this.isOnLeave) {
        this.showToast('Error', 'You are on leave today.', 'error');
        return;
    }
    //get the attendence details where check out field value is null
    getAttendenceDetails({ userId: userId })
            .then(result => {
                if (result.length > 0) {
                    const attId = result[0].Id;
                    //perform the update opration of checkout field
                    checkOut({ recordId: attId })
                        .then(() => {
                            //showing success popup
                            const successEvent = new ShowToastEvent({
                                title: 'Success',
                                message: 'Checkout successful',
                                variant: 'success'
                            });
                            this.dispatchEvent(successEvent);
                            return refreshApex(result);
                        })
                        .catch(error => {
                            this.errorMessage = error;
                            console.error('Error updating record: ' + JSON.stringify(this.errorMessage));
                        });
                } else {
                    //console.error('No attendance record found for the user.');
                    const successEvent = new ShowToastEvent({
                        title: 'error',
                        message: 'No attendance record found for the user',
                        variant: 'error'
                    });
                    this.dispatchEvent(successEvent);
                }
            })
            .catch(error => {
                console.error('Error fetching attendance details: ' + JSON.stringify(error));
            });
    }
}
