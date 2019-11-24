import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarFoto'
})
export class MostrarFotoPipe implements PipeTransform {
  transform(value: string): string {
 
    let respuesta: string = "Seleccionar imágen..";
    if (value==''){
      return respuesta;
    }
    else {
      respuesta="OK"
    }
    return respuesta;       
  }

}


