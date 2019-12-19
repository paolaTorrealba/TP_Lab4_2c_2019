import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codigo'
})
export class CodigoPipe implements PipeTransform {
  transform(value: string): string {
 
    let respuesta: string = "debe generar un código";
    if (value==''){
      return respuesta;
    }
    else {
      respuesta=value
    }
    return respuesta;       
  }

}


