import { NavLink } from 'react-router-dom';
import LogoUtm from '../../assets/logoutm-sin-fondo.png';
import { enlacesSidebar } from '../../data/enlaces';
import { useAuthStore } from '../../store';

export const Sidebar = () => {
	const logoutUser = useAuthStore(state => state.logoutUser);

	return (
		<aside className='w-[265px] bg-purple100 h-screen flex flex-col px-6 py-9 gap-6'>
			<div className=' flex flex-col gap-10'>
				<img
					src={LogoUtm}
					alt='Logo Utm'
					className='w-full h-[130px] object-contain'
				/>
				<div className='border'></div>
			</div>
			<div className='flex flex-col gap-5 flex-1'>
				{enlacesSidebar.map(({ ruta, texto, Icono }) => (
					<NavLink
						to={ruta}
						end={ruta === ''}
						key={texto}
						className={({ isActive }) =>
							`
                        text-white text-base font-bold h-[50px] rounded-lg flex items-center justify-start gap-3 px-8 ${
													isActive ? 'bg-secondaryGreen' : ''
												}
                        `
						}
					>
						<Icono className='mr-2' size={20} /> {texto}
					</NavLink>
				))}
			</div>
			<button
				onClick={logoutUser}
				className='flex border border-red-700 h-[50px] justify-center items-center rounded-lg cursor-pointer'
			>
				<p className='text-white'>Cerrar Sesión</p>
			</button>
		</aside>
	);
};
