import { Component, AfterViewInit, OnInit } from '@angular/core';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  subtitle: string;
  ngOnInit(): void {
  }
 imagesA= [
  {img:"assets/images/hline/a1.jpg"},
  {img:"assets/images/hline/a2.jpg"},
  {img:"assets/images/hline/a3.jpg"},
 ]
 imagesE= [
  {img:"assets/images/hline/a4.jpg"},
  {img:"assets/images/hline/a5.jpg"},
  {img:"assets/images/hline/a6.jpg"},
  {img:"assets/images/hline/a7.jpg"},
 ]
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true,
    "autoplay":true 
  };
  slideConfig2 = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true,
    "autoplay":true
  };
  ngAfterViewInit() { }
}
