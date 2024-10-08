import { Animal } from './animal.interface';

export interface PesajeAnimalLoader {
	animal: Animal;
}

export interface DescarteAnimalLoader {
	animal: Animal;
}

export interface ProduccionAnimalLoader {
	animal: Animal;
}

export interface AnimalLoader {
	animalInfo: Animal;
}

export interface ReproduccionAnimalLoader {
	reproduccion: ReproduccionAnimalResponse;
	info: Animal;
}

export interface ReproduccionAnimalResponse {
	animal: Animal;
	partos: Parto[];
	servicios: Servicio[];
}

export interface PesoResponse {
	id: string;
	fechaRegistro: string;
	peso: string;
	observaciones?: null | string;
}

export interface DescarteResponse {
	id: string;
	fechaDescarte: string;
	causaEspecifica: Causa;
	causaGeneral: Causa;
}

export interface ProduccionResponse {
	id: string;
	fechaRegistro: string;
	totalLitros: string;
}

export interface FincasResponse {
	id: string;
	nombre: string;
	municipio: string;
	propietario: string;
	administrador: string;
	veterinario: null;
	areaTotal: number;
	areaAprovechable: number;
	forrajes: string;
	riego: boolean;
	fertilizacion: boolean;
	numeroPotreros: null;
	rotacion: null;
	fecha_registro: string;
	notas: null;
}

export interface UsuariosInactivos {
	id: string;
	email: string;
	nombre: string;
	apellidos: string;
	telefono: null | string;
	direccion: null | string;
	rol: string;
	activo: boolean;
	fecha_creacion: string;
	fecha_ultima_modificacion: string;
	finca: FincasResponse | null;
}

export interface Causa {
	id: string;
	descripcion: string;
}

export interface Parto {
	id: string;
	fechaParto: string;
	numeroParto: number;
	crias: Cria[];
}

interface Cria {
	id: string;
	sexo: string;
}

export interface Servicio {
	id: string;
	fechaServicio: string;
	fechaCelo: string;
	numeroServicio: number;
	estadoReproductivo: EstadoReproductivo;
}

interface EstadoReproductivo {
	id: number;
	descripcion: string;
}
