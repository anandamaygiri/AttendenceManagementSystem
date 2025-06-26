// associateForm.js
import { NavigationMixin } from "lightning/navigation";
import { LightningElement, track } from "lwc";
import personalInfo from "@salesforce/apex/NewCandidateDetails.personalInfo";
import uploadImage from "@salesforce/apex/NewCandidateDetails.uploadImage";  
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class joiningForm extends NavigationMixin(LightningElement) {
  @track recordId;
  @track isRecordIdAvailable = false;
  @track fileData = {};  //track image file
  @track imagePreviewUrl; //track preview
  @track personalInfoRecord = {
    Name: "",
    motherName: "",
    fatherName: "",
    presentAddress: "",
    permananentAddress: "",
    email: "",
    contactNumber: "",
    altContactNumber: "",
    whatsappNumber: "",
    parentContactNumber: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    religion: "",
    aadhaarNumber: "",
    panNumber: "",
    voterIdNumber: "",
    passportNumber: "",
    image: "",
    errors:{
      Name: "",
      aadhaarNumber: "",
      panNumber: "",
    }
  };

  get options() {
    return [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "others", value: "others" },
    ];
  }
  get religionOptions() {
  return [
  {label:"Hindu" ,value:"Hindu"},
  {label: "Muslim",value:"Muslim"},
  {label: "Christian",value: "Christian"},
  {label:"Jain" ,value:"Jain"},
  {label: "Buddhist",value:"Buddhist"}, 
  {label:"Sikh",value:"Sikh"},
  {label:"Others",value:"Others"},
  ];
  }
  get bloodOptions() {
    return [
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "AB-", value: "AB-" },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" },
    ];
  }

   
  handleInputChange(event) {
    if (event.target.name == "Name") {
      this.personalInfoRecord.Name = event.target.value;
      console.log("Name--->", this.personalInfoRecord.Name);
    }
    if (event.target.name == "MotherName")
      this.personalInfoRecord.motherName = event.target.value;
    if (event.target.name == "FatherName")
      this.personalInfoRecord.fatherName = event.target.value;
    if (event.target.name == "PresentAddress")
      this.personalInfoRecord.presentAddress = event.target.value;
    if (event.target.name == "permananentAddress")
      this.personalInfoRecord.permananentAddress = event.target.value;
    if (event.target.name == "Email")
      this.personalInfoRecord.email = event.target.value;
    if (event.target.name == "ContactNumber")
      this.personalInfoRecord.contactNumber = event.target.value;
    if (event.target.name == "AlternativeContactNumber")
      this.personalInfoRecord.altContactNumber = event.target.value;
    if (event.target.name == "WhatsAppNumber")
      this.personalInfoRecord.whatsappNumber = event.target.value;
    if (event.target.name == "ParentsContact")
      this.personalInfoRecord.parentContactNumber = event.target.value;
    if (event.target.name == "Gender") {
      this.personalInfoRecord.gender = event.target.value;
      console.log("Gender--->", this.personalInfoRecord.gender);
    }
    if (event.target.name == "DOB")
      this.personalInfoRecord.dateOfBirth = event.target.value;
    if (event.target.name == "BloodGroup") {
      this.personalInfoRecord.bloodGroup = event.target.value;
      console.log("Blood Group--->", this.personalInfoRecord.bloodGroup);
    }
    if (event.target.name == "Religion") {
      this.personalInfoRecord.religion = event.target.value;
      console.log("Religion--->", this.personalInfoRecord.religion);
    }
    if (event.target.name == "Aadhar")
      this.personalInfoRecord.aadhaarNumber = event.target.value;
    if (event.target.name == "Pan")
      this.personalInfoRecord.panNumber = event.target.value;
    if (event.target.name == "VoterId") {
      this.personalInfoRecord.voterIdNumber = event.target.value;
    }
    if (event.target.name == "Passport") {
        this.personalInfoRecord.passportNumber = event.target.value;
    }
  }
  validateName(name) {
    const nameRegex = /^[A-Za-z ]{3,}$/;
    return nameRegex.test(name);
  }
  validatePAN(panNumber) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNumber);
}
validateAadhaar(aadhaarNumber) {
  const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  return aadhaarRegex.test(aadhaarNumber);
}

  validateForm() {
    let isValid = true;
    const inputFields = this.template.querySelectorAll("lightning-input");
    inputFields.forEach((field) => {
      if (!field.reportValidity()) {
        isValid = false;
      }
    });
    if (!this.validateName(this.personalInfoRecord.Name)) {
      //this.displayToastMessage("Error", "Invalid Name", "error");
      this.personalInfoRecord.errors.Name = "Invalid Name format";
      isValid = false;
  }
    if (!this.validateAadhaar(this.personalInfoRecord.aadhaarNumber)) {
      //this.displayToastMessage("Error", "Invalid Aadhaar Number format", "error");
      this.personalInfoRecord.errors.aadhaarNumber = "Invalid Aadhaar Number format";
      isValid = false;
  }
    if (!this.validatePAN(this.personalInfoRecord.panNumber)) {
     // this.displayToastMessage("Error", "Invalid PAN Card Number format", "error");
     this.personalInfoRecord.errors.panNumber = "Invalid PAN Number format";
      isValid = false;
  }
    return isValid;
  }
  async handleClick() {
    if (this.validateForm()) {
        try {
            // Save personal info
            const result = await personalInfo({ wrapRecord: JSON.stringify(this.personalInfoRecord) });
            this.recordId = result;
            this.isRecordIdAvailable = !!this.recordId;

            // Upload image if exists
            if (this.fileData.base64 && this.fileData.filename) {
                await uploadImage({ base64: this.fileData.base64, filename: this.fileData.filename, recordId: this.recordId });
            }

            this.displayToastMessage("Success", "New Candidate details were successfully entered and image uploaded", "success");
        } catch (error) {
            this.displayToastMessage("Error", "An error occurred while saving the data", "error");
            console.error("Error:", error);
        }
    } else {
        this.displayToastMessage("Error", "Please enter all the details correctly!", "error");
    }
}

displayToastMessage(title, message, variant) {
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    }));
}

//Image fiel upload method
openfileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      this.fileData = { filename: file.name, base64: base64 };
      this.imagePreviewUrl = reader.result; // Set the image preview URL
  };
  reader.readAsDataURL(file);
}
}