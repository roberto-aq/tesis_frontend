import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { SelectForm } from '../shared/SelectForm';
import { ImageField } from '../shared/ImageField';
import { useAnimalesStore } from '../../store/animales';
import { useEffect } from 'react';
import { Animal } from '../../interfaces';
import { useAuthStore, useGeneralStore } from '../../store';

interface EditAnimalProps {
	animalById: Animal;
}

export const EditAnimal: React.FC<EditAnimalProps> = ({
	animalById,
}) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
	} = useForm();

	const animales = useAnimalesStore(state => state.animales);
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const getAnimalById = useAnimalesStore(
		state => state.getAnimalById
	);
	const fincaId = useAuthStore(state => state.fincaId);
	const updateAnimal = useAnimalesStore(state => state.updateAnimal);

	const grupos = useAnimalesStore(state => state.grupos);
	const razas = useAnimalesStore(state => state.razas);
	const estadosReproductivo = useAnimalesStore(
		state => state.estadosReproductivos
	);

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const today = new Date().toISOString().split('T')[0];

	useEffect(() => {
		if (animalById) {
			reset({
				nombre: animalById.nombre,
				numeroIdentificador: animalById.numeroIdentificador,
				fechaNacimiento: animalById.fechaNacimiento,
				idRaza: animalById.raza.id,
				idGrupo: animalById.grupo.id,
				sexo: animalById.sexo,
				pesoNacimiento: animalById.pesoNacimiento,
				idEstadoReproductivo: animalById.estadoReproductivo.id,
				madreId: animalById.madre?.id || null,
				registroPadre: animalById.registroPadre,
				nombrePadre: animalById.nombrePadre,
			});
		}
	}, [animalById, reset]);

	useEffect(() => {
		getAnimales(fincaId);
	}, []);

	const onEditAnimal = handleSubmit(async data => {
		const animal: any = {
			...data,
			pesoNacimiento: +data.pesoNacimiento,
			idEstadoReproductivo: +data.idEstadoReproductivo,
		};

		await updateAnimal(animal, animalById.id);
		setIsOpenModal(false);
		await getAnimalById(animalById.id);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditAnimal}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-y-scroll h-[600px] px-5'>
				{/* ROW 1 */}
				<ImageField />
				<div className='flex flex-col gap-5  justify-center'>
					<InputForm
						label='nombre'
						placeholder='Ejm: Lulu'
						name='nombre'
						type='text'
						register={register}
						errors={errors}
						required={true}
					/>
					<InputForm
						label='Numero Identificador'
						placeholder='Ejem: 4453'
						type='text'
						name='numeroIdentificador'
						register={register}
						errors={errors}
						required={true}
					/>
				</div>
				{/* ROW 2 */}
				<div className='flex flex-col gap-5 '>
					<InputForm
						type='date'
						label='Fecha de nacimiento'
						name='fechaNacimiento'
						register={register}
						errors={errors}
						required={true}
						maxDate={today}
					/>
					<SelectForm
						label='Sexo'
						items={[
							{ id: 'Hembra', nombre: 'Hembra' },
							{ id: 'Macho', nombre: 'Macho' },
						]}
						setValue={setValue}
						register={register}
						name='sexo'
						errors={errors}
						required={true}
						initialValue={animalById.sexo}
					/>
					<SelectForm
						items={grupos}
						label='Grupo'
						setValue={setValue}
						register={register}
						name='idGrupo'
						errors={errors}
						required={true}
						initialValue={animalById.grupo.id}
					/>
				</div>
				<div className='flex flex-col gap-5 '>
					<SelectForm
						items={razas}
						label='Raza'
						setValue={setValue}
						register={register}
						name='idRaza'
						errors={errors}
						required={true}
						initialValue={animalById.raza.id}
					/>
					<InputForm
						type='number'
						label='Peso de Nacimiento'
						placeholder='Ejm: 19kg'
						name='pesoNacimiento'
						register={register}
						errors={errors}
						required={true}
					/>
					<SelectForm
						items={estadosReproductivo}
						label='Estado Reproductivo'
						setValue={setValue}
						register={register}
						name='idEstadoReproductivo'
						errors={errors}
						required={true}
						initialValue={animalById.estadoReproductivo.id}
					/>
				</div>
				{/* ROW  3*/}
				<div className='flex col-span-2 justify-center'>
					<h3 className='text-[25px] font-bold'>Genealogía</h3>
				</div>
				{/* ROW 4 */}
				<div className='flex flex-col gap-5'>
					<SelectForm
						items={animales.filter(
							animal => animal.id !== animalById.id
						)}
						label='Madre'
						setValue={setValue}
						register={register}
						name='madreId'
						errors={errors}
						required={false}
						initialValue={animalById.madre?.id}
					/>
					<InputForm
						errors={errors}
						register={register}
						required={false}
						label='Registro Padre'
						name='registroPadre'
						placeholder='Ejem: 34390-JSIWI-3023'
						type='text'
					/>
				</div>
				{/* ROW 5 */}
				<div className='flex flex-col'>
					<InputForm
						errors={errors}
						register={register}
						required={false}
						label='Nombre Padre'
						name='nombrePadre'
						placeholder='Ejem: Lucio'
						type='text'
					/>
				</div>
			</div>

			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
