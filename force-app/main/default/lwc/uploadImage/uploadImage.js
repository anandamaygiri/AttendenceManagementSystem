import { LightningElement,api,track } from 'lwc';
import uploadImage from '@salesforce/apex/uploadImageController.uploadImage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class UploadImage extends LightningElement {
@api recordId;
@track fileData = {};

openfileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
   const base64 = reader.result.split(",")[1];
   this.fileData = { filename: file.name, base64: base64 };
  };
  reader.readAsDataURL(file);
 }

 async uploadFile() {
  try {
    const { base64, filename } = this.fileData;
    
    if (!base64 || !filename) {
        this.displayToastMessage('Error', 'No file data found. Please select a file first.', 'error');
        return;
    }
    await uploadImage({ base64: base64, filename: filename, recordId: this.recordId });
    this.displayToastMessage("Success", "Image uploaded successfully", "success")
    await refreshApex(this.recordId);
   }catch (error) {
   reduceErrors(error).forEach(err => this.displayToastMessage("Error", err, "error"));
   this.displayToastMessage("error", "Image not uploaded ", "error")
  }
}

displayToastMessage(title, message, type) {
  const event = new ShowToastEvent({ title: title, message: message, variant: type });
  this.dispatchEvent(event);
}
}