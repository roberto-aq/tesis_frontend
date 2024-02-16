import { StateCreator, create } from 'zustand';
import type {
	AuthStatus,
	RegisterUser,
	User,
} from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { devtools, persist } from 'zustand/middleware';
import { FincasResponse, UsuariosInactivos } from '../../interfaces';

export interface AuthState {
	status: AuthStatus;
	token?: string;
	fincaId: string;
	selectedFinca: FincasResponse | null;
	user?: User;
	isLoading: boolean;
	error: string | null;
	usuariosInactivos: UsuariosInactivos[];

	loginUser: (email: string, password: string) => Promise<void>;
	registerUser: (usuario: RegisterUser) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
	logoutUser: () => void;
	clearError: () => void;
	setFincaId: (id: string) => void;
	setStatus: (status: AuthStatus) => void;
	getAllInactiveUsers: () => Promise<void>;
	setSelectedFinca: (finca: FincasResponse) => void;
}

const storeApi: StateCreator<AuthState> = set => ({
	status: 'pending',
	token: undefined,
	user: undefined,
	isLoading: false,
	error: null,
	fincaId: '',
	selectedFinca: null,
	usuariosInactivos: [],

	loginUser: async (email, password) => {
		try {
			set({ isLoading: true, error: null });
			// await new Promise(resolve => setTimeout(resolve, 500));

			const { token, fincaId, ...user } = await AuthService.login(
				email,
				password
			);
			set({ status: 'authorized', token, user, fincaId });
		} catch (error) {
			set({
				status: 'unauthorized',
				token: undefined,
				user: undefined,
				error: 'Credenciales incorrectas',
			});
			throw new Error('Acceso no autorizado');
		} finally {
			set({ isLoading: false });
		}
	},

	registerUser: async usuario => {
		try {
			set({ isLoading: true, error: null });
			const { token, ...user } = await AuthService.register(usuario);
			set({ status: 'unauthorized', isLoading: false, token, user });
		} catch (error) {
			set({
				status: 'unauthorized',
				token: undefined,
				user: undefined,
				error: 'Error al registrar usuario',
			});
			throw new Error('Error al registrar usuario');
		} finally {
			set({ isLoading: false });
		}
	},

	checkAuthStatus: async () => {
		try {
			set({ isLoading: true });
			const { token, ...usuario } = await AuthService.checkStatus();
			set({
				status: 'authorized',
				token,
				user: usuario,
			});
		} catch (error) {
			set({
				status: 'unauthorized',
				token: undefined,
				user: undefined,
			});
			throw new Error('Acceso no autorizado');
		} finally {
			set({ isLoading: false });
		}
	},

	logoutUser: async () => {
		set({ isLoading: true });
		await new Promise(resolve => setTimeout(resolve, 500));

		set({
			status: 'unauthorized',
			token: undefined,
			user: undefined,
			isLoading: false,
			fincaId: undefined,
			selectedFinca: null,
			error: null,
		});
	},

	clearError: () => {
		set({ error: null });
	},

	setFincaId: id => {
		set({ fincaId: id });
	},
	setStatus: status => {
		set({ status });
	},

	getAllInactiveUsers: async () => {
		try {
			const usuariosInactivos =
				await AuthService.getAllInactiveUsers();
			set({ usuariosInactivos });
		} catch (error: any) {
			set({ error: error.message });
		}
	},

	setSelectedFinca: finca => {
		set({ selectedFinca: finca });
	},
});

export const useAuthStore = create<AuthState>()(
	devtools(persist(storeApi, { name: 'auth-storage' }))
);
