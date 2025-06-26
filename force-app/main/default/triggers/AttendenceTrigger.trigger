trigger AttendenceTrigger on Attendence__c (before insert,after insert) {
    if (Trigger.isInsert && Trigger.isAfter) {
        AttendenceTriggerHandler.sendEmailNotification(Trigger.new);
    }
    if (Trigger.isInsert && Trigger.isBefore) {
        //AttendenceTriggerHandler.preventAttendence(Trigger.new);
    }
}