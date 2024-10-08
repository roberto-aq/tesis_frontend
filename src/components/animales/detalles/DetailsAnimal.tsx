import { LayoutInfoAnimal } from './LayoutInfoAnimal';
import { CardInfo, Loader } from '../..';
import { useOutletContext } from 'react-router-dom';
import { Animal, AnimalLoader } from '../../../interfaces';

export const DetailsAnimal = () => {
	const { animalInfo } = useOutletContext<AnimalLoader>();

	if (!animalInfo) return <Loader />;

	return (
		<LayoutInfoAnimal title='Detalles'>
			<div className='grid grid-cols-3 gap-5 p-8'>
				<CardInfo
					title='Peso de Nacimiento'
					content={`${animalInfo.pesoNacimiento} Kg`}
					tooltipText='Lorem ipsum dolor  adipisicing elit. Maxime totam velit corrupti quidem delectus excepturi blanditiis. Fugit, vero. Fugit teuptatibus officiis, qui ad alias iure quo quos doloribus.o'
				/>
				<CardInfo
					title='Propietario'
					content={`${animalInfo.propietario}`}
					tooltipText='Lorem ipsum dolor  adipisicing elit. Maxime totam velit corrupti quidem delectus excepturi blanditiis. Fugit, vero. Fugit teuptatibus officiis, qui ad alias iure quo quos doloribus.o'
				/>
				<CardInfo
					title='Finca'
					content={`${animalInfo.nombreFinca}`}
					tooltipText='Lorem ipsum dolor  adipisicing elit. Maxime totam velit corrupti quidem delectus excepturi blanditiis. Fugit, vero. Fugit teuptatibus officiis, qui ad alias iure quo quos doloribus.o'
				/>
				<CardInfo
					title='Estado Reproductivo'
					content={`${animalInfo.estadoReproductivo.descripcion}`}
					tooltipText='Muestra el estado reproductivo del animal'
				/>
			</div>
		</LayoutInfoAnimal>
	);
};
