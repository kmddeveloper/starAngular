import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {

  @Input() rating:number=0;
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();

  corpWidth:Number=0;
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.corpWidth  = 18 * this.rating;
  }

  ngOnInit(): void {
  }

  

  onClick(){
    console.log('click star');
    this.notify.emit(`${this.rating}`);
  }

}
