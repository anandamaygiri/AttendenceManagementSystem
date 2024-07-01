public class DailyReport {
    @AuraEnabled
    public Date reportDate;
    @AuraEnabled
    public List<Attendence_Details__c> attendanceRecords;
    @AuraEnabled
    public List<Task__c> taskRecords;
    @AuraEnabled
    public List<Leave_Request__c> leaveRequestRecords;
 
    public DailyReport(Date reportDate) {
        this.reportDate = reportDate;
        this.attendanceRecords = new List<Attendence_Details__c>();
        this.taskRecords = new List<Task__c>();
        this.leaveRequestRecords = new List<Leave_Request__c>();
    }

}