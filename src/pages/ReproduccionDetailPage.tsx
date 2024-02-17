import {
	AddService,
	AlertError,
	EditService,
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
import { useEffect, useState } from 'react';
import { ReproduccionAnimalLoader } from '../interfaces';
import { useReproduccionStore } from '../store/reproduccion';
import { useRedirectOnFincaChange } from '../hooks/useRedirectOnFincaChange';

export const ReproduccionDetailPage = () => {
	const animalById = useLoaderData() as ReproduccionAnimalLoader;

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
	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);

	const servicios = useReproduccionStore(state => state.servicios);
	const getServicios = useReproduccionStore(
		state => state.getServicios
	);
	const getPartos = useReproduccionStore(state => state.getPartos);
	const error = useReproduccionStore(state => state.error);

	useRedirectOnFincaChange('/inicio/reproduccion', animalById.info);

	useEffect(() => {
		getServicios(animalById.info.id);
		getPartos(animalById.info.id);
	}, []);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const [isModalEditOpen, setIsModalEditOpen] = useState(false);

	console.log(animalById);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<InfoHeaderAnimal
				animal={animalById.info}
				onChangeModal={onChangeModal}
				textLabel='Añadir Servicio'
				Icon={FaPlus}
				color='secondaryGreen'
				hasEdit={servicios.length > 0}
				textLabelEdit='Editar Servicios'
				setIsModalEditOpen={setIsModalEditOpen}
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

			{isModalEditOpen && (
				<ModalForm
					title='Editar Servicios'
					setIsOpenModalLocal={setIsModalEditOpen}
				>
					<EditService
						animal={animalById.info}
						setIsModalEditOpen={setIsModalEditOpen}
					/>
				</ModalForm>
			)}

			{showAlertError && error && <AlertError error={error} />}
		</div>
	);
};
