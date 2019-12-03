import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-producto-tipo',
  templateUrl: './producto-tipo.component.html',
  styleUrls: ['./producto-tipo.component.scss']
})
export class ProductoTipoComponent implements OnInit {
  @Input() filterName: string;
  @Output() busquedaEvento = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(value: string) {
    console.log("Funcion Filtro: ", value)
    let filterValue = value.trim().toLowerCase();
    this.busquedaEvento.emit(filterValue);
  }

}
