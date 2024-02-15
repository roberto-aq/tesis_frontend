import { useForm } from 'react-hook-form';
import {
	ButtonAction,
	ImageField,
	InputForm,
	SelectForm,
} from '..';
import { useAnimalesStore } from '../../store/animales';
import { useAuthStore, useGeneralStore } from '../../store';

export const AddAnimal = () => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm();

	const razas = useAnimalesStore(state => state.razas);
	const estadosReproductivo = useAnimalesStore(
		state => state.estadosReproductivos
	);
	const grupos = useAnimalesStore(state => state.grupos);
	const animales = useAnimalesStore(state => state.animales);
	const createAnimal = useAnimalesStore(state => state.createAnimal);

	const fincaId = useAuthStore(state => state.fincaId);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	// Calcula la fecha actual en formato YYYY-MM-DD para validar la fecha de nacimiento
	const today = new Date().toISOString().split('T')[0];

	const onSubmit = handleSubmit(data => {
		const animal: any = {
			...data,
			idEstadoReproductivo: +data.idEstadoReproductivo,
			pesoNacimiento: +data.pesoNacimiento,
			fincaId: fincaId,
			madreId: data.madreId || null,
		};

		createAnimal(animal);
		setIsOpenModal(false);
	});

	return (
		<>
			<form
				className='flex flex-col gap-5  h-full'
				onSubmit={onSubmit}
			>
				<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[700px] px-5'>
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
						/>
						<SelectForm
							items={grupos}
							label='Grupo'
							setValue={setValue}
							register={register}
							name='idGrupo'
							errors={errors}
							required={true}
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
						/>
					</div>
					{/* ROW  3*/}
					<div className='flex col-span-2 justify-center'>
						<h3 className='text-[25px] font-bold'>Genealogía</h3>
					</div>
					{/* ROW 4 */}
					<div className='flex flex-col gap-5'>
						<SelectForm
							items={animales}
							label='Madre'
							setValue={setValue}
							register={register}
							name='madreId'
							errors={errors}
							required={false}
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
		</>
	);
};
