public class NewCandidateDetails {
    
    @AuraEnabled
    public static Id personalInfo(String wrapRecord)
    {
        NewCandidateDetailsWrapper.personalInfo obj = (NewCandidateDetailsWrapper.personalInfo)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.personalInfo.class);
        System.debug('Received Wrapper----' + wrapRecord);
        
        
        Joining_form_details__c rec = new Joining_form_details__c();
        //rec.Id = obj.recordId;
        rec.Name_Mr_Miss_Mrs__c = obj.name;
        rec.Mother_Name__c = obj.motherName;
        rec.Father_Name__c = obj.fatherName;
        rec.Present_Address__c = obj.presentAddress;
        rec.Permanent_Address_As_per_Aadhar_Card__c  = obj.permananentAddress;
        rec.Email_Id__c = obj.email;
        rec.Contact_Number__c = obj.contactNumber;
        rec.Alternative_Contact_Number__c = obj.altContactNumber;
        rec.What_s_App_Number__c = obj.whatsappNumber;
        rec.Parent_s_Contact_Number_Father_Mother__c = obj.parentContactNumber;
        rec.Gender__c = obj.gender;
        rec.Date_of_Birth__c = obj.dateOfBirth;
        rec.Blood_Group__c = obj.bloodGroup;
        rec.Religion__c = obj.religion;
        rec.Aadhar_Card_Number__c = obj.aadhaarNumber;
        rec.Pan_Card_No__c = obj.panNumber;
        rec.Voter_Id_Card_No__c = obj.voterIdNumber;
        rec.Passport_No__c = obj.passportNumber;
        //   rec.Please_upload_your_picture__c = obj.image; 
        insert rec;
        System.debug('Record ID--->' + rec.Id);
        return rec.Id;
    }

        @AuraEnabled
        public static void uploadImage(String base64, String filename, String recordId) {
          try {
            String imageLink = '<p><img src="data:image/jpeg;base64,' + base64 + '" alt="' + filename + '"></img></p>';
            Joining_form_details__c image = [SELECT Id, Please_upload_your_picture__c FROM Joining_form_details__c WHERE Id =: recordId LIMIT 1];
            image.Please_upload_your_picture__c = imageLink; 
            UPDATE image;
          } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
          }
         }
    @AuraEnabled
    public static String familyBackground(String recordId,String wrapRecord)
    {
        NewCandidateDetailsWrapper.familyBackground obj1 =(NewCandidateDetailsWrapper.familyBackground)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.familyBackground.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId);
        if(recordId != Null && recordId != '')
        {
            List<Joining_form_details__c> rec1 = [select Id,
                                                  Father_s_Name__c,
                                                  Father_Age__c,
                                                  Father_Education_Occupation__c,
                                                  Mother_s_Name__c,
                                                  Mother_Age__c,
                                                  Mother_Education_Occupation__c,
                                                  Sister_s_Name__c,Sister_Age__c,
                                                  Sister_Education_Occupation__c,
                                                  Brother_s_Name__c,
                                                  Brother_Age__c,
                                                  Brother_Education_Occupation__c from Joining_form_details__c where Id =: recordId];
            System.debug('Record to be updated----' + rec1);
            List<Joining_form_details__c> recList=new  List<Joining_form_details__c>();
            for(Joining_form_details__c j: rec1)
            {
                j.Father_s_Name__c = obj1.fatherName;
                j.Father_Age__c = obj1.fatherAge;
                j.Father_Education_Occupation__c = obj1.fatherEducationOccupation;
                j.Mother_s_Name__c = obj1.motherName;
                j.Mother_Age__c = obj1.motherAge;
                j.Mother_Education_Occupation__c = obj1.motherEducationOccupation;
                j.Sister_s_Name__c = obj1.sisterName;
                j.Sister_Age__c = obj1.sisterAge;
                j.Sister_Education_Occupation__c = obj1.sisterEducationOccupation;
                j.Brother_s_Name__c = obj1.brotherName;
                j.Brother_Age__c = obj1.brotherAge;
                j.Brother_Education_Occupation__c = obj1.brotherEducationOccupation;
                recList.add(j);
            }
            if(recList.size()>0){
                update recList;
            }
            
            return 'success';
        }
        else
            return 'Update Failed';
    }
    
    @AuraEnabled
    public static String updateSSC(String recordId,String wrapRecord)
    {
        NewCandidateDetailsWrapper.ssc obj2 =(NewCandidateDetailsWrapper.ssc)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.ssc.class);
		System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId);        
		if(recordId != Null && recordId != '')
        {
            List<Joining_form_details__c> rec2 = [select Id,
                                                 State_of_SSC_board__c,
                                                 Name_of_SSC_board__c,
                                                 Name_of_SSC_school__c,
                                                 State_of_SSC_school__c,
                                                 City_District_of_SSC_school__c,
                                                 Period_from_Too_SSC__c,
                                                 Percentage_CGPA_of_SSC__c,
                                                 Date_Month_Year_of_passing__c from Joining_form_details__c where Id = :recordId];
                        System.debug('Record to be updated----' + rec2);
			List<Joining_form_details__c> recList1=new  List<Joining_form_details__c>();
            for(Joining_form_details__c q: rec2)
            {
                q.State_of_SSC_board__c = obj2.stateofSSCboard;
                q.Name_of_SSC_board__c = obj2.nameofSSCboard;
                q.Name_of_SSC_school__c = obj2.nameofSSCschool;
                q.State_of_SSC_school__c = obj2.stateofSSCschool;
                q.City_District_of_SSC_school__c = obj2.citydistrictofSSCschool;
                q.Period_from_Too_SSC__c = obj2.periodfromtooSSC;
                q.Percentage_CGPA_of_SSC__c = obj2.percentagecgpaSSC;
                q.Date_Month_Year_of_passing__c = obj2.datemonthyearofPassingSSC;
                recList1.add(q);
     	  }
            if(recList1.size()>0){
                update recList1;
            }
            
            return 'success';
        }
        else
            return 'Update Failed';
    }
    
	@AuraEnabled
    public static String updateHSC(string recordId,String wrapRecord)
    {
        NewCandidateDetailsWrapper.hsc obj3 =(NewCandidateDetailsWrapper.hsc)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.hsc.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId);        
		if(recordId != Null && recordId != '')
        {
            List<Joining_form_details__c> rec3 = [select Id,
                                                 Sate_of_HSC_college__c,
                                                 State_of_HSC_board__c,
                                                 Name_of_HSC_board__c,
                                                 Name_of_HSC_college__c,
                                                 City_District_of_HSC_college__c,
                                                 Period_from_Too_HSC__c,
                                                 Percentage_CGPA_HSC__c,
                                                 Date_Month_Year_of_passing_HSC__c from Joining_form_details__c where Id =: recordId];
        
        System.debug('Record to be updated----' + rec3);
			List<Joining_form_details__c> recList2=new  List<Joining_form_details__c>();
            for(Joining_form_details__c k: rec3)
            {
        k.State_of_HSC_board__c = obj3.stateofHSCboard;
        k.Name_of_HSC_board__c = obj3.nameofHSCboard;
        k.Name_of_HSC_college__c = obj3.nameofHSCcollege;
        k.Sate_of_HSC_college__c = obj3.stateofHSCcollege;
        k.City_District_of_HSC_college__c = obj3.citydistrictofHSCcollege;
        k.Period_from_Too_HSC__c = obj3.periodfromtooHSC;
        k.Percentage_CGPA_HSC__c = obj3.percentagecgpaHSC;
        k.Date_Month_Year_of_passing_HSC__c = obj3.datemonthyearofpassingHSC;
         recList2.add(k);
     	  }
            if(recList2.size()>0){
                update recList2;
            }
            
            return 'success';
        }
        else
            return 'Update Failed';
    }
    @AuraEnabled
    public static String updateDiploma(String recordId, String wrapRecord)
    {
        NewCandidateDetailsWrapper.diploma obj4 =(NewCandidateDetailsWrapper.diploma)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.diploma.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId);        
		if(recordId != Null && recordId != '')
        {
            List<Joining_form_details__c> rec4 = [select Id,State_in_which_the_University_belongs__c,
                                                 State_to_which_college_belongs__c,
                                                 Name_of_University__c,
                                                 University_Reg_No_Roll_No__c,
                                                 City_District_in_which_college_belongs__c,
                                                 Name_of_the_college__c,
                                                 Branch_Subject__c,
                                                 Elective_Subjects__c,
                                                 Percentage_CGPA__c,
                                                 Date_Year_of_Passing__c from Joining_form_details__c where Id =: recordId];
            System.debug('Record to be updated----' + rec4);
			List<Joining_form_details__c> recList3=new  List<Joining_form_details__c>();
            for(Joining_form_details__c l: rec4)
            {
        l.State_in_which_the_University_belongs__c = obj4.stateofUniversity;
        l.Name_of_University__c = obj4.nameofUniversity;
        l.State_to_which_college_belongs__c = obj4.stateofcollege;
        l.Name_of_the_college__c = obj4.nameofcollege;
        l.City_District_in_which_college_belongs__c = obj4.citydistrictofcollege;
        l.University_Reg_No_Roll_No__c = obj4.Universityrollno;
        l.Branch_Subject__c = obj4.branchorsubject;
        l.Elective_Subjects__c = obj4.electivesubjects;
        l.Percentage_CGPA__c = obj4.percentagecgpa;
        l.Date_Year_of_Passing__c = obj4.datemonthyearofPassing;
       recList3.add(l);
     	  }
            if(recList3.size()>0){
                update recList3;
            }
            
            return 'success';
        }
        else
            return 'Update Failed';
    }

    @AuraEnabled
     public static String updateGraduation(String recordId, String wrapRecord)
    {
        NewCandidateDetailsWrapper.graduation obj5 =(NewCandidateDetailsWrapper.graduation)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.graduation.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId);        
		if(recordId != Null && recordId != '')
        {
            List<Joining_form_details__c> rec5 = [select Graduation_state_university__c,
                                                 Graduation_University_Name__c,
                                                 Graduation_University_Roll_No__c,
                                                 Graduation_University_College_State__c,
                                                 Graduation_Univesity_City_District__c,
                                                 Graduation_College_Name__c,
                                                 Branch_of_Graduation__c,
                                                 Graduation_Month_Passing_year__c,
                                                 Graduation_Percentage_CGPA__c,
                                                 Gradiuation_Elective_Subjects__c from Joining_form_details__c where Id =: recordId];
            System.debug('Record to be updated----' + rec5);
			List<Joining_form_details__c> recList5=new  List<Joining_form_details__c>();
            for(Joining_form_details__c m: rec5)
            {
                m.Graduation_state_university__c = obj5.graduationstateofUniversity;
                m.Graduation_University_Name__c = obj5.graduationnameofUniversity;
                m.Graduation_University_Roll_No__c = obj5.graduationUniversityrollno;
                m.Graduation_University_College_State__c = obj5.graduationstateofcollege;
                m.Graduation_Univesity_City_District__c = obj5.graduationcitydistrictofcollege;
                m.Graduation_College_Name__c = obj5.graduationnameofcollege;
                m.Branch_of_Graduation__c = obj5.graduationbranchorsubject;
                m.Graduation_Month_Passing_year__c = obj5.graduationdatemonthyearofPassing;
                m.Graduation_Percentage_CGPA__c = obj5.graduationpercentagecgpa;
                m.Gradiuation_Elective_Subjects__c = obj5.graduationelectivesubjects;
                recList5.add(m);
     	  }
            if(recList5.size()>0){
                update recList5;
            }
            
            return 'success';
        }
        else
            return 'Update Failed';
    }

    @AuraEnabled
     public static String updatePostgraduation(String recordId, String wrapRecord)
    {
        NewCandidateDetailsWrapper.postgraduation obj6 =(NewCandidateDetailsWrapper.postgraduation)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.postgraduation.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId); 
        if(recordId != Null && recordId != '')
        {
        List<Joining_form_details__c> rec6 = [select PG_University_state__c,
                                             PG_University_Name__c,
                                             PG_University_RegNo_RollNo__c,
                                             PG_college_state__c,
                                             PG_College_City_District__c,
                                             PG_College_Name__c,
                                             PG_Branch__c,
                                             PG_Month_Year_of_passing__c,
                                             PG_Percentage_CGPA__c,
                                             PG_Elective_Subjects__c from Joining_form_details__c where Id =: recordId];
         System.debug('Record to be updated----' + rec6);
			List<Joining_form_details__c> recList6 = new  List<Joining_form_details__c>();
            for(Joining_form_details__c n: rec6)
            {
                n.PG_University_state__c = obj6.stateofuniversityPg;
                n.PG_University_Name__c = obj6.nameofuniversityPg;
                n.PG_University_RegNo_RollNo__c = obj6.UniversityRollno;
                n.PG_college_state__c = obj6.stateofcollegePg;
                n.PG_College_City_District__c = obj6.citydistrictofCollege;
                n.PG_College_Name__c = obj6.nameofPGCollege;
                n.PG_Branch__c = obj6.branchorSubject;
                n.PG_Month_Year_of_passing__c = obj6.datemonthyearofPassing;
                n.PG_Percentage_CGPA__c = obj6.percentageCgpa;
                n.PG_Elective_Subjects__c = obj6.electiveSubjects;
                 recList6.add(n);
     	  }
            if(recList6.size()>0){
                update recList6;
            }
            
            return 'success';
        }
          else
            return 'Update Failed';
    }
    @AuraEnabled
    public static String updateOtherinfo(String recordId, String wrapRecord)
    {
        NewCandidateDetailsWrapper.otherinfo obj7 =(NewCandidateDetailsWrapper.otherinfo)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.otherinfo.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId); 
        if(recordId != Null && recordId != '')
        {
        List<Joining_form_details__c> rec7 = [select Speak__c,
                                              Read__c,
                                              Write__c,
                                             Games__c,
                                             Social_Activities__c,
                                             Hobbies__c from Joining_form_details__c where Id =: recordId];
            System.debug('Record to be updated----' + rec7);
			List<Joining_form_details__c> recList7=new  List<Joining_form_details__c>();
            //for(Joining_form_details__c p: rec7)
            //{
                Joining_form_details__c p= rec7[0];
            p.Speak__c = obj7.speak != null ? String.join(obj7.speak, ',') : null;
            p.Read__c = obj7.read != null ? String.join(obj7.read, ';') : null;
            p.Write__c = obj7.write != null ? String.join(obj7.write, ';') :null;
            p.Games__c = obj7.games;
            p.Social_Activities__c = obj7.socialActivities;
            p.Hobbies__c = obj7.hobbies;
            recList7.add(p);
                //}
            if(recList7.size()>0){
                update recList7;
            }
            
            return 'success';
        }
          else
            return 'Update Failed';
}
    @AuraEnabled
    public static String UpdateBankdetails(String recordId, String wrapRecord)
    {
        NewCandidateDetailsWrapper.bankdetails obj8 =(NewCandidateDetailsWrapper.bankdetails)JSON.deserialize(wrapRecord, NewCandidateDetailsWrapper.bankdetails.class);
        System.debug('Received Wrapper----' + wrapRecord);
        System.debug('Received Record Id----' + recordId); 
        if(recordId != Null && recordId != '')
        {
        List<Joining_form_details__c> rec8 = [select Account_Holder_Name__c,
                                             IFSC_Code__c,
                                             Branch_Name__c,
                                             Account_Number__c,
                                             Bank_Name__c from Joining_form_details__c where Id =: recordId];
            System.debug('Record to be updated----' + rec8);
			List<Joining_form_details__c> recList8=new  List<Joining_form_details__c>();
            for(Joining_form_details__c r: rec8)
            {
                r.Account_Holder_Name__c = obj8.accountholderName;
                r.IFSC_Code__c= obj8.IFSCcode;
                r.Branch_Name__c = obj8.branchName;
                r.Account_Number__c = obj8.accountNumber;
                r.Bank_Name__c = obj8.bankName;
                 recList8.add(r);
                }
            if(recList8.size()>0){
                update recList8;
            }
            
            return 'success';
        }
          else
            return 'Update Failed';
}
}