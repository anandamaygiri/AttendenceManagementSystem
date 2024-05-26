import { LightningElement, api, track, wire } from 'lwc';
import getAttendence from '@salesforce/apex/attendenceDetailsController.getAttendence';
import userId from '@salesforce/user/Id';
import profile from '@salesforce/schema/User.Profile.Name';
import {refreshApex} from '@salesforce/apex';

const columns = [
{label: "Attendence Id",fieldName: "Name" },
{label :"Employee Name",fieldName: "Employee_Name__c",
 cellAttributes: {
    iconName: "standard:user",
    iconPosition: "left"
  }
},
{label: "Domain Name",fieldName: "Domain__c"},
{label: "Check In",fieldName: "CheckInTime__c",type: 'date',
typeAttributes:{
    day:'numeric',
    month:'short',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:true}},
{label: "Check Out",fieldName: "CheckOutTime__c",type: 'date',
typeAttributes:{
    day:'numeric',
    month:'short',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:true}},
{label: "Working Hours",fieldName: "Working_Hours__c",type: 'customTimeFormatter'}
]; 
export default class AttendenceDetails extends LightningElement {
    @api recordId;
    error;
    user_id=userId;
    columns=columns;
    @track attendenceList=[];
    @track visibleAttendences=[]
    timer
    filterBy 
    filterValue
    @track isFilterSelected=false
    @wire(getAttendence, { recordId: "$user_id", fields: [profile] })
    wireAttendenceDetails(result) {
        if (result.data) {
            this.attendenceList = result.data;
            this.visibleAttendences = result.data;
            this.applyFilter()
        } else if (result.error) {
            this.attendenceList = [];
            this.error = result.error;
        }
    }

    updateAttendenceHandler(event) {
        this.visibleAttendences = [...event.detail.records];
    }

    get filterByOptions() {
        return [
            { label: 'Employee Name', value: 'Employee_Name__c' },
            { label: 'Check In date', value: 'CheckInTime__c' }
        ];
    }

    get inputType() {
        return this.filterBy === 'CheckInTime__c' ? 'date' : 'text';
    }

    filterByHandler(event) {
        this.filterBy = event.detail.value;
        this.filterValue = '';
    }

    filterHandler(event) {
        this.filterValue = event.target.value;
        this.applyFilter();
        this.isFilterSelected=true

    }

    applyFilter() {
        let value = this.filterValue;
        if (value) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this.visibleAttendences = this.attendenceList.filter(eachObj => {
                    const val = eachObj[this.filterBy] ? eachObj[this.filterBy] : '';
                    if (this.filterBy === 'CheckInTime__c') {
                        return new Date(val).toISOString().split('T')[0] === value;
                    } else {
                        return val.toLowerCase().includes(value.toLowerCase());
                    }
                });
                // Pass filtered records to pagination component
                this.template.querySelector('c-pagination').records = this.visibleAttendences;
            }, 500);
        } else {
            this.visibleAttendences = [...this.attendenceList];
            // Pass all records to pagination component
            this.template.querySelector('c-pagination').records = this.visibleAttendences;
        }
    }

    downloadReport() {
        const headers = this.columns.map(col => col.label);
        const keys = this.columns.map(col => col.fieldName);
         // Get all filtered tasks
        const filterAttendence =  this.visibleAttendences;

        // Create a table with headers and rows
        let table = '<table>';
        // Add styles for the table
        table += '<style>';
        table += 'table, th, td {';
        table += '    border: 1px solid black;';
        table += '    border-collapse: collapse;';
        table += '}';          
        table += '</style>';
        // Add all the Table Headers
        table += '<tr>';
        headers.forEach(header => {
            table += `<th>${header}</th>`;
        });
        table += '</tr>';

        filterAttendence.forEach(record => {
            table += '<tr>';
            keys.forEach(key => {
                let value = record[key] === undefined ? '' : record[key];
                value = value.toString().replace(/"/g, '""');
                table += `<td>${value}</td>`;
            });
            table += '</tr>';
        });
        table += '</table>';

        let element = 'data:application/vnd.ms-excel,' + encodeURIComponent(table);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        downloadElement.download = 'Attendence Data.xls';

        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);

        // Refresh the page after download
        setTimeout(() => {
            location.reload();
        }, 4000); // Add a short delay to ensure download starts before the page reloads
    
    }

}