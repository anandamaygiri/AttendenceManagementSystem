import { LightningElement,api,track,wire } from 'lwc';
import getEmployees from '@salesforce/apex/employeeDetailsController.getEmployees';
import userId from '@salesforce/user/Id';
import profile from '@salesforce/schema/User.Profile.Name';

const columns = [
{label :"Employee Name",fieldName: "Name",
 cellAttributes: {
    iconName: "standard:user",
    iconPosition: "left"
  }
},
{label: "Employee Id",fieldName: "Employee_ID__c"},
{label: "Domain",fieldName: "Domain__c"},
{label: "Email",fieldName: "Email_Id__c",type: "email"},
];

export default class EmployeeDetails extends LightningElement {
    @api recordId;
    error;
    user_id=userId;
    columns=columns;
    @track employeeList;
    @wire(getEmployees, { recordId: "$user_id", fields: [profile] })
    wireEmployeeDetails(result){
        this.employeeList = result;
        if(result.error){
            this.employeeList = undefined;
        }
    }

}