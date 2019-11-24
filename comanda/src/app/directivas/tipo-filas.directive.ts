import { Directive, Input, ElementRef } from '@angular/core';
import { TipoProducto } from '../clases/enum';

@Directive({
  selector: '[appTipoFilas]'
})
export class TipoFilasDirective {
  constructor(private el: ElementRef) {
  }

  @Input('appTipoFilas') tipo: TipoProducto;

  ngAfterViewInit() {
    
    if (this.tipo==TipoProducto.barra)
      this.el.nativeElement.style.backgroundColor = "bisque";
    else if (this.tipo==TipoProducto.cerveza)
      this.el.nativeElement.style.backgroundColor = "lightblue";
    else
      this.el.nativeElement.style.backgroundColor = "mediumaquamarine";
  }
}
