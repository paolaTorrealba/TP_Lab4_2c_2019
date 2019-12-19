import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/clases/enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExcelService } from 'src/app/servicios/excel.service';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 


@Component({
  selector: 'app-excel-clientes',
  templateUrl: './excel-clientes.component.html',
  styleUrls: ['./excel-clientes.component.scss']
})
export class ExcelClientesComponent implements OnInit {
  public excel=[];
  public title = 'excel-upload-download';
  public usuarios:Array<any> = []; 
  public clientes:Array<any> = []; 
  

  constructor( private  data:  AuthService,
    private excelService:ExcelService,
    private http: HttpClient) {
  
    this.obtenerUsuarios();
   }

   exportAsXLSX():void {  
     console.log("exportando")
     this.excelService.exportAsExcelFile(this.clientes, 'clientes');  
   }  
  
  ngOnInit() {}

  obtenerUsuarios() {
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
        this.usuarios=lista; 
        for (let i=0; i<= this.usuarios.length-1;i++){
          if (this.usuarios[i].perfil==Perfil.cliente){
            this.clientes.push(this.usuarios[i])
          }
        }
        
    });
    console.log("clientes: ",this.clientes);  
} 
}
