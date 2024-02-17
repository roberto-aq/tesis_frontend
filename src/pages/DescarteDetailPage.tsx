import { useLoaderData } from 'react-router-dom';
import {
	AddDescarte,
	AlertError,
	CardInfo,
	EditDescarte,
	InfoHeaderAnimal,
	LayoutInfoAnimal,
	ModalDelete,
	ModalForm,
} from '../components';
import { useDescarteStore, useGeneralStore } from '../store';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { formatDateShort } from '../helpers/formatDate';
import { DescarteAnimalLoader } from '../interfaces';
import { useReproduccionStore } from '../store/reproduccion';
import { useRedirectOnFincaChange } from '../hooks/useRedirectOnFincaChange';

export const DescarteDetailPage = () => {
	const animalById = useLoaderData() as DescarteAnimalLoader;
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);
	const setModalError = useGeneralStore(state => state.setModalError);

	const descarte = useDescarteStore(state => state.descarte);
	const deleteDescarte = useDescarteStore(
		state => state.deleteDescarte
	);
	const error = useDescarteStore(state => state.error);

	const partos = useReproduccionStore(state => state.partos);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const handleDelete = () => {
		deleteDescarte(animalById.animal.id);
		setModalError(false);
	};

	const calculateAge = (birthDate: string) => {
		const birthday = new Date(birthDate);
		const today = new Date();
		let age = today.getFullYear() - birthday.getFullYear();
		const m = today.getMonth() - birthday.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
			age--;
		}

		return age;
	};

	useRedirectOnFincaChange('/inicio/descarte', animalById.animal);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<InfoHeaderAnimal
				animal={animalById.animal}
				onChangeModal={onChangeModal}
				textLabel={
					descarte && Object.keys(descarte).length > 0
						? 'Editar Descarte'
						: 'Añadir Descarte'
				}
				Icon={
					descarte && Object.keys(descarte).length > 0
						? MdEdit
						: FaPlus
				}
				color={
					descarte && Object.keys(descarte).length > 0
						? 'blueEdit'
						: 'secondaryGreen'
				}
			/>
			<LayoutInfoAnimal title='Descarte'>
				<div className='grid grid-cols-4 p-8 gap-5'>
					<CardInfo
						title='Edad actual en años'
						content={
							`${calculateAge(
								animalById.animal.fechaNacimiento
							)} años` || '-'
						}
						tooltipText='Muestra la edad del animal en años'
					/>
					<CardInfo
						title='Número de partos'
						content={partos.length || '-'}
						tooltipText='Muestra el número de partos del animal'
					/>
					<CardInfo
						title='Estado Reproductivo'
						content={animalById.animal.estadoReproductivo.descripcion}
						tooltipText='Muestra el estado reproductivo del animal (Servida, Preñada, Vacía)'
					/>
					<CardInfo
						title='Grupo'
						content={animalById.animal.grupo.descripcion}
						tooltipText='Muestra el grupo al que pertenece el animal (Vaquillones, Vacas, Novillas..)'
					/>
					<div className='flex col-span-4 justify-center my-4'>
						<h3 className='font-bold text-3xl'>
							Información del Descarte
						</h3>
					</div>
					<div className='flex col-span-4 gap-5'>
						<div className='flex-1'>
							<CardInfo
								title='Fecha de Descarte'
								content={
									formatDateShort(descarte?.fechaDescarte ?? '') ||
									'-'
								}
								tooltipText='Muestra la fecha de descarte del animal'
							/>
						</div>
						<div className='flex-1'>
							<CardInfo
								title='Causa general de descarte'
								content={descarte?.causaGeneral.descripcion || '-'}
								tooltipText='Muestra la causa general del descarte del animal'
							/>
						</div>
						<div className='flex-1'>
							<CardInfo
								title='Causa específica de descarte'
								content={
									descarte?.causaEspecifica?.descripcion || '-'
								}
								tooltipText='Muestra la causa específica del descarte del animal'
							/>
						</div>
					</div>

					{descarte && (
						<button
							className='bg-red-500 text-white w-[60px] h-[60px] rounded-full flex items-center justify-center hover:bg-red-600 absolute bottom-6 right-6'
							onClick={() => setModalError(true)}
						>
							<FaTrashAlt size={25} />
						</button>
					)}
				</div>
			</LayoutInfoAnimal>

			{isOpenModal && (
				<ModalForm
					title={
						descarte && Object.keys(descarte).length > 0
							? 'Editar Descarte '
							: 'Agregar Descarte'
					}
				>
					{/* DE MANERA CONDICIONAL MOSTRAR EL EDITDESCARTEFORM O EL ADDDESCARTEFORM */}
					{descarte && Object.keys(descarte).length > 0 ? (
						<EditDescarte animalById={animalById.animal} />
					) : (
						<AddDescarte animalById={animalById.animal} />
					)}
				</ModalForm>
			)}

			{showAlertError && error && <AlertError error={error} />}

			<ModalDelete handleDelete={handleDelete} />
		</div>
	);
};
