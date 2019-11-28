export class EncuestaCliente {
    id:string;    
    date:Date;
    email: string;
    question1: string="Hombre/Mujer:";
    question2: string="Puntuacion para la Mesa?";
    question3: string="¿Calidad de atención Mozo?"; 
    question4: string="¿Calidad de atención Cocinero?"; 
    question5: string="Puntuacion General para nuestro Restaurante?";     
   
    answer1: string ="mujer";
    answer2: string = "0";
    answer3: string= "0";
    answer4: string= "0";
    answer5: string= "0";

    commentary: string= "";  
}