import { formatearFecha } from '../../helpers/formatDate';
import { useReproduccionStore } from '../../store/reproduccion';
import { CardInfo } from '../shared/CardInfo';

export const TabInicio = () => {
	const servicios = useReproduccionStore(state => state.servicios);

	// Ordenar servicios por fecha de servicio de más reciente a más antiguo
	const serviciosOrdenados = servicios.sort(
		(a, b) => +new Date(b.fechaServicio) - +new Date(a.fechaServicio)
	);

	const ultimoServicio = serviciosOrdenados[0];

	// Encuentra el último servicio con el estado 'Preñada'
	const ultimoServicioPreñada = servicios.find(
		servicio =>
			servicio.estadoReproductivo.descripcion.toLowerCase() ===
			'preñada'
	);

	// Si el último servicio de preñez existe, calcular la fecha estimada de parto y de secado
	let fechaEstimadaParto;
	let fechaSecado;

	if (ultimoServicioPreñada) {
		const duracionGestacion = 280; // Duración promedio de la gestación en días
		const diasParaSecado = 60; // Días antes de la fecha estimada de parto para el secado

		fechaEstimadaParto = new Date(
			ultimoServicioPreñada.fechaServicio
		);
		fechaEstimadaParto.setDate(
			fechaEstimadaParto.getDate() + duracionGestacion
		);

		fechaSecado = new Date(fechaEstimadaParto);
		fechaSecado.setDate(fechaSecado.getDate() - diasParaSecado);
	}

	return (
		<div className='grid grid-cols-3 gap-5 p-8'>
			<CardInfo
				title='Fecha de Servicio Preñez'
				content={formatearFecha(ultimoServicioPreñada?.fechaServicio)}
				tooltipText='Muestra la fecha de Servicio Preñez. Esta es la fecha en la que el animal fue preñada'
			/>
			<CardInfo
				title='Número de Servicios'
				content={servicios.length}
				tooltipText='Muestra el número de servicios que ha tenido el animal'
			/>
			<CardInfo
				title='Estado Reproductivo Actual'
				content={
					ultimoServicio?.estadoReproductivo.descripcion || '-'
				}
				tooltipText='Muestra el estado reproductivo actual del animal'
			/>
			<CardInfo
				title='Fecha de Secado'
				content={formatearFecha(fechaSecado) || '-'}
				tooltipText='Muestra la fecha de Secado. Esta es la fecha en la que el animal deja de producir leche para prepararse para el parto'
			/>
			<CardInfo
				title='Fecha estimada de Parto'
				content={formatearFecha(fechaEstimadaParto) || '-'}
				tooltipText='Muestra la fecha estimada de parto del animal'
			/>
		</div>
	);
};
