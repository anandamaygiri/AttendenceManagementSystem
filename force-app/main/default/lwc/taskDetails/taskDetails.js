import { LightningElement,api,wire,track } from 'lwc';
import getTasks from '@salesforce/apex/tasDetailsController.getTasks';
import profile from "@salesforce/schema/User.Profile.Name";
import userId from "@salesforce/user/Id";
//import { exportCSVFile } from 'c/utils';
const columns = [
    {label: "Task Id",fieldName: "Name"},
    {label :"Employee Name",fieldName: "Employee_Name__c" ,
     cellAttributes: {
        iconName: "standard:user",
        iconPosition: "left"
      }
    },
    {label: "Domain Name",fieldName: "Domain__c"},
    {label: "Task Name",fieldName: "Task_Name__c"},
    {label: "Task Details",fieldName: "Task_Details__c"},
    {label: "Approval Status",fieldName: "Approval_Status__c"},
    ];

    const monthOptions = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' }
    ];

export default class TaskDetails extends LightningElement {
    @api recordId;
    user_id=userId;
    error;
    columns=columns;
    @track taskList=[];
    @track visibleTasks=[];
    @track employeeOptions = [];
    @track selectedEmployee = '';
    @track selectedMonth = ''; 
    @track isEmployeeSelected = false;
    @track isMonthSelected = false;
    filterOptions = monthOptions;
    columnHeader = ['Name', 'Employee_Name__c', 'Domain__c', 'Task_Name__c','Task_Details__c','Approval_Status__c' ]

    @wire(getTasks, { recordId: "$user_id", fields: [profile] })
    wiredTaskDetails({data,error}){
        if (data) {
            this.taskList = data;
            this.setEmployeeOptions(data);
            //this.selectedMonth(data);
            //this.visibleTasks = data;
            this.filterTasks();  
        } else if (error) {
            this.taskList = [];
            this.error = error;
        }
    }

    setEmployeeOptions(tasks) {
        const employees = [...new Set(tasks.map(task => task.Employee_Name__c))];
        this.employeeOptions = employees.map(emp => ({ label: emp, value: emp }));
    }
    handleEmployeeChange(event) {
        this.selectedEmployee = event.detail.value;
        this.isEmployeeSelected = true;
       // this.filterTasks();  if you want to show the data on the data table after select employee
    }
    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
        this.isMonthSelected=true;
        this.filterTasks();
    }

    filterTasks() {
        const filteredTasks = this.taskList.filter(task =>
            (this.selectedEmployee ? task.Employee_Name__c === this.selectedEmployee : true) &&
            (this.selectedMonth ? new Date(task.CreatedDate).getMonth() + 1 === parseInt(this.selectedMonth) : true)
        );
        //this.visibleTasks=filteredTasks
       this.template.querySelector('c-pagination').records = filteredTasks;
    }
    // pagination method for update records visibility 
    updateTaskHandler(event){
        this.visibleTasks=[...event.detail.records]
        console.log(event.detail.records)
    }

    downloadReport() {
        const headers = this.columns.map(col => col.label);
        const keys = this.columns.map(col => col.fieldName);
         // Get all filtered tasks
        const filteredTasks = this.template.querySelector('c-pagination').records;

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

        filteredTasks.forEach(record => {
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
        downloadElement.download = 'Task Data.xls';

        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);

        // Refresh the page after download
        setTimeout(() => {
            location.reload();
        }, 4000); // Add a short delay to ensure download starts before the page reloads
    
    }
     
}