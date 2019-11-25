import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { AuthProvider } from 'src/app/providers/auth';

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
  public answer1Model: string="mujer";
  public answer2Model: string="Internet";
  public answer3Model: string="Muy Buena";
  public answer4Model: string="si";
  public answer5Model: string="Calidad";
  public answer6Model: string="buena";
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
    
    this.encuestaCliente.email= this.correo;   
    this.encuestaCliente.date=new Date(); 
    this.encuestaCliente.answer1=this.answer1Model,        
    this.encuestaCliente.answer2=this.answer2Model,        
    this.encuestaCliente.answer3=this.answer3Model,       
    this.encuestaCliente.answer4=this.answer4Model,        
    this.encuestaCliente.answer5=this.answer5Model,       
    this.encuestaCliente.answer6=this.answer6Model,
    this.encuestaCliente.commentary= this.commentaryModel

    this.auth.guardarEncuestaCliente(this.encuestaCliente).then(res =>{
      
    }).catch(error => {
      console.log(error,"error al guardar el pedido"); 
  });
  
  }

  
  modificarTextoRange() {
    let arrayAux = ['muy mala','mala','buena','muy buena','excelente'];
    this.answer6Model= arrayAux[this.opinion - 1];
   
  }
  
}