import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  now: Date = new Date();
  isCollapsed = false;

  constructor() {
    const seconds = this.now.getSeconds();
    if (seconds !== 0) {
      setTimeout(() => {
        this.now = new Date();
        setInterval(() => {
          this.now = new Date();
        }, 60000);
      }, (60 - seconds) * 1000);
    }
  }

  ngOnInit() {
  }

}
