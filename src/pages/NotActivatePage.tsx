import { useAuthStore } from '../store';

export const NotActivatePage = () => {
	const logoutUser = useAuthStore(state => state.logoutUser);

	const handleGoBack = () => {
		logoutUser();
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white shadow-lg rounded-lg p-8 max-w-md text-center'>
				<h1 className='font-bold text-xl mb-4 text-gray-800'>
					Cuenta no Activada
				</h1>
				<p className='text-gray-600 mb-8'>
					Su cuenta aún no ha sido activada. Por favor, espere a que
					un administrador active su cuenta.
				</p>
				<button
					onClick={handleGoBack}
					className='bg-purple80 text-white px-4 py-2 rounded hover:bg-purple100 transition duration-300'
				>
					Volver
				</button>
			</div>
		</div>
	);
};
