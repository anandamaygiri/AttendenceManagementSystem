public  class checkOutController {
    @AuraEnabled(cacheable=false)
    public static Attendence_Details__c checkOut(String recordId) {
        System.debug(recordId);
        Attendence_Details__c att ;
        try{
            List<Attendence_Details__c> attList = [SELECT Id,CheckOutTime__c FROM Attendence_Details__c WHERE Id=:recordId ];
            if(attList.size()>0){
                att = attList[0];
                att.CheckOutTime__c = DateTime.now();
                upsert att;
            }
            
        }
        catch(Exception e){
            System.debug('Unable to update the records'+e.getMessage());
        }
        return att;
    }


    @AuraEnabled 
  public static List<Attendence_Details__c> getAttendenceDetails(String userId) {
    return [
      SELECT Id,
        CheckOutTime__c
      FROM Attendence_Details__c
      WHERE CheckOutTime__c= Null AND CreatedById = :userId
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
    }
}