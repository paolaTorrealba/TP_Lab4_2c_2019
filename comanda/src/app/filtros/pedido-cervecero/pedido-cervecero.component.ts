import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedido-cervecero',
  templateUrl: './pedido-cervecero.component.html',
  styleUrls: ['./pedido-cervecero.component.scss']
})
export class PedidoCerveceroComponent implements OnInit {
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
