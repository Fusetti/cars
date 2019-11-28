import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: Array<string> = [
    './assets/img/ferrari_01.png',
    './assets/img/ferrari_02.png',
    './assets/img/lamborghini_01.png',
    './assets/img/lamborghini_02.png',
    './assets/img/porsche_01.png',
    './assets/img/porsche_02.png',
    './assets/img/maserati_01.png',
    './assets/img/jaguar_01.png'
  ];

  constructor(private config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.interval = 6000;
  }

  ngOnInit() {
  }

}
