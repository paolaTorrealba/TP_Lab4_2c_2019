import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { AuthProvider } from 'src/app/providers/auth';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.component.html',
  styleUrls: ['./encuesta-cliente.component.scss']
})
export class EncuestaClienteComponent implements OnInit {
  private correo:string;
  private encuestaCliente:EncuestaCliente;
  public image: string;
  public  date: any;
  public answer1Model :any="mujer";
  public answer2Model: any="1";
  public answer3Model: any="1";
  public answer4Model: any="1";
  public answer5Model: any="1";


  public commentaryModel:string= "";

  public email: string ="";
  public name:string="";

  private opinion=3;
   
  constructor(            
              private authService: AuthService,    
              private router: Router,
              private auth: AuthProvider) {    
      
      this.encuestaCliente = new EncuestaCliente(); 
      this.correo=localStorage.getItem("usuarioComanda");
      console.log("encuestaCliente", this.encuestaCliente)
   } 

  ngOnInit() {}

 

guardarEncuesta(){    
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