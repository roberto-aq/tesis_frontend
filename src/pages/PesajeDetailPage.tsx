import {
	AddPeso,
	AlertError,
	InfoHeaderAnimal,
	LayoutInfoAnimal,
	Loader,
	ModalForm,
	TabHistorialPesaje,
	TabInicioPesaje,
} from '../components';
import { useLoaderData } from 'react-router-dom';
import { useGeneralStore, usePesajeStore } from '../store';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { PesajeAnimalLoader } from '../interfaces';
import { useRedirectOnFincaChange } from '../hooks/useRedirectOnFincaChange';

export const PesajeDetailPage = () => {
	const animalById = useLoaderData() as PesajeAnimalLoader;

	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);

	const error = usePesajeStore(state => state.error);

	const tabs = [
		{ label: 'Inicio', content: <TabInicioPesaje /> },
		{
			label: 'Historial de Pesaje',
			content: <TabHistorialPesaje animal={animalById.animal} />,
		},
	];

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const isOpenModal = useGeneralStore(state => state.isOpenModal);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	useRedirectOnFincaChange('/inicio/pesaje', animalById.animal);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<InfoHeaderAnimal
				animal={animalById.animal}
				onChangeModal={onChangeModal}
				textLabel='Añadir Peso'
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
				<ModalForm title='Agregar Peso'>
					<AddPeso animalById={animalById.animal} />
				</ModalForm>
			)}
			{showAlertError && error && <AlertError error={error} />}
		</div>
	);
};
