import { LightningElement,track,api } from 'lwc';
import personalInfo from "@salesforce/apex/NewCandidateDetails.personalInfo";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class RegistrationPage extends LightningElement {
    @track currentPage = 1;
    totalPages = 2; // Set the total number of pages here
    @track allPagesData = {};

    handlePageChange(event) {
        this.saveCurrentPageData();
        this.currentPage = event.detail;
        this.loadPageData(this.currentPage);
    }

    handleInputChange(event) {
        const pageName = `page${this.currentPage}`;
        if (!this.allPagesData[pageName]) {
            this.allPagesData[pageName] = {};
        }
        this.allPagesData[pageName][event.target.name] = event.target.value;
    }

    saveCurrentPageData() {
        const pageName = `page${this.currentPage}`;
        this.allPagesData[pageName] = { ...this.template.querySelector('c-page').getData() };
    }

    loadPageData(pageNumber) {
        const pageName = `page${pageNumber}`;
        if (this.allPagesData[pageName]) {
            this.template.querySelector('c-page').setData(this.allPagesData[pageName]);
        } else {
            this.template.querySelector('c-page').clearData();
        }
    }

    handleSubmit() {
        this.saveCurrentPageData();
        const consolidatedData = Object.values(this.allPagesData).reduce((acc, pageData) => {
            return { ...acc, ...pageData };
        }, {});
    }



    get isPage1() {
        return this.currentPage === 1;
    }
    get isPage2() {
        return this.currentPage === 2;
    }
    get isPage3() {
        return this.currentPage === 3;
    }
    get isPage4() {
        return this.currentPage === 4;
    }
    get isPage5() {
        return this.currentPage === 5;
    }
    get isPage6() {
        return this.currentPage === 6;
    }
    get isPage7() {
        return this.currentPage === 7;
    }
    get isPage8() {
        return this.currentPage === 8;
    }
    get isPage9() {
        return this.currentPage === 9;
    }
}