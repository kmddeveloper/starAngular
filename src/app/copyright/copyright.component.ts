import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: [
              '/src/assets/main/css/styles.css',
              './copyright.component.css'
             ]
})
export class CopyrightComponent implements OnInit {

  currentYear : string = new Date().getFullYear().toString();

  constructor() { }

  ngOnInit(): void {
  }

}
