public class GlobalReportsController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String,Object>>  getDailyReports() {
        Map<Date,Map<String,Object>> DateToRecordMap = new Map<Date,Map<String,Object>>();
        
        // Query Attendance Details 
        List<Attendence_Details__c> attendenceDetails = [SELECT Id, Employee_Name__c, Domain__c, CheckInTime__c, CheckOutTime__c, Working_Hours__c, CreatedDate
                                              FROM Attendence_Details__c
                                               
                                              ORDER BY CreatedDate DESC];
        for (Attendence_Details__c record : attendenceDetails) {
             Date recordDate = record.CreatedDate.date(); 
             if(!DateToRecordMap.containsKey(recordDate)){
                DateToRecordMap.put(recordDate,new Map<String,Object>());
             } 
            Map<String,Object> margedRecord = DateToRecordMap.get(recordDate);
            margedRecord.put('AttendenceDetails',record);
        }

        // Query Task Details
        List<Task__c> taskDetails = [SELECT Id, Task_Name__c, Task_Details__c,Employee_Name__c, Domain__c, Approval_Status__c, CreatedDate
                                  FROM Task__c
                            
                                  ORDER BY CreatedDate DESC];
        for (Task__c record : taskDetails) {
             
            Date recordDate = record.CreatedDate.date(); 
             if(!DateToRecordMap.containsKey(recordDate)){
                DateToRecordMap.put(recordDate,new Map<String,Object>());
             }
            Map<String,Object> margedRecord = DateToRecordMap.get(recordDate);
            margedRecord.put('TaskDetails',record);
        }

        // Query Leave Requests
        List<Leave_Request__c> leaveRequests = [SELECT Id, Leave_Type__c, Reason_For_Leave__c,Start_Date__c,End_Date__c, Count_Leave_Day__c,Employee_Name__c, Approval_Status__c, CreatedDate
                                                   FROM Leave_Request__c
                                                    
                                                   ORDER BY CreatedDate DESC];
        for (Leave_Request__c record : leaveRequests) { 
            Date recordDate = record.CreatedDate.date(); 
             if(!DateToRecordMap.containsKey(recordDate)){
                DateToRecordMap.put(recordDate,new Map<String,Object>());
             }
            Map<String,Object> margedRecord = DateToRecordMap.get(recordDate);
            margedRecord.put('LeaveDetails',record);
        }

        return new List<Map<String, Object>>(DateToRecordMap.values());
    }
}