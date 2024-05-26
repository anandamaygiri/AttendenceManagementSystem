public class leaveDetailsController {
    @AuraEnabled(cacheable=true)
  public static List<Leave_Request__c> getLeaveRequests() {
    return [
      SELECT
        Id,
        Name,
        Employee_Name__c,
        Leave_Type__c,
        Reason_For_Leave__c,
        Count_Leave_Day__c,
        Approval_Status__c
      FROM Leave_Request__c
      WHERE End_Date__c!= Null
      WITH SECURITY_ENFORCED
      ORDER BY  Name DESC
    ];
    }
} 