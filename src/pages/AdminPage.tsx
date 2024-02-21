import { useEffect, useState } from 'react';
import { useAnimalesStore } from '../store/animales';
import {
	AddCausaEspecifica,
	AddCausaGeneral,
	AddEstadoReproductivo,
	AddGrupo,
	AddRaza,
	CardItem,
	EditCausaEspecifica,
	EditCausaGeneral,
	EditEstadoReproductivo,
	EditGrupo,
	EditRaza,
	ModalForm,
} from '../components';
import {
	Causa,
	EstadoReproductivo,
	Grupo,
	Raza,
} from '../interfaces';
import { useDescarteStore } from '../store';

export const AdminPage = () => {
	const getRazas = useAnimalesStore(state => state.getRazas);
	const getEstadosReproductivos = useAnimalesStore(
		state => state.getEstadosReproductivos
	);
	const razas = useAnimalesStore(state => state.razas);
	const estadosReproductivos = useAnimalesStore(
		state => state.estadosReproductivos
	);
	const grupos = useAnimalesStore(state => state.grupos);
	const getGrupos = useAnimalesStore(state => state.getGrupos);
	const deleteRaza = useAnimalesStore(state => state.deleteRaza);
	const deleteEstadoReproductivo = useAnimalesStore(
		state => state.deleteEstadoReproductivo
	);
	const deleteGrupo = useAnimalesStore(state => state.deleteGrupo);
	const deleteCausaGeneral = useDescarteStore(
		state => state.deleteCausaGeneral
	);
	const deleteCausaEspecifica = useDescarteStore(
		state => state.deleteCausaEspecifica
	);

	const causasGenerales = useDescarteStore(
		state => state.causasGenerales
	);
	const getCausasGenerales = useDescarteStore(
		state => state.getCausasGenerales
	);
	const causasEspecificas = useDescarteStore(
		state => state.causasEspecificas
	);
	const getCausasEspecificas = useDescarteStore(
		state => state.getCausasEspecificas
	);

	const [isModalRazaOpen, setIsModalRazaOpen] = useState(false);
	const [razaSelected, setRazaSelected] = useState<Raza | null>(null);
	const [
		isModalEstadoReproductivoOpen,
		setIsModalEstadoReproductivoOpen,
	] = useState(false);
	const [estadoReproductivoSelected, setEstadoReproductivoSelected] =
		useState<EstadoReproductivo | null>(null);
	const [isModalGrupoOpen, setIsModalGrupoOpen] = useState(false);
	const [grupoSelected, setGrupoSelected] = useState<Grupo | null>(
		null
	);
	const [isModalCausaGeneralOpen, setIsModalCausaGeneralOpen] =
		useState(false);
	const [causaGeneralSelected, setCausaGeneralSelected] =
		useState<Causa | null>(null);
	const [isModalCausaEspecificaOpen, setIsModalCausaEspecificaOpen] =
		useState(false);
	const [causaEspecificaSelected, setCausaEspecificaSelected] =
		useState<Causa | null>(null);

	const [nameModal, setNameModal] = useState('');

	useEffect(() => {
		getRazas();
		getEstadosReproductivos();
		getGrupos();
		getCausasGenerales();
		getCausasEspecificas();
	}, [
		getRazas,
		getEstadosReproductivos,
		getCausasGenerales,
		getGrupos,
	]);

	const handleDeleteRaza = (id: string) => {
		deleteRaza(id);
	};

	const handleDeleteEstadoReproductivo = (id: string) => {
		deleteEstadoReproductivo(+id);
	};

	const handleDeleteGrupo = (id: string) => {
		deleteGrupo(id);
	};

	const handleDeleteCausaGeneral = (id: string) => {
		deleteCausaGeneral(id);
	};

	const handleDeleteCausaEspecifica = (id: string) => {
		deleteCausaEspecifica(id);
	};

	return (
		<div className='grid grid-cols-2 gap-8 bg-white p-8 rounded-lg'>
			<CardItem
				title='razas'
				items={razas}
				setNameModal={setNameModal}
				setItemSelected={setRazaSelected}
				setIsModalOpenItem={setIsModalRazaOpen}
				handleDelete={handleDeleteRaza}
			/>
			<CardItem
				title='estados reproductivos'
				items={estadosReproductivos}
				setNameModal={setNameModal}
				setItemSelected={setEstadoReproductivoSelected}
				setIsModalOpenItem={setIsModalEstadoReproductivoOpen}
				handleDelete={handleDeleteEstadoReproductivo}
			/>
			<CardItem
				title='grupos'
				items={grupos}
				setNameModal={setNameModal}
				setItemSelected={setGrupoSelected}
				setIsModalOpenItem={setIsModalGrupoOpen}
				handleDelete={handleDeleteGrupo}
			/>

			<CardItem
				title='causas generales'
				items={causasGenerales}
				setNameModal={setNameModal}
				setItemSelected={setCausaGeneralSelected}
				setIsModalOpenItem={setIsModalCausaGeneralOpen}
				handleDelete={handleDeleteCausaGeneral}
			/>

			<CardItem
				title='causas especificas'
				items={causasEspecificas}
				setNameModal={setNameModal}
				setItemSelected={setCausaEspecificaSelected}
				setIsModalOpenItem={setIsModalCausaEspecificaOpen}
				handleDelete={handleDeleteCausaEspecifica}
			/>

			{isModalRazaOpen && (
				<ModalForm
					title={
						nameModal === 'editar' ? 'Editar Raza' : 'Añadir Raza'
					}
					setIsOpenModalLocal={setIsModalRazaOpen}
					height=''
				>
					{nameModal === 'editar' ? (
						<EditRaza
							raza={razaSelected!}
							setIsModalRazaOpen={setIsModalRazaOpen}
						/>
					) : (
						<AddRaza setIsModalRazaOpen={setIsModalRazaOpen} />
					)}
				</ModalForm>
			)}
			{isModalEstadoReproductivoOpen && (
				<ModalForm
					title={
						nameModal === 'editar'
							? 'Editar Estado Reproductivo'
							: 'Añadir estado reproductivo'
					}
					setIsOpenModalLocal={setIsModalEstadoReproductivoOpen}
					height=''
				>
					{nameModal === 'editar' ? (
						<EditEstadoReproductivo
							setIsModalEstadoReproductivoOpen={
								setIsModalEstadoReproductivoOpen
							}
							estadoReproductivo={estadoReproductivoSelected!}
						/>
					) : (
						<AddEstadoReproductivo
							setIsModalEstadoReproductivoOpen={
								setIsModalEstadoReproductivoOpen
							}
						/>
					)}
				</ModalForm>
			)}
			{isModalGrupoOpen && (
				<ModalForm
					title={
						nameModal === 'editar' ? 'Editar Grupo' : 'Añadir Grupo'
					}
					setIsOpenModalLocal={setIsModalGrupoOpen}
					height=''
				>
					{nameModal === 'editar' ? (
						<EditGrupo
							grupo={grupoSelected!}
							setIsModalGrupoOpen={setIsModalGrupoOpen}
						/>
					) : (
						<AddGrupo setIsModalGrupoOpen={setIsModalGrupoOpen} />
					)}
				</ModalForm>
			)}
			{isModalCausaGeneralOpen && (
				<ModalForm
					title={
						nameModal === 'editar'
							? 'Editar Causa General'
							: 'Añadir Causa General'
					}
					setIsOpenModalLocal={setIsModalCausaGeneralOpen}
					height=''
				>
					{nameModal === 'editar' ? (
						<EditCausaGeneral
							setIsModalCausaGeneralOpen={setIsModalCausaGeneralOpen}
							causaGeneral={causaGeneralSelected!}
						/>
					) : (
						<AddCausaGeneral
							setIsModalCausaGeneralOpen={setIsModalCausaGeneralOpen}
						/>
					)}
				</ModalForm>
			)}
			{isModalCausaEspecificaOpen && (
				<ModalForm
					title={
						nameModal === 'editar'
							? 'Editar Causa Especifica'
							: 'Añadir Causa Especifica'
					}
					setIsOpenModalLocal={setIsModalCausaEspecificaOpen}
					height=''
				>
					{nameModal === 'editar' ? (
						<EditCausaEspecifica
							setIsModalCausaEspecificaOpen={
								setIsModalCausaEspecificaOpen
							}
							causaEspecifica={causaEspecificaSelected!}
						/>
					) : (
						<AddCausaEspecifica
							setIsModalCausaEspecificaOpen={
								setIsModalCausaEspecificaOpen
							}
						/>
					)}
				</ModalForm>
			)}
		</div>
	);
};
