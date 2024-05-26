public class AttendenceTriggerHandler {
   /* public static void createWpt(List<Attendence__c> attList){
        List<Weekly_Progress_Tracker__c> wptList = new List<Weekly_Progress_Tracker__c>();
        for(Attendence__c att: attList){
            Weekly_Progress_Tracker__c wpt = new Weekly_Progress_Tracker__c();
            wpt.Employee_ID__c = att.Employee_ID__c;
            wpt.Name = att.Name;
            wpt.Employe_Name__c = att.Id;
            wpt.Email__c = att.Email_Id__c;
            wptList.add(wpt);
          }
         if(!wptList.isEmpty()){
            insert wptList;
        }
    }*/
    public static void sendEmailNotification(List<Attendence__c> attList){
        List<Messaging.Email> emailList = new List<Messaging.Email>();
        for(Attendence__c att: attList){
            if(att.Email_Id__c != null){
                Messaging.SingleEmailMessage emailMsg = new Messaging.SingleEmailMessage();
                String[] toAddress = new String[]{att.Email_Id__c};
                emailMsg.setToAddresses(toAddress);
                String emailSub = att.Name + ' Attendence Submittion ';
                emailMsg.setSubject(emailSub);
                String content = 'Hi !' + att.Name +',<br/> <br/>'+
                    'Your Attendence Submitted Successfully. <br/> <br/>' +
                    'I hope you are doing well <br/> <br/>' +
                    'Happy larning !! <br/> <br/>' +
                    'Thank You! <br/> <br/>';
                emailMsg.setHtmlBody(content);
                emailList.add(emailMsg);
            }
        }
        Messaging.sendEmail(emailList);
    }
    
}