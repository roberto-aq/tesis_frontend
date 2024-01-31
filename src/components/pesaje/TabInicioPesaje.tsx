import { CardInfo } from '../shared/CardInfo';

export const TabInicioPesaje = () => {
	return (
		<div className='p-8 grid grid-cols-4 gap-5'>
			<CardInfo
				title='Peso de nacimiento'
				content='21kg'
				tooltipText='Muestra el peso de nacimiento del animal'
			/>
			<CardInfo
				title='Edad actual en meses'
				content='13 meses'
				tooltipText='Muestra la edad actual del animal en meses'
			/>
			<CardInfo
				title='Último peso registrado'
				content='60kg'
				tooltipText='Muestra el último peso registrado'
			/>
			<CardInfo
				title='Peso esperado'
				content='70kg'
				tooltipText='Muestra el peso esperado del animal'
			/>
			<CardInfo
				title='Diferencia en Kilos'
				content='10kg'
				tooltipText=''
			/>
			<CardInfo
				title='Incremento peso mes'
				content='2kg'
				tooltipText=''
			/>
			<CardInfo
				title='Incremento Gr/Día'
				content='600gr'
				tooltipText=''
			/>
			<CardInfo
				title='Acumulado Gr/Día'
				content='3000gr'
				tooltipText=''
			/>
			<CardInfo
				title='Porcentaje Ideal'
				content='86%'
				tooltipText=''
			/>
		</div>
	);
};
