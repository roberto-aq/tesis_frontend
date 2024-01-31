export interface Animal {
	id: string;
	nombre: string;
	numeroIdentificador: string;
	fechaNacimiento: string;
	pesoNacimiento: string;
	imagenPath?: string;
	sexo: string;
	registroPadre?: string;
	nombrePadre?: string;
	grupo: Grupo;
	estadoReproductivo: EstadoReproductivo;
	raza: Raza;
	propietario: string;
	nombreFinca: string;
	madre: Madre;
}

export interface Raza {
	id: string;
	nombre: string;
}

export interface Grupo {
	id: string;
	descripcion: string;
}

export interface EstadoReproductivo {
	id: number;
	descripcion: string;
}
export interface Madre {
	id: string;
	nombre: string;
	numeroIdentificador: string;
	fechaNacimiento: string;
	imagenPath: string;
	sexo: string;
	pesoNacimiento: string;
	registroPadre: null;
	nombrePadre: null;
}

export interface Alimentacion {
	id: string;
	fechaRegistro: string;
	cantidad: number;
	observaciones: string | null;
}

export interface Sanidad {
	id: string;
	fechaRegistro: string;
	observaciones: string;
}
