public class attendenceDetailsController {
  @AuraEnabled(cacheable=true)
  public static List<Attendence_Details__c> getAttendence() {
    return [
      SELECT
        Id,  
        Name,
        Employee_Name__c,
        CheckInTime__c,
        CheckOutTime__c,
        Working_Hours__c,
        Domain__c
      FROM Attendence_Details__c
      WITH SECURITY_ENFORCED
      ORDER BY CheckInTime__c DESC
    ];
    }
}