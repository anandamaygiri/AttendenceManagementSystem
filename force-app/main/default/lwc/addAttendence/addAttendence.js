import { LightningElement,track,api,wire } from 'lwc';
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";
import {NavigationMixin} from "lightning/navigation";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAttendenceDetails from '@salesforce/apex/checkInController.getAttendenceDetails';
import checkIn from '@salesforce/apex/checkInController.checkIn';
import hasApprovedLeave from '@salesforce/apex/checkInController.hasApprovedLeave';
import userId from '@salesforce/user/Id';


export default class AddAttendence extends NavigationMixin(LightningElement) {
    @api recordId;
    @api errorMessage;
    @api userId;
    @track isOnLeave = false;
    @track isButtonVisible = false;  // Define a property to track button visibility
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

    async handleCheckIn() {
      if (this.isOnLeave) {
        this.showToast('Error', 'You are on leave today.', 'error');
        return;
    }

      try {
          const result = await getAttendenceDetails({ userId: userId });
          if (result.length > 0) {
              this.showToast('Error', 'You are already checked in.', 'error');
          } else {
              await checkIn({ recordId: userId });
              this.showToast('Success', 'Check-in successful', 'success');
          }
      } catch (error) {
          console.error('Error:', error);
          this.showToast('Error', 'An error occurred while checking in.', 'error');
      }
  }

  showToast(title, message, variant) {
      const toastEvent = new ShowToastEvent({ title, message, variant });
      this.dispatchEvent(toastEvent);
  }
      handleCreateTask(){
        if (this.isOnLeave) {
          this.showToast('Error', 'You are on leave today.', 'error');
          return;
      }

        const defaultValues = encodeDefaultFieldValues({
          Task__c: this.recordId
        });
        this[NavigationMixin.Navigate]({
          type: "standard__objectPage",
          attributes: {
            objectApiName: "Task__c",
            actionName: "new"
          },
          state: {
            defaultFieldValues: defaultValues
          }
        });

      }

      createLeaveRequest(){
        if (this.isOnLeave) {
          this.showToast('Error', 'You are on leave today.', 'error');
          return;
      }


        const defaultValues = encodeDefaultFieldValues({
          Leave_Request__c: this.recordId
        });
        this[NavigationMixin.Navigate]({
          type: "standard__objectPage",
          attributes: {
            objectApiName: "Leave_Request__c",
            actionName: "new"
          },
          state: {
            defaultFieldValues: defaultValues
          }
        });
      }
}