import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedido-cocinero',
  templateUrl: './pedido-cocinero.component.html',
  styleUrls: ['./pedido-cocinero.component.scss']
})
export class PedidoCocineroComponent implements OnInit {
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

