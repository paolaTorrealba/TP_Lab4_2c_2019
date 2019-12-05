import { Directive, ElementRef, Input } from '@angular/core';
import { EstadoPedido } from '../clases/enum';

@Directive({
  selector: '[appColorPedidoPendiente]'
})
export class ColorPedidoPendienteDirective {
  constructor(private el: ElementRef) {
  }

  @Input('appColorPedidoPendiente') estado: EstadoPedido;

  ngAfterViewInit() {
    
    if (this.estado==EstadoPedido.pendiente){
      this.el.nativeElement.style.backgroundColor = "lightgreen";
    }
    else if (this.estado==EstadoPedido.aceptado){
      this.el.nativeElement.style.backgroundColor = "cyan";
    }
    else if (this.estado==EstadoPedido.cancelado){
      this.el.nativeElement.style.backgroundColor = "red";
    }
      
    else
      this.el.nativeElement.style.backgroundColor = "wheat";
  }
}
