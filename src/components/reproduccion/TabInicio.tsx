import { CardInfo } from '../shared/CardInfo';

export const TabInicio = () => {
	return (
		<div className='grid grid-cols-3 gap-5 p-8'>
			<CardInfo
				title='Fecha de Servicio Preñez'
				content='1 Febrero 2023'
				tooltipText='Muestra la fecha de Servicio Preñez. Esta es la fecha en la que el animal fue preñada'
			/>
			<CardInfo title='Número de Servicios' content='3' />
			<CardInfo
				title='Estado Reproductivo Actual'
				content='Preñada'
				tooltipText='Muestra el estado reproductivo actual del animal'
			/>
			<CardInfo
				title='Fecha de Secado'
				content='1 Febrero 2023'
				tooltipText='Muestra la fecha de Secado. Esta es la fecha en la que el animal deja de producir leche para prepararse para el parto'
			/>
			<CardInfo
				title='Fecha estimada de Parto'
				content='1 Febrero 2023'
				tooltipText='Muestra la fecha estimada de parto del animal'
			/>
		</div>
	);
};
