import { LightningElement,api,track,wire } from 'lwc';
import getLeaveRequests from '@salesforce/apex/leaveDetailsController.getLeaveRequests';
import profile from "@salesforce/schema/User.Profile.Name";
import userId from "@salesforce/user/Id";
const columns = [
    {label :"Employee Name",fieldName: "Employee_Name__c",
    cellAttributes: {
        iconName: "standard:user",
        iconPosition: "left"
      }
      },
    {label :"Leave Request No",fieldName: "Name"},
    {label: "Leave Type",fieldName: "Leave_Type__c"},
    {label: "Reason for Leave",fieldName: "Reason_For_Leave__c"},
    {label: "Total Leave",fieldName: "Count_Leave_Day__c"},
    {label: "Approval Status",fieldName: "Approval_Status__c", cellAttributes:{
        class:{fieldName: 'rowColor'}
    }},
    ];

export default class LeaveTracker extends LightningElement {
    @api recordId;
    user_id=userId;
    error;
    columns=columns;
    @track leaveList;
    visibleLeaves
    @wire(getLeaveRequests, { recordId: "$user_id", fields: [profile] })
    wiredLeaveDetails(result,error){
        if(result){
            console.log(result);
            this.leaveList = result;
            //row color method 
        }
        
        if(error){
            console.error(error)
            this.leaveList = undefined;
        }
    }
    updateLeaveHandler(event){
        this.visibleLeaves=[...event.detail.records]
    } 
}