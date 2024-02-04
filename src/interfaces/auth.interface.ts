export type AuthStatus = 'authorized' | 'unauthorized' | 'pending';

export interface User {
	email: string;
	nombre: string;
	activo: boolean;
	rol: string;
}

export interface RegisterUser {
	email: string;
	password: string;
	nombre: string;
	apellidos: string;
	telefono?: string;
	direccion?: string;
}
