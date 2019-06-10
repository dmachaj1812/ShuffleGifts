import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getTodaysDate() {
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yy = today.getFullYear();

    today = new Date(mm + '/' + dd + '/' + yy);

    return today;
  }

  parseDateAndTime(date, time = '00:00'): Date {
    const dateObj = new Date(Date.parse(date));
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const eventTime = time.split(':');

    const newDate = new Date(Date.UTC(year, month, day, +eventTime[0], +eventTime[1]));
    return newDate;

  }


}
