import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() visible: boolean;
  
  constructor() { 
    this.visible = false;
  }

  ngOnInit() {
  }

}
