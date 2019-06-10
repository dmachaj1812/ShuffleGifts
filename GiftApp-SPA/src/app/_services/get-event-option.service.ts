import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetEventOptionService {

  constructor() { }

  unknownGiftGiver() {
    return 1;
  }

  knownGiftGiver() {
    return 2;
  }

  oneOfManyGifts() {
    return 3;
  }

  oneGift() {
    return 4;
  }

  algorithmChooses() {
    return 5;
  }

  participantChooses() {
    return 6;
  }
}
