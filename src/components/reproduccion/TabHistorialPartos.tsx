import { CardInfo } from '../shared/CardInfo';
import { ButtonModal } from '../shared/ButtonModal';
import { useState } from 'react';
import { ModalForm } from '../shared/ModalForm';
import { FaPlus } from 'react-icons/fa';
import { ReproduccionAnimalLoaderData } from '../../interfaces/loader.interface';
import { AddParto } from './AddParto';
import { EditParto } from './EditParto';
import { ViewMoreParto } from './ViewMoreParto';

interface tabHistorialPartosProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoaderData;
}

export const TabHistorialPartos: React.FC<
	tabHistorialPartosProps
> = ({ reproduccionAnimalInfo }) => {
	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);

	const onChangeModal = (label: string) => {
		setIsOpenModal(true);
		setNameModal(label);
	};

	return (
		<div className='p-7 flex flex-col gap-8 items-center relative'>
			<h3 className='font-bold text-4xl mt-4'>Partos</h3>
			<div className='flex flex-col gap-5 w-full '>
				{/* ROW PARTO  */}
				<div className='flex justify-between items-center gap-2'>
					<div className='h-[25px] w-[25px] bg-purple80 rounded-full'></div>
					<div className='grid grid-cols-4 gap-3'>
						<CardInfo
							title='Número de Parto'
							content='1'
							tooltipText='Muestra el número de parto del animal'
						/>
						<CardInfo
							title='Fecha de Parto'
							content='30 de septiembre 2022'
							tooltipText='Muestra la fecha en la que se realizó el parto del animal'
						/>
						<CardInfo
							title='Número de Crías'
							content='2'
							tooltipText='Muestra el número de crías que tuvo el animal en el parto'
						/>
						<CardInfo
							title='Edad al parto 1'
							content='19 meses'
							tooltipText='Muestra la edad del animal desde que nació hasta su primer parto'
						/>
					</div>
					<button
						className='text-white bg-purple80 w-[110px] cursor-pointer font-bold rounded-md h-[40px] text-sm'
						onClick={() => onChangeModal('verMas')}
					>
						Ver más
					</button>
				</div>
			</div>

			<div className=' absolute right-0 mr-6 top-5 '>
				<ButtonModal
					textLabel='Añadir Parto'
					color='secondaryGreen'
					onClick={() => onChangeModal('añadirParto')}
					Icon={FaPlus}
				/>
			</div>

			{isOpenModal && (
				<ModalForm
					title={
						nameModal === 'añadirParto'
							? 'Añadir Parto'
							: 'Información Individual del Parto'
					}
					setIsOpenModalLocal={setIsOpenModal}
				>
					{nameModal === 'añadirParto' ? (
						<AddParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
						/>
					) : (
						<ViewMoreParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
						/>
					)}
				</ModalForm>
			)}
		</div>
	);
};
