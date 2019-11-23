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
    cerrado = "cerrado",
    entregado = "entregado",
    listoParaServir = "listo para servir",
    enPreparacion = "enPreparacion",
    aceptado = "aceptado",
    cancelado = "cancelado",
  
};

export enum EstadoReserva {
    activa = "activa",
    finalizada = "finalizada",
    
};

