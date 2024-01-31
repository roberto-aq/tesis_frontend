import {
	AddService,
	InfoHeaderAnimal,
	LayoutInfoAnimal,
	ModalForm,
	TabHistorialPartos,
	TabInicio,
	TabServiciosActuales,
} from '../components';
import { useLoaderData } from 'react-router-dom';
import { useGeneralStore } from '../store';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { ReproduccionAnimalLoaderData } from '../interfaces/loader.interface';

export const ReproduccionDetailPage = () => {
	const animalById = useLoaderData() as ReproduccionAnimalLoaderData;
	// console.log(animalById);

	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const tabs = [
		{ label: 'Inicio', content: <TabInicio /> },
		{
			label: 'Servicios Actuales',
			content: <TabServiciosActuales />,
		},
		{
			label: 'Historial de Partos',
			content: (
				<TabHistorialPartos reproduccionAnimalInfo={animalById} />
			),
		},
	];

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const isOpenModal = useGeneralStore(state => state.isOpenModal);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	console.log(animalById);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<InfoHeaderAnimal
				animal={animalById.info}
				onChangeModal={onChangeModal}
				textLabel='Añadir Servicio'
				Icon={FaPlus}
				color='secondaryGreen'
			/>
			<LayoutInfoAnimal title='Reproducción'>
				{/* MENÚ PESTAÑAS */}
				<div className='flex h-[50px]  px-6 shadow-md gap-6'>
					{tabs.map((tab, index) => (
						<button
							className={`border-b-2   px-8  font-bold capitalize ${
								activeTabIndex === index
									? 'text-purple80 border-purple80'
									: 'text-primaryGray border-transparent'
							}`}
							key={index}
							onClick={() => setActiveTabIndex(index)}
						>
							{tab.label}
						</button>
					))}
				</div>
				{tabs[activeTabIndex].content}
			</LayoutInfoAnimal>

			{isOpenModal && (
				<ModalForm title='Añadir Servicio'>
					<AddService reproduccionAnimalInfo={animalById} />
				</ModalForm>
			)}
		</div>
	);
};
