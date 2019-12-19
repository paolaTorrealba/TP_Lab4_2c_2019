import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExcelService } from 'src/app/servicios/excel.service';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { Perfil } from 'src/app/clases/enum';

@Component({
  selector: 'app-excel-empleados',
  templateUrl: './excel-empleados.component.html',
  styleUrls: ['./excel-empleados.component.scss']
})
export class ExcelEmpleadosComponent implements OnInit {
  public excel=[];
  public title = 'excel-upload-download';
  public usuarios:Array<any> = []; 
  public empleados:Array<any> = []; 
  

  constructor( private  data:  AuthService,
    private excelService:ExcelService,
    private http: HttpClient) {
  
    this.obtenerUsuarios();
   }

   exportAsXLSX():void {  
     console.log("exportando")
     this.excelService.exportAsExcelFile(this.empleados, 'empleados');  
   }  
  
  ngOnInit() {}

  obtenerUsuarios() {
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
        this.usuarios=lista; 
        for (let i=0; i<= this.usuarios.length-1;i++){
          if (this.usuarios[i].perfil!=Perfil.cliente){
            this.empleados.push(this.usuarios[i])
          }
        }
        
    });
    console.log("clienempleadostes: ",this.empleados);  
} 
}
