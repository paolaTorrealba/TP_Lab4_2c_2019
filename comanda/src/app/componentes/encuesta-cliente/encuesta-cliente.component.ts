import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { AuthProvider } from 'src/app/providers/auth';
import {MatRadioModule} from '@angular/material/radio';

import { EstadoPedido } from 'src/app/clases/enum';
@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.component.html',
  styleUrls: ['./encuesta-cliente.component.scss']
})
export class EncuestaClienteComponent implements OnInit {
  
  public pedidos:Array<any> = [];
  private correo:string;
  private encuestaCliente:EncuestaCliente;
  public image: string;
  public encuestas:Array<any> = [];
  public  date: any;
  public answer1Model :any="mujer";
  public answer2Model: any="1";
  public answer3Model: any="1";
  public answer4Model: any="1";
  public answer5Model: any="1";

  public encuestado:boolean=false;
  public commentaryModel:string= "";

  public email: string ="";
  public name:string="";
  public hacerEncuesta:boolean=false;

  private opinion=3;
   
  constructor( private  data:  AuthService,
              private router: Router,
              private auth: AuthProvider) {    
     
      this.encuestaCliente = new EncuestaCliente(); 
      this.correo=localStorage.getItem("usuarioComanda");
      this.obtenerPedidos();
      console.log("encuestaCliente", this.encuestaCliente)
      this.obtenerEncuestasCliente();
     
   } 


   obtenerPedidos(){
     console.log("obtengo pedidos")
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      for (let i=0; i<=this.pedidos.length-1;i++){
        console.log("correos:", this.correo, this.pedidos[i].correo)
        if (this.pedidos[i].correo== this.correo){
          if (this.pedidos[i].estado==EstadoPedido.pagado)
          {
            this.hacerEncuesta=true;
          }
         
        }
      }
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }

   obtenerEncuestasCliente(){
     console.log("obtengo las encuestas:")
    this.data.getListaEncuestas("encuestaCliente").subscribe(lista => {
      this.encuestas=lista; 
      for(let i=0; i<this.encuestas.length-1; i++){
        if (this.encuestas[i].email==this.correo){
          this.encuestado=true;
          console.log("=====es el mismo usuario");
          if (this.encuestas[i].date< new Date()){
             console.log("es de ayer")
          }
        }
      }
      console.log("encuestas: ",this.encuestas); 
    });
    console.log("encuestas: ",this.encuestas)
   }

  ngOnInit() {}

 

guardarEncuesta(){    
    if (this.encuestado){
      console.log("el usuario ya fue encuestado")
    }
    else{
      console.log("commentaryModel", this.commentaryModel)
      this.encuestaCliente = new EncuestaCliente(); 
      console.log("guardo encuesta")
      let data = {    
        "date":new Date(),
        "email": localStorage.getItem("usuarioComanda"),
        "question1": this.encuestaCliente.question1,
        "question2": this.encuestaCliente.question2,
        "question3": this.encuestaCliente.question3,
        "question4": this.encuestaCliente.question4,
        "question5": this.encuestaCliente.question5,
        "answer1":this.answer1Model,        
        "answer2":this.answer2Model,        
        "answer3":this.answer3Model,       
        "answer4":this.answer4Model,        
        "answer5":this.answer5Model,    
        "commentary": this.commentaryModel
      }   
      console.log("guardo encuesta: ",data)
      this.auth.guardarEncuestaCliente(data).then(res =>{
        
      }).catch(error => {
        console.log(error,"error al guardar la encuesta"); 
    });
    }  
  }


  changeAnswer1(item: any) {
    this.answer1Model = item;
    console.log("this.answer1Model", this.answer1Model)
  }
  changeAnswer2(puntaje: any) {
    this.answer2Model = puntaje;
    console.log("this.answer2Model", this.answer2Model)
  }
  changeAnswer3(puntaje: any) {
    this.answer3Model = puntaje;
    console.log("this.answer3Model", this.answer3Model)
  }
  changeAnswer4(puntaje: any) {
    this.answer4Model = puntaje;
    console.log("this.answer4Model", this.answer4Model)
  }
  changeAnswer5(puntaje: any) {
    this.answer5Model = puntaje;
    console.log("this.answer5Model", this.answer5Model)
  }
  

  
  
}