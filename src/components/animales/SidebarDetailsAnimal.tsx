import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import imagenDefaultAnimal from '../../assets/without-image-cow.png';
import { enlacesAnimales } from '../../data/enlaces';
import { Animal } from '../../interfaces';
import { FilesService } from '../../services/files.service';

interface SidebarDetailsAnimalProps {
	animal: Animal;
}

export const SidebarDetailsAnimal = ({
	animal,
}: SidebarDetailsAnimalProps) => {
	const [imageUrl, setImageUrl] = useState<string | undefined>('');
	const [loadingImage, setLoadingImage] = useState(false);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				setLoadingImage(true);
				// Aquí asumimos que tu backend devuelve una URL directa para la imagen
				const imageUrl = await FilesService.getFileAnimal(animal.id);
				setImageUrl(imageUrl); // Asegúrate de que 'url' sea la propiedad correcta
			} catch (error) {
				setImageUrl(undefined);
				throw new Error('El animal no tiene imagen asociada');
			} finally {
				setLoadingImage(false);
			}
		};

		if (animal.id) {
			fetchImage();
		}
	}, [animal.id]);

	return (
		<div className='flex flex-col gap-10 bg-white w-[220px] p-4 rounded-lg'>
			{loadingImage ? (
				<div className='flex justify-center items-center h-[200px] bg-gray-100 rounded-lg'>
					<p className='font-bold text-purple80'>
						Cargando imagen...
					</p>
				</div>
			) : (
				<img
					src={imageUrl || imagenDefaultAnimal}
					alt='imagen Animal'
					className='w-full h-[170px] object-cover rounded-lg'
				/>
			)}

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
