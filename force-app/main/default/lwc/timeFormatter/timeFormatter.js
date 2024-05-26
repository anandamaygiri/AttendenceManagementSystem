import { LightningElement,api } from 'lwc';

export default class TimeFormatter extends LightningElement {
    @api value;

    get formattedTime() {
        if (this.value) {
            const totalMinutes = parseInt(this.value, 10);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        return '00:00';
    }
}