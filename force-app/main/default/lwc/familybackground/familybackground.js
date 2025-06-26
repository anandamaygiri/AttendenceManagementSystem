import { NavigationMixin } from "lightning/navigation";
import { LightningElement, api, track } from "lwc";
import familyBackground from "@salesforce/apex/NewCandidateDetails.familyBackground";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Familybackground extends NavigationMixin(LightningElement) {
  @api recordId;
  @track isRecordIdAvailable = false;
  @track familyBackgroundRecord = {
    fatherName: "",
    fatherAge: "",
    fatherEducationOccupation: "",
    motherName: "",
    motherAge: "",
    motherEducationOccupation: "",
    sisterName: "",
    sisterAge: "",
    sisterEducationOccupation: "",
    brotherName: "",
    brotherAge: "",
    brotherEducationOccupation: "",
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

  handleInputChange(event) {
    if (event.target.name == "fatherName") {
      this.familyBackgroundRecord.fatherName = event.target.value;
      console.log("Father name--->", this.familyBackgroundRecord.fatherName);
    }
    if (event.target.name == "fatherAge") {
      this.familyBackgroundRecord.fatherAge = event.target.value;
      console.log("fatherAge--->", this.familyBackgroundRecord.fatherAge);
    }
    if (event.target.name == "fatherEducationOccupation") {
      this.familyBackgroundRecord.fatherEducationOccupation =
        event.target.value;
      console.log(
        "fatherEducationOccupation--->",
        this.familyBackgroundRecord.fatherEducationOccupation
      );
    }
    if (event.target.name == "motherName") {
      this.familyBackgroundRecord.motherName = event.target.value;
      console.log("motherName--->", this.familyBackgroundRecord.motherName);
    }
    if (event.target.name == "motherAge") {
      this.familyBackgroundRecord.motherAge = event.target.value;
      console.log("motherAge--->", this.familyBackgroundRecord.motherAge);
    }
    if (event.target.name == "motherEducationOccupation") {
      this.familyBackgroundRecord.motherEducationOccupation =
        event.target.value;
      console.log(
        "motherEducationOccupation--->",
        this.familyBackgroundRecord.motherEducationOccupation
      );
    }
    if (event.target.name == "sisterName") {
      this.familyBackgroundRecord.sisterName = event.target.value;
      console.log("sisterName-->", this.familyBackgroundRecord.sisterName);
    }
    if (event.target.name == "sisterAge") {
      this.familyBackgroundRecord.sisterAge = event.target.value;
      console.log("sisterAge--->", this.familyBackgroundRecord.sisterAge);
    }
    if (event.target.name == "sisterEducationOccupation") {
      this.familyBackgroundRecord.sisterEducationOccupation =
        event.target.value;
      console.log(
        "sisterEducationOccupation--->",
        this.familyBackgroundRecord.sisterEducationOccupation
      );
    }
    if (event.target.name == "brotherName") {
      this.familyBackgroundRecord.brotherName = event.target.value;
      console.log("brotherName--->", this.familyBackgroundRecord.brotherName);
    }
    if (event.target.name == "brotherAge") {
      this.familyBackgroundRecord.brotherAge = event.target.value;
      console.log("brotherAge--->", this.familyBackgroundRecord.brotherAge);
    }
    if (event.target.name == "brotherEducationOccupation") {
      this.familyBackgroundRecord.brotherEducationOccupation =
        event.target.value;
      console.log(
        "brotherEducationOccupation--->",
        this.familyBackgroundRecord.brotherEducationOccupation
      );
    }
  }
  validateForm() {
    let isValid = true;
    const inputFields = this.template.querySelectorAll("lightning-input");
    inputFields.forEach((field) => {
      if (!field.reportValidity()) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleClick() {
    console.log("OK button clicked!!");
    console.log("fathers name---" + this.familyBackgroundRecord.fatherName);
    console.log("father age---" + this.familyBackgroundRecord.fatherAge);
    console.log(
      "father education occupation----" +
        this.familyBackgroundRecord.fatherEducationOccupation
    );
    console.log("mothers name----" + this.familyBackgroundRecord.motherName);
    console.log("mother age----" + this.familyBackgroundRecord.motherAge);
    console.log(
      "mother education occupation---" +
        this.familyBackgroundRecord.motherEducationOccupation
    );
    console.log("sisters name---" + this.familyBackgroundRecord.sisterName);
    console.log("sister age----" + this.familyBackgroundRecord.sisterAge);
    console.log(
      "sister education occupation----" +
        this.familyBackgroundRecord.sisterEducationOccupation
    );
    console.log("brothers name----" + this.familyBackgroundRecord.brotherName);
    console.log("brother age----" + this.familyBackgroundRecord.brotherAge);
    console.log(
      "brother education occupation----" +
        this.familyBackgroundRecord.brotherEducationOccupation
    );
    console.log(
      "Entered record-----" + JSON.stringify(this.familyBackgroundRecord)
    );
    console.log("Record ID--->", this.recordId);
    
    if (this.familyBackgroundRecord) {
      familyBackground({
        wrapRecord: JSON.stringify(this.familyBackgroundRecord),
        recordId: this.recordId
      })
        .then((result) => {
          console.log("Result:" + JSON.stringify(result));
          //this.recordId=result;
          if(result == 'success')
            {
          const showSuccess = new ShowToastEvent({
            title: "Success",
            message: "family background details were successfully entered",
            variant: "Success",
          });
          this.dispatchEvent(showSuccess);
          console.log("Result:" + JSON.stringify(this.familyBackgroundRecord));
          if (this.recordId) {
            this.isRecordIdAvailable = true;
          }
        }
      })
        .catch(error => {
          this.errorMessage = error;
          console.error('Error updating record: ' + JSON.stringify(this.errorMessage));
      });
    } else {
      const showFailure = new ShowToastEvent({
        title: "error",
        message: "Please enter all the details correctly!!",
        variant: "error",
      });
      this.dispatchEvent(showFailure);
    }
  }
}