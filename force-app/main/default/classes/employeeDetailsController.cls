public with sharing class employeeDetailsController {
    @AuraEnabled(cacheable=true)
    public static List<Attendence__c> getEmployees() {
      return [
        SELECT
          Id,
          Name,
          Employee_ID__c,
          Email_Id__c,
          Domain__c,
          Date_Of_Joining__c
        FROM Attendence__c
        WHERE Employee_ID__c!= Null
        WITH SECURITY_ENFORCED
      ];
      }
}