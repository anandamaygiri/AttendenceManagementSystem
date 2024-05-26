public class tasDetailsController {
    @AuraEnabled(cacheable=true)
  public static List<Task__c> getTasks() {
    return [
      SELECT
        Id,
        Name,
        Employee_Name__c,
        Task_Name__c,
        Task_Details__c,
        Upload_Document__c,
        Approval_Status__c,
        Domain__c,
        CreatedDate
      FROM Task__c
      WHERE Task_Name__c!= Null
      WITH SECURITY_ENFORCED
      ORDER BY  Name DESC
    ];
    }
}