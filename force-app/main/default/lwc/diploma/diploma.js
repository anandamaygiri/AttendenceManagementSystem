import { NavigationMixin } from 'lightning/navigation';
import { LightningElement , track,api } from 'lwc';
import updateDiploma from '@salesforce/apex/NewCandidateDetails.updateDiploma';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Diploma extends NavigationMixin (LightningElement) {
    @api recordId
    @track isRecordIdAvailable = false;
    @track diplomaRecord={
        stateofUniversity: "",
        stateofcollege: "",
        nameofUniversity: "",
        Universityrollno: "",
        citydistrictofcollege: "",
        nameofcollege: "",
        branchorsubject: "",
        electivesubjects: "",
        percentagecgpa: "",
        datemonthyearofPassing: "",
    };
    connectedCallback() {
        if (this.recordId) {
          console.log("Reccc--->", this.recordId);
          console.log("Record received successfully");
        } 
        else
        {
          console.log("Record not found");
        }
      }

    stateOptions = [
                {label: 'Andhra Pradesh' , value: 'Andhra Pradesh'},
                {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
                {label: 'Assam', value:'Assam'},
                {label: 'Bihar',value: 'Bihar'},
                {label: 'Chhattisgarh',value: 'Chhattisgarh'},
                {label:'Goa',value:'Goa'},
                {label:'Gujarat', value:'Gujarat'},
                {label:'Haryana',value:'Haryana'},
                {label:'Himachal Pradesh',value:'Himachal Pradesh'},
                {label:'Jharkhand',value:'Jharkhand'},
                {label:'Karnataka',value:'Karnataka'},
                {label:'Kerala',value:'Kerala'},
                {label:'Madhya Pradesh',value:'Madhya Pradesh'},
                {label:'Maharashtra',value:'Maharashtra'},
                {label:'Manipur',value:'Manipur'},
                {label:'Meghalaya',value:'Meghalaya'},
                {label:'Mizoram',value:'Mizoram'},
                {label:'Nagaland',value:'Nagaland'},
                {label:'Odisha',value:'Odisha'},
                {label:'Punjab',value:'Punjab'},
                {label:'Rajasthan',value:'Rajasthan'},
                {label:'Sikkim',value:'Sikkim'},
                {label:'Tamil Nadu',value:'Tamil Nadu'},
                {label:'Telangana',value:'Telangana'},
                {label:'Tripura',value:'Tripura'},
                {label:'Uttar Pradesh',value:'Uttar Pradesh'},
                {label:'Uttarakhand',value:'Uttarakhand'},
                {label:'West Bengal',value:'West Bengal'}
             ];
             
             boardOptions = [
                {label:'Jawaharlal Nehru Technological University (JNTU), Kakinada' , 
                                        value:'Jawaharlal Nehru Technological University (JNTU), Kakinada'},
                {label:'Andhra University, Visakhapatnam',
                                        value:'Andhra University, Visakhapatnam'},
        
                {label:'Sri Venkateswara University, Tirupati',
                                    value:'Sri Venkateswara University, Tirupati'},
        
                {label:'Maharashtra State Board of Technical Education (MSBTE)',
                                    value:'Maharashtra State Board of Technical Education (MSBTE)'},
        
                {label:'Veermata Jijabai Technological Institute (VJTI), Mumbai',
                                    value:'Veermata Jijabai Technological Institute (VJTI), Mumbai'},
        
                {label:'Government Polytechnic Mumbai',
                                    value:'Government Polytechnic Mumbai'},
        
                {label:'Department of Technical Education (DTE), Karnataka',
                                    value:'Department of Technical Education (DTE), Karnataka'},
                {label:'RV College of Engineering, Bangalore',
                                    value:'RV College of Engineering, Bangalore'},
                {label:'PES University, Bangalore',
                                    value:'PES University, Bangalore'},  
                {label:'Directorate of Technical Education (DoTE), Tamil Nadu',
                                    value:'Directorate of Technical Education (DoTE), Tamil Nadu'},
                {label:'PSG Polytechnic College, Coimbatore',
                                    value:'PSG Polytechnic College, Coimbatore'},
                {label:'Sri Krishna Polytechnic College, Coimbatore',
                                    value:'Sri Krishna Polytechnic College, Coimbatore'},
                {label:'Gujarat Technological University (GTU), Ahmedabad',
                                    value:'Gujarat Technological University (GTU), Ahmedabad'},
                {label:'Nirma University, Ahmedabad',
                                    value:'Nirma University, Ahmedabad'},
                {label:'Government Polytechnic Ahmedabad',
                                    value:'Government Polytechnic Ahmedabad'},
                {label:'Board of Technical Education Uttar Pradesh (BTEUP)',
                                    value:'Board of Technical Education Uttar Pradesh (BTEUP)'},
                {label:'Harcourt Butler Technical University (HBTU), Kanpur',
                                    value:'Harcourt Butler Technical University (HBTU), Kanpur'},
                {label:'Bundelkhand University, Jhansi',
                                    value:'Bundelkhand University, Jhansi'},
                {label:'Delhi Skill and Entrepreneurship University (DSEU)',
                                    value:'Delhi Skill and Entrepreneurship University (DSEU)'},
                {label:'Indira Gandhi National Open University (IGNOU)',
                                    value:'Indira Gandhi National Open University (IGNOU)'},
                {label:'Delhi Technological University (DTU)',
                                    value:'Delhi Technological University (DTU)'},
                {label:'West Bengal State Council of Technical Education (WBSCTE)',
                                    value:'West Bengal State Council of Technical Education (WBSCTE)'},
                {label:'Jadavpur University, Kolkata',
                                    value:'Jadavpur University, Kolkata'},
                {label:'Maulana Abul Kalam Azad University of Technology (MAKAUT), Kolkata',
                                    value:'Maulana Abul Kalam Azad University of Technology (MAKAUT), Kolkata'},
                {label:'Punjab State Board of Technical Education and Industrial Training (PSBTE & IT)',
                                    value:'Punjab State Board of Technical Education and Industrial Training (PSBTE & IT)'},
                {label:' Polytechnic College, Mohali',
                                    value:' Polytechnic College, Mohali'},
                {label:'Guru Nanak Dev University (GNDU), Amritsar',
                                    value:'Guru Nanak Dev University (GNDU), Amritsar'},
                {label:'Board of Technical Education Rajasthan (BTER)',
                                    value:'Board of Technical Education Rajasthan (BTER)'},
                {label:'Rajasthan Technical University (RTU), Kota',
                                    value:'Rajasthan Technical University (RTU), Kota'},
                {label:'Government Polytechnic College, Jaipur',
                                    value:'Government Polytechnic College, Jaipur'},
                {label:'Haryana State Board of Technical Education (HSBTE)',value:'Haryana State Board of Technical Education (HSBTE)'},
                {label:'Guru Jambheshwar University of Science and Technology, Hisar',value:'Guru Jambheshwar University of Science and Technology, Hisar'},
                {label:'Deenbandhu Chhotu Ram University of Science and Technology, Murthal',value:'Deenbandhu Chhotu Ram University of Science and Technology, Murthal'},
                {label:'State Council for Technical Education & Vocational Training (SCTE&VT), Odisha',value:'State Council for Technical Education & Vocational Training (SCTE&VT), Odisha'},
                {label:'KIIT University, Bhubaneswar',value:'KIIT University, Bhubaneswar'},
                {label:'Government Polytechnic Bhubaneswar',value:'Government Polytechnic Bhubaneswar'},
                {label:'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',value:'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal'},
                {label:'Government Polytechnic College, Bhopal',value:'Government Polytechnic College, Bhopal'},
                {label:'Institute of Engineering & Technology, DAVV, Indore',value:'Institute of Engineering & Technology, DAVV, Indore'},
                {label:'Bihar State Board of Technical Education (BSBTE)',value:'Bihar State Board of Technical Education (BSBTE)'},
                {label:'Patna University, Patna',value:'Patna University, Patna'},
                {label:'Government Polytechnic, Patna',value:'Government Polytechnic, Patna'},
                {label:'State Board of Technical Education and Training (SBTET), Telangana',value:'State Board of Technical Education and Training (SBTET), Telangana'},
                {label:'Jawaharlal Nehru Technological University (JNTU), Hyderabad',value:'Jawaharlal Nehru Technological University (JNTU), Hyderabad'},
                {label:'Osmania University, Hyderabad',value:'Osmania University, Hyderabad'},
                {label:'Board of Technical Education, Kerala',value:'Board of Technical Education, Kerala'},
                {label:'Government Polytechnic College, Thiruvananthapuram',value:'Government Polytechnic College, Thiruvananthapuram'},
                {label:'National Institute of Technology (NIT), Calicut',value:'National Institute of Technology (NIT), Calicut'}
        
            ];
    handleInputChange(event)
    {
        if(event.target.name == 'stateofUniversity')
            this.diplomaRecord.stateofUniversity = event.detail.value;
            console.log('stateofcollege--->' , this.diplomaRecord.stateofUniversity);

        if(event.target.name=='nameofUniversity')
            this.diplomaRecord.nameofUniversity = event.detail.value;

        if(event.target.name=='stateofcollege')
            this.diplomaRecord.stateofcollege = event.detail.value;

        if(event.target.name=='nameofcollege')
            this.diplomaRecord.nameofcollege = event.target.value;
        if(event.target.name=='citydistrictofcollege')
            this.diplomaRecord.citydistrictofcollege = event.target.value;
        if(event.target.name=='Universityrollno')
            this.diplomaRecord.Universityrollno = event.target.value;
        if(event.target.name=='branchorsubject')
            this.diplomaRecord.branchorsubject = event.target.value;
        if(event.target.name=='electivesubjects')
            this.diplomaRecord.electivesubjects = event.target.value;
        if(event.target.name=='percentagecgpa')
            this.diplomaRecord.percentagecgpa = event.target.value;
        if(event.target.name=='datemonthyearofPassing')
            this.diplomaRecord.datemonthyearofPassing = event.target.value;
    }
    validateForm() {
        let isValid = true;
        const inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(field => {
            if (!field.reportValidity()) {
                isValid = false;
            }
        });
        return isValid;
    }
    handleClick() {
            if (this.diplomaRecord) {
                updateDiploma({ wrapRecord: JSON.stringify(this.diplomaRecord),
                    recordId: this.recordId
                 })
                        .then(result => {
                            console.log('Result:' + JSON.stringify(result));
                            //this.recordId=result
                            if(result=='success'){ 
                              this.displayToastMessage("Success", "Diploma details were successfully entered", "success");
                              console.log("Result:" + JSON.stringify(this.diplomaRecord));
                              if (this.recordId) {
                                this.isRecordIdAvailable = true;
                              }
                            }  
                            })
                            .catch(error => {
                                this.errorMessage = error;
                                console.error('Error updating record: ' + JSON.stringify(this.errorMessage));
                                this.displayToastMessage("Error", "An error occurred while saving the data", "error");
                            });
            }
            else {
                this.displayToastMessage("Error", "Please enter all the details correctly!!", "error");
                }
    }

    displayToastMessage(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    } 
    //Navigate to graduation component and send to the current RecordId
    handleSkip(event) {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:graduation",
            attributes: {
                recordId: this.recordId
            }
        };
        let encodedComponentDef = btoa(JSON.stringify(componentDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedComponentDef
            }
        });
    }
}