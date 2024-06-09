import { LightningElement,api,track,wire} from 'lwc';
import getGlobalReports from '@salesforce/apex/GlobalReportsController.getGlobalReports';
import userId from '@salesforce/user/Id';
import profile from '@salesforce/schema/User.Profile.Name';

const columns = [
    {label: "Date",fieldName: "CreatedDate",type: 'date',
    typeAttributes:{
        day:'numeric',
        month:'short',
        year:'numeric'}},
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
{label: "Working Hours",fieldName: "Working_Hours__c",type: 'customTimeFormatter'},
{label: "Task Name",fieldName: "Task_Name__c"},
    {label: "Task Details",fieldName: "Task_Details__c"},
    {label: "Task Approval Status",fieldName: "Approval_Status__c"},
    {label: "Leave Type",fieldName: "Leave_Type__c"},
    {label: "Reason for Leave",fieldName: "Reason_For_Leave__c"},
    {label: "Start Date",fieldName: "Start_Date__c",type: 'date',
    typeAttributes:{
        day:'numeric',
        month:'short',
        year:'numeric'}},
    {label: "End Date",fieldName: "End_Date__c",type: 'date',
    typeAttributes:{
        day:'numeric',
        month:'short',
        year:'numeric'}},
    {label: "Total Leave",fieldName: "Count_Leave_Day__c"},
    {label: "Leave Approval Status",fieldName: "Approval_Status__c"}
 
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

export default class GlobalReports extends LightningElement {
    @api recordId;
    user_Id=userId;
    columns = columns
    @track reportsData =  [];
    selectedDomain='';
    @track filteredReportsData=[];
    @track filterBy =''
    @track filterValue =''
    filterOptions = monthOptions;
    @track isFilterSelected=false;
    @track isFilterSelectedMonth=false
    @track selectedMonth = ''; 
    @track employeeOptions=[];
    @track suggestedEmployeeNames = [];
    
    
    domainOptions=[
        {label:'Java',value:'Java'},
        {label:'Python',value:'Python'},
        {label:'Mern Stack',value:'Mern Stack'},
        {label:'Data Science/Data Analyst',value:'Data Science/Data Analyst'},
        {label:'Salesforce',value:'Salesforce'}   
    ];

    @wire(getGlobalReports, {recordId: '$user_Id', fields: [profile] })
    wiredGlobalReports({ data, error }) { 
        if (data) {
            this.reportsData = data.map(record =>{
                let result = {
                    CreatedDate: record.AttendenceDetails?.CreatedDate||record.TaskDetails?.CreatedDate||record.LeaveDetails?.CreatedDate,
                    Employee_Name__c:record.AttendenceDetails?.Employee_Name__c||record.TaskDetails?.Employee_Name__c||record.LeaveDetails?.Employee_Name__c,
                    Domain__c:record.AttendenceDetails?.Domain__c||record.TaskDetails?.Domain__c,
                    CheckInTime__c:record.AttendenceDetails?.CheckInTime__c,
                    CheckOutTime__c:record.AttendenceDetails?.CheckOutTime__c,
                    Working_Hours__c:record.AttendenceDetails?.Working_Hours__c,
                    Task_Name__c:record.TaskDetails?.Task_Name__c,
                    Task_Details__c:record.TaskDetails?.Task_Details__c,
                    Approval_Status__c:record.TaskDetails?.Approval_Status__c,
                    Leave_Type__c:record.LeaveDetails?.Leave_Type__c,
                    Reason_For_Leave__c:record.LeaveDetails?.Reason_For_Leave__c,
                    Start_Date__c:record.LeaveDetails?.Start_Date__c,
                    End_Date__c:record.LeaveDetails?.End_Date__c,
                    Count_Leave_Day__c:record.LeaveDetails?.Count_Leave_Day__c,
                    Approval_Status__c:record.LeaveDetails?.Approval_Status__c
                };
                return result;
            }) ;
            this.filteredReportsData = [...this.reportsData];
            this.suggestEmployeeNames();
        } else if (error) {
            console.error('Error fetching reports:', error);
        }

    }
   /* extractEmployeeNames() {
        const domainFilteredReports = this.filteredReportsData.filter(record => record.Domain__c === this.selectedDomain);
        const uniqueNames = new Set(domainFilteredReports.map(record => record.Employee_Name__c));
        
    }*/
    suggestEmployeeNames() {
        const value = this.filterValue.toLowerCase();
        const uniqueNames = new Set(this.filteredReportsData.map(record => record.Employee_Name__c));
        this.employeeOptions = Array.from(uniqueNames).map(name => ({ label: name, value: name }));
        this.suggestedEmployeeNames = this.employeeOptions.filter(option =>
            option.label.toLowerCase().includes(value)
        );
    }
    handleDomainChange(event){
        this.selectedDomain = event.detail.value;
       // this.filterReportsData();
        
    }
    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
        this.filterReportsData();
        this.isFilterSelected = true;
    }
    filterByHandler(event) {
        this.filterBy = event.detail.value;
        this.filterValue = '' ;
        this.isFilterSelectedMonth = this.filterBy === 'selectedMonth';
        
         
    }
    filterHandler(event) {
        this.filterValue = event.target.value;
        if (this.filterBy === 'Employee_Name__c') {
            this.suggestEmployeeNames();
        }
        //this.filterReportsData();
       
    }
    
    handleSuggestionSelecect(event) {
        this.filterValue = event.currentTarget.textContent;
        this.suggestedEmployeeNames = [];
        this.isFilterSelected = true;
        this.filterReportsData();
    }
    filterReportsData() {
        this.filteredReportsData = [...this.reportsData];

        if (this.selectedDomain) {
            this.filteredReportsData = this.filteredReportsData.filter(report => 
                this.selectedDomain === 'Salesforce' 
                    ? report.Domain__c === 'Salesforce Developer' || report.Domain__c === 'Salesforce' 
                    : report.Domain__c === this.selectedDomain
            );
        }

        if (this.filterBy) {
            if (this.isFilterSelectedMonth) {
                if (this.selectedMonth) {
                    this.filteredReportsData = this.filteredReportsData.filter(report => 
                        new Date(report.CreatedDate).getMonth() + 1 === parseInt(this.selectedMonth)
                    );
                }
            } else if (this.filterValue) {
                this.filteredReportsData = this.filteredReportsData.filter(report => 
                    report[this.filterBy]?.toLowerCase().includes(this.filterValue.toLowerCase())
                );
            }
        }
    }

    get filterByOptions() {
        return [
            { label: 'Employee Name', value: 'Employee_Name__c' },
            { label: 'Month', value: 'selectedMonth' }
        ];
    }

    get inputType() {
        return this.isFilterSelectedMonth ? 'combobox' : 'text';
    }
    get suggestedEmployeeNames(){
        return this.filterBy === 'Employee_Name__c' && this.filterValue;
    }
    
    downloadReport() {
        const headers = this.columns.map(col => col.label);
        const keys = this.columns.map(col => col.fieldName);
         // Get all filtered tasks
        const filterGlobalReport =  this.filteredReportsData;

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

        filterGlobalReport.forEach(record => {
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
        downloadElement.download = 'Global Report Data.xls';

        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);

        // Refresh the page after download
        setTimeout(() => {
            location.reload();
        }, 4000); // Add a short delay to ensure download starts before the page reloads
    
    }
}