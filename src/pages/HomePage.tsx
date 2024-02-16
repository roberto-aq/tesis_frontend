import { useEffect } from 'react';
import { useAnimalesStore } from '../store/animales';
import { useAuthStore } from '../store';
import { useFincasStore } from '../store/fincas/fincas.store';
import {
	CardInfoFinca,
	CardInfoGanado,
	ParrafoInfoGanado,
} from '../components';

export interface Conteo {
	[key: string]: number;
}

export const HomePage = () => {
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const animales = useAnimalesStore(state => state.animales);

	const fincaId = useAuthStore(state => state.fincaId);

	const getFincaByUser = useFincasStore(
		state => state.getFincaByUser
	);
	const fincaById = useFincasStore(state => state.fincaById);

	let distribucionSexo: Conteo = { Hembra: 0, Macho: 0 };
	let distribucionGrupo: Conteo = {};
	let distribucionEstadoReproductivo: Conteo = {};
	let distribucionRaza: Conteo = {};

	animales.forEach(animal => {
		// Conteo por sexo
		distribucionSexo[animal.sexo] =
			(distribucionSexo[animal.sexo] || 0) + 1;

		// Conteo por grupo
		const grupo = animal.grupo.descripcion;
		distribucionGrupo[grupo] = (distribucionGrupo[grupo] || 0) + 1;

		// Conteo por estado reproductivo
		const estadoReproductivo = animal.estadoReproductivo.descripcion;
		distribucionEstadoReproductivo[estadoReproductivo] =
			(distribucionEstadoReproductivo[estadoReproductivo] || 0) + 1;

		// Conteo por raza
		const raza = animal.raza.nombre;
		distribucionRaza[raza] = (distribucionRaza[raza] || 0) + 1;
	});

	useEffect(() => {
		if (fincaId) {
			getAnimales(fincaId);
			getFincaByUser(fincaId);
		}
	}, []);

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-6'>
				<h1 className='text-3xl font-bold text-center text-purple100 '>
					Información General de la Finca
				</h1>
				{fincaById ? (
					<div className='grid grid-cols-3 gap-5'>
						<CardInfoFinca
							label='Nombre de la finca'
							content={fincaById?.nombre || ''}
						/>
						<CardInfoFinca
							label='Propietario'
							content={fincaById?.propietario || ''}
						/>
						<CardInfoFinca
							label='Ubicación o municipio'
							content={fincaById?.municipio || ''}
						/>
						<CardInfoFinca
							label='Área total'
							content={`${fincaById?.areaTotal} hectáreas`}
						/>
						<CardInfoFinca
							label='Área aprovechable'
							content={`${fincaById?.areaAprovechable} hectáreas`}
						/>
					</div>
				) : (
					<div className='flex'>
						<p className='text-purple100 text-center'>
							No hay datos disponibles
						</p>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-3'>
				<h1 className='text-3xl font-bold text-center text-purple100'>
					Resumen Ganado
				</h1>
				<div className='grid grid-cols-3 gap-5'>
					<div className='col-span-3'>
						<div className='bg-purple60 rounded-lg p-6 flex flex-col gap-7 items-center shadow-lg'>
							<div className='flex flex-col gap-2 items-center'>
								<p className='font-bold text-purple100 text-2xl'>
									Total de animales:
								</p>
								<p className='text-purple100 font-bold text-5xl'>
									{animales.length}
								</p>
							</div>
							<div className='grid grid-cols-2 w-full gap-5 '>
								<CardInfoGanado label='Distribución por sexo'>
									{Object.keys(distribucionSexo).map((key, index) => (
										<ParrafoInfoGanado
											clave={key}
											distribucion={distribucionSexo}
											key={index}
										/>
									))}
								</CardInfoGanado>
								<CardInfoGanado label='Distribución por grupo'>
									{Object.keys(distribucionGrupo).length > 0 ? (
										Object.keys(distribucionGrupo).map(
											(key, index) => (
												<ParrafoInfoGanado
													clave={key}
													distribucion={distribucionGrupo}
													key={index}
												/>
											)
										)
									) : (
										<p className='font-semibold text-purple100 text-center mt-5'>
											No hay datos disponibles.
										</p>
									)}
								</CardInfoGanado>
								<CardInfoGanado label='Distribución por estado reproductivo'>
									{Object.keys(distribucionEstadoReproductivo)
										.length > 0 ? (
										Object.keys(distribucionEstadoReproductivo).map(
											(key, index) => (
												<ParrafoInfoGanado
													clave={key}
													distribucion={
														distribucionEstadoReproductivo
													}
													key={index}
												/>
											)
										)
									) : (
										<p className='font-semibold text-purple100 text-center mt-5'>
											No hay datos disponibles.
										</p>
									)}
								</CardInfoGanado>

								<CardInfoGanado label='Distribución por raza'>
									{Object.keys(distribucionRaza).length > 0 ? (
										Object.keys(distribucionRaza).map(
											(key, index) => (
												<ParrafoInfoGanado
													clave={key}
													distribucion={distribucionRaza}
													key={index}
												/>
											)
										)
									) : (
										<p className='font-semibold text-purple100 text-center mt-5'>
											No hay datos disponibles.
										</p>
									)}
								</CardInfoGanado>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
