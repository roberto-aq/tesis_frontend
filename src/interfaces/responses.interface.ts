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

export interface Causa {
	id: string;
	descripcion: string;
}

interface Parto {
	id: string;
	fechaParto: string;
	numeroParto: number;
	crias: Cria[];
}

interface Cria {
	id: string;
	sexo: string;
}

interface Servicio {
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
