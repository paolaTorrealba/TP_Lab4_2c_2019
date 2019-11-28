import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedido-bartender',
  templateUrl: './pedido-bartender.component.html',
  styleUrls: ['./pedido-bartender.component.scss']
})
export class PedidoBartenderComponent implements OnInit {
  @Input() filterName: string;
  @Output() busquedaEvento = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(value: string) {
    console.log("aply filter")
    let filterValue = value.trim().toLowerCase();
    this.busquedaEvento.emit(filterValue);
  }

}
