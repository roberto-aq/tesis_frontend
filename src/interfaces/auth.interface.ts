export type AuthStatus = 'authorized' | 'unauthorized' | 'pending';

export interface User {
	email: string;
	nombre: string;
	activo: boolean;
	rol: string;
}
