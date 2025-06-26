trigger TaskTrigger on Task__c (after insert) {
    if(Trigger.isInsert){
        if(Trigger.isAfter){
            //TaskTriggerHandler.createAttDetailsRecord(Trigger.new);
            
        }
    }

}