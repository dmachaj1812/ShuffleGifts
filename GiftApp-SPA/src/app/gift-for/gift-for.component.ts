import { AuthService } from './../_services/auth.service';
import { GiftForService } from './../_services/gift-for.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-for',
  templateUrl: './gift-for.component.html',
  styleUrls: ['./gift-for.component.css']
})
export class GiftForComponent implements OnInit {
  giftFor: any;
  constructor(private giftForService: GiftForService, public authService: AuthService) { }

  ngOnInit() {
    this.giftForService.getGiftFor().subscribe(next => {
     
      this.giftFor = next;
    });
  }

}
