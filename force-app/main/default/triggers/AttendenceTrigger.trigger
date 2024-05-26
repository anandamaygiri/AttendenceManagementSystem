trigger AttendenceTrigger on Attendence__c (after insert) {
    if(Trigger.isInsert){
        if(Trigger.isAfter){
            //AttendenceTriggerHandler.createWpt(Trigger.new);
            AttendenceTriggerHandler.sendEmailNotification(Trigger.new);
        }
    }
}