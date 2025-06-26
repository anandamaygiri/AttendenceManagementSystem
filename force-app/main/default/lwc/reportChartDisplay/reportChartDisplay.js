import { LightningElement, track,wire,api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import getChartValue from '@salesforce/apex/GlobalReportsController.getChartValue';
import userId from '@salesforce/user/Id';
import profile from '@salesforce/schema/User.Profile.Name';

const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

export default class ReportChartDisplay extends LightningElement {
    @api recordId;
    user_Id=userId;
    @track isChartJsInitialized = false;
    @track totalAttendence = [];
    @track totalTask = [];
    @track totalLeave = [];
    @track month = [];

    chart;

    @wire(getChartValue,{recordId: '$user_Id', fields: [profile] })
    wiredChartData({ error, data }) {
        if (data) {
            this.totalAttendence = [];
            this.totalTask = [];
            this.totalLeave = [];
            this.month = [];
            
            data.forEach(dataItem => {
                this.totalAttendence.push(dataItem.yAxisForAttendence);
                this.totalTask.push(dataItem.yAxisForTask);
                this.totalLeave.push(dataItem.yAxisForLeave);
                this.month.push(monthNames[parseInt(dataItem.xAxis)-1]);
            });

            if (this.chart) {
                this.updateChart();
            }
        } else if (error) {
            console.error('Error retrieving chart data: ', error);
        }
    }

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            if (this.month.length > 0) {
                this.updateChart();
            }
        }).catch(error => {
            console.error('Error loading Chart.js: ', error);
        });
    }

    updateChart() {
        this.chart.data.labels = this.month;
        this.chart.data.datasets[0].data = this.totalAttendence;
        this.chart.data.datasets[1].data = this.totalTask;
        this.chart.data.datasets[2].data = this.totalLeave;
        this.chart.update();
    }

    get config() {
        return {
            type: 'line',
            data: {
                labels: this.month,
                datasets: [
                    {
                        label: 'Attendence',
                        data: this.totalAttendence,
                        fill: false,
                        pointRadius: 0,
                        backgroundColor: '#00ADEE',
                        borderColor: '#00ADEE',
                        pointBackgroundColor: '#00ADEE',
                    },
                    {
                        label: 'Task',
                        data: this.totalTask,
                        fill: false,
                        pointRadius: 0,
                        backgroundColor: '#2E3191',
                        borderColor: '#2E3191',
                        pointBackgroundColor: '#2E3191',
                    },
                    {
                        label: 'Leave',
                        data: this.totalLeave,
                        fill: false,
                        pointRadius: 0,
                        backgroundColor: '#2E6391',
                        borderColor: '#2E6391',
                        pointBackgroundColor: '#2E6391',
                    }
                ],
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'white',
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(255, 99, 132, 0.2)',
                            drawBorder: false,
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 2,
                    }
                }
            }
        };
    }

}