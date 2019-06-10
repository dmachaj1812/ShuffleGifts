import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallBack: () => any) {
    alertify.confirm( message, function(e) {
      if (e) {
        okCallBack();
      } else {}
    }).setHeader('Shuffle Gifts!');
  }

  success(message: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(message);
  }
  error(message: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }

  errorRetrievingData () {
    alertify.error('Problem with retrieving data.');
  }

}
