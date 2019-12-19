import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card-reportes',
  templateUrl: './card-reportes.component.html',
  styleUrls: ['./card-reportes.component.scss']
})
export class CardReportesComponent implements OnInit {
  @ViewChild("imgLogin", { static: false })
  InputImagenLogin: ElementRef;

  constructor() { 
   
  }

  ngOnInit() {
  
    // document.getElementById('socio-img').attributes.getNamedItem;
  }

}
