import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() ratingVal: number;

  @Output() ratingEvent: EventEmitter<string> = new EventEmitter();

  ratingArray: any = [];

  constructor() { }

  ngOnInit() {
  	console.log(this.ratingVal);
  	this.ratingArray= Array(Math.round(this.ratingVal)).fill(Math.round(this.ratingVal));
  	console.log(this.ratingArray);
  }

  ratingClickFn(){
    this.ratingEvent.emit('Rating='+this.ratingVal);
  }

}
