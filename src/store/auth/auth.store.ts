import { StateCreator, create } from 'zustand';
import type {
	AuthStatus,
	User,
} from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
	status: AuthStatus;
	token?: string;
	fincaId: string;
	user?: User;
	isLoading: boolean;
	error: string | null;

	loginUser: (email: string, password: string) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
	logoutUser: () => void;
	clearError: () => void;
}

const storeApi: StateCreator<AuthState> = set => ({
	status: 'pending',
	token: undefined,
	user: undefined,
	isLoading: false,
	error: null,
	fincaId: '',

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
		});
	},

	clearError: () => {
		set({ error: null });
	},
});

export const useAuthStore = create<AuthState>()(
	devtools(persist(storeApi, { name: 'auth-storage' }))
);
