public with sharing class checkInController {
    @AuraEnabled(cacheable=false)
    public static Attendence_Details__c checkIn(String recordId) {
        try {
            // Check if the user is already checked in
            List<Attendence_Details__c> existingRecords = [
                SELECT Id,CheckInTime__c,CheckOutTime__c
                FROM Attendence_Details__c
                WHERE CheckOutTime__c = null
                AND CreatedById = :recordId  
            ];
            
            if (!existingRecords.isEmpty()) {
                // User is already checked in
                throw new AuraHandledException('You are already checked in.');
            } else {
                // Proceed with check-in
                Attendence_Details__c att = new Attendence_Details__c();
                att.CheckInTime__c = DateTime.now();
                insert att;
                return att;
            }
        } catch (Exception e) {
            System.debug('Unable to update the records: ' + e.getMessage());
            throw new AuraHandledException('Unable to update the records: ' + e.getMessage());
        }
    }


    @AuraEnabled (cacheable=true)
  public static List<Attendence_Details__c> getAttendenceDetails(String userId) {
    return [
      SELECT Id,
        CheckOutTime__c,CreatedById
      FROM Attendence_Details__c
      WHERE CheckOutTime__c = Null AND CreatedById = :userId
      WITH SECURITY_ENFORCED
    ];
    }

    @AuraEnabled(cacheable=true)
    public static Boolean hasApprovedLeave(String userId) {
        Date today = Date.today();
        List<Leave_Request__c> leaveRequests = [
            SELECT Id FROM Leave_Request__c 
            WHERE CreatedById = :userId 
            AND Approval_Status__c = 'Approved' 
            AND Start_Date__c <= :today 
            AND End_Date__c >= :today
        ];
        return leaveRequests.size() > 0;
    }
}