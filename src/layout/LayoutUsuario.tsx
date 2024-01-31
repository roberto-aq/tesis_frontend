import { Navigate, Outlet } from 'react-router-dom';
import { Header, Loader, Sidebar } from '../components';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { useAuthStore } from '../store';
import { useEffect } from 'react';

export const LayoutUsuario = () => {
	const authStatus = useAuthStore(state => state.status);
	const isLoading = useAuthStore(state => state.isLoading);
	const checkStatus = useAuthStore(state => state.checkAuthStatus);

	if (authStatus === 'pending') {
		checkStatus();
		return <p className='text-5xl'>Loading....!!!</p>;
	}
	useEffect(() => {
		checkStatus();
	}, []);

	if (isLoading) {
		return <Loader fullscreen={true} />;
	}

	if (authStatus === 'unauthorized') {
		return <Navigate to='/auth/login' />;
	}

	return (
		<div className='flex'>
			<Sidebar />
			<div className='flex flex-1  flex-col'>
				<Header />
				<main className='py-7 px-10 flex-1 bg-primaryBackground flex flex-col'>
					<Breadcrumb />
					<Outlet />
				</main>
			</div>
		</div>
	);
};
