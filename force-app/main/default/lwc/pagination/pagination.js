import { LightningElement,api } from 'lwc';

export default class Pagination extends LightningElement {
    currentPage=1
    totalRecords
    @api recordSize = 5
    totalPage=0
    visibleRecords=[]
    @api
    get records(){
        return this.visibleRecords
    }

    set records(data){
        if(data){
            this.totalRecords=data
            this.recordSize = Number(this.recordSize)
            this.totalPage=Math.ceil(data.length/this.recordSize)
            this.updateRecords()
        }
    }
//When page is the First page disable the Previous button
    get disablePrevious(){
        return this.currentPage<=1

    }
    //When page is the Last page disable the Next button
    get disableNext(){
        return this.currentPage>=this.totalPage
    }
    //when clicking Previous Button it showing previous records
    previousHandler(){
        if(this.currentPage>1){
            this.currentPage=this.currentPage-1
            this.updateRecords()
        }

    }
    //when clicking Next Button it showing Next records
    nextHandler(){
        if(this.currentPage<this.totalPage){
            this.currentPage=this.currentPage+1
            this.updateRecords()
        }

    }
    //update records with slice 
    updateRecords(){
        const start = (this.currentPage-1)*this.recordSize
        const end  = this.recordSize*this.currentPage
        this.visibleRecords=this.totalRecords.slice(start,end)
        //verify the details of the parent component records
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.visibleRecords
            }
        }))
    }
}