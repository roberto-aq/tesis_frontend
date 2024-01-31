import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Loader, ModalErrorAuth } from '../components';
import { useState } from 'react';

export const LayoutAuth = () => {
	const { pathname } = useLocation();
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

	const authStatus = useAuthStore(state => state.status);
	const checkAuthStatus = useAuthStore(
		state => state.checkAuthStatus
	);
	const isLoading = useAuthStore(state => state.isLoading);
	const error = useAuthStore(state => state.error);

	if (authStatus === 'pending') {
		checkAuthStatus();
		return <p>Loading..... check</p>;
	}

	if (isLoading) {
		return <Loader fullscreen={true} />;
	}

	if (authStatus === 'authorized') {
		return <Navigate to='/inicio' />;
	}

	if (pathname === '/auth') {
		return <Navigate to='/auth/login' />;
	}

	return (
		<div className='h-screen flex items-center flex-col justify-center gap-7'>
			<h1 className='text-[60px] font-bold text-purple100'>
				Vaquinnova
			</h1>
			<Outlet />
			{error && (
				<ModalErrorAuth
					errorMessage={error}
					setIsModalErrorOpen={setIsModalErrorOpen}
				/>
			)}
		</div>
	);
};
