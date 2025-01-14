export enum EstadoMesa {
    cerrada = "cerrada",
    conClientePagando = "con cliente pagando",
    conClienteEsperadno = "con cliente esperando",
    conClienteComiendo = "con cliente comiendo",
    reservada = "reservada",    
};


export enum Perfil {
    socio = "socio",
    cliente = "cliente",
    bartender = "bartender",
    cervecero = "cervecero",
    cocinero = "cocinero",
    mozo = "mozo",
};

export enum EstadoPedido {
    pendiente = "pendiente",
    aceptado = "aceptado",
    enPreparacion = "enPreparacion",
    listoParaServir = "listo para servir",
    entregado = "entregado",
    recibido = "recibido",
    pagado="pagado",
    cerrado = "cerrado",    
    cancelado = "cancelado", 
    
  
};

export enum EstadoReserva {
    activa = "activa",
    finalizada = "finalizada",
    
};

export enum TipoProducto {
    plato = "plato",
    cerveza = "cerveza",
    barra = "barra",
    
};

