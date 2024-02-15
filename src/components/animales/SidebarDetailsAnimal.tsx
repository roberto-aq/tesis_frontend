import { NavLink } from 'react-router-dom';

import imagenAnimal from '../../assets/vaca1.webp';
import { enlacesAnimales } from '../../data/enlaces';

export const SidebarDetailsAnimal = () => {
	return (
		<div className='flex flex-col gap-10 bg-white w-[220px] p-4 rounded-lg'>
			<img
				src={imagenAnimal}
				alt='imagen Animal'
				className='w-full h-[170px] object-cover rounded-lg'
			/>

			<div className='w-full h-[2px] bg-primaryGray'></div>

			<div className='flex flex-col gap-3'>
				{enlacesAnimales.map(({ ruta, texto, Icono }) => (
					<NavLink
						to={ruta}
						end={ruta === ''}
						key={texto}
						className={({ isActive }) =>
							`
                         text-xs font-bold h-[45px] rounded-lg flex items-center justify-start gap-3 px-4  ${
														isActive
															? 'bg-purple80 text-white'
															: 'text-purple100'
													}
                        `
						}
					>
						<Icono className='mr-2' size={20} /> {texto}
					</NavLink>
				))}
			</div>
		</div>
	);
};
