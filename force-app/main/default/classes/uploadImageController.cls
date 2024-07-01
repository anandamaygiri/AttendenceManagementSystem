public with sharing class uploadImageController {
    @AuraEnabled
    public static void uploadImage(String base64, String filename, String recordId) {
      try {
        String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="' + filename + '"></img></p>';
        Attendence__c attendence = [SELECT Id, Image__c FROM Attendence__c WHERE Id =: recordId LIMIT 1];
        attendence.Image__c = imageLink; 
        UPDATE attendence;
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
     }
}