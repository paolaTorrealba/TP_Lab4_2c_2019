import { Directive, ElementRef, Input } from '@angular/core';
import { EstadoMesa } from '../clases/enum';

@Directive({
  selector: '[appEstadoFila]'
})
export class EstadoFilaDirective {
  constructor(private el: ElementRef) {
  }

  @Input('appEstadoFila') estado: EstadoMesa;

  ngAfterViewInit() {
    
    if (this.estado==EstadoMesa.cerrada){
      this.el.nativeElement.style.backgroundColor = "lightgreen";
    }
    else if (this.estado==EstadoMesa.conClientePagando)
      this.el.nativeElement.style.backgroundColor = "gray10";
    else
      this.el.nativeElement.style.backgroundColor = "wheat";
  }
}
