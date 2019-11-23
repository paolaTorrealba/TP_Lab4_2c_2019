import { Pipe, PipeTransform } from '@angular/core';
import { EstadoMesa } from '../clases/enum';

@Pipe({
  name: 'mesa'
})
export class MesaPipe implements PipeTransform {

  transform(value: string): string {
 
    let respuesta: string = "";
    if (value==EstadoMesa.cerrada){
      respuesta="Disponible"
    }
    else {
      respuesta="No Disponible"
    }
    return respuesta;       
  }

}


