import { LightningElement,api } from 'lwc';

export default class FromController extends LightningElement {
    @api currentPage = 1;
    @api totalPages = 9; // Default to 2 pages, can be customized
    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    handlePrevious() {  
        if (this.currentPage > 1) {
            this.currentPage=this.currentPage-1;
            this.dispatchEvent(new CustomEvent('pagechange', { detail: this.currentPage }));
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage=this.currentPage+1;
            this.dispatchEvent(new CustomEvent('pagechange', { detail: this.currentPage }));
        }
    }
}