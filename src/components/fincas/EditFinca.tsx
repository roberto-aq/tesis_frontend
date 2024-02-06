import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFincasStore } from '../../store/fincas/fincas.store';
import { useLoaderData } from 'react-router-dom';
import { FincasResponse } from '../../interfaces';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { useGeneralStore } from '../../store';

interface EditFincaProps {
	finca: FincasResponse;
}

export const EditFinca: React.FC<EditFincaProps> = ({ finca }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	// const fincaById = useLoaderData() as FincasResponse;
	const updateFinca = useFincasStore(state => state.updateFinca);

	useEffect(() => {
		if (finca) {
			reset({
				nombre: finca.nombre,
				municipio: finca.municipio,
				propietario: finca.propietario,
				administrador: finca.administrador,
				veterinario: finca.veterinario,
				forrajes: finca.forrajes,
				areaTotal: finca.areaTotal,
				areaAprovechable: finca.areaAprovechable,
				numeroPotreros: finca.numeroPotreros,
				rotacion: finca.rotacion,
				riego: finca.riego,
				fertilizacion: finca.fertilizacion,
				notas: finca.notas,
			});
		}
	}, []);

	const onEditSubmit = handleSubmit(data => {
		console.log(data);
		const updatedFinca: any = {
			...data,
			areaTotal: +data.areaTotal,
			areaAprovechable: +data.areaAprovechable,
			numeroPotreros: +data.numeroPotreros,
			rotacion: +data.rotacion,
		};

		console.log(updatedFinca);

		updateFinca(finca.id, updatedFinca);
		setIsOpenModal(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[700px] px-5'>
				<InputForm
					label='nombre de la Finca'
					name='nombre'
					type='text'
					register={register}
					required={true}
					errors={errors}
					placeholder='Ejm: Finca la esperanza'
				/>

				<InputForm
					label='municipio'
					name='municipio'
					type='text'
					register={register}
					required={true}
					errors={errors}
					placeholder='Ejm: San Juan de Urabá'
				/>
				<InputForm
					label='propietario'
					name='propietario'
					type='text'
					register={register}
					required={true}
					errors={errors}
					placeholder='Ejm: Juan Pérez'
				/>

				<InputForm
					label='administrador'
					name='administrador'
					type='text'
					register={register}
					errors={errors}
					placeholder='Ejm: Ricardo Pérez'
				/>
				<InputForm
					label='veterinario'
					name='veterinario'
					type='text'
					register={register}
					errors={errors}
					placeholder='Ejm: Susana Martínez'
				/>
				<InputForm
					label='Forrajes'
					name='forrajes'
					type='text'
					register={register}
					errors={errors}
					placeholder='Ejm: Kikuyo, Brachiaria, etc'
					required={true}
				/>
				<InputForm
					label='Hectáreas Totales'
					name='areaTotal'
					type='number'
					errors={errors}
					required={true}
					register={register}
					placeholder='Ejm: 20'
				/>
				<InputForm
					label='Hectáreas Útiles'
					name='areaAprovechable'
					type='number'
					errors={errors}
					required={true}
					register={register}
					placeholder='Ejm: 10'
				/>

				<InputForm
					label='número de potreros'
					name='numeroPotreros'
					type='number'
					register={register}
					errors={errors}
					placeholder='Ejm: 5 potreros'
				/>

				<InputForm
					label='rotación de potreros'
					name='rotacion'
					type='number'
					register={register}
					errors={errors}
					placeholder='Ejm: 3 meses'
				/>

				<InputForm
					label='Riego'
					name='riego'
					errors={errors}
					type='checkbox'
					register={register}
				/>
				<InputForm
					label='fertilización'
					name='fertilizacion'
					errors={errors}
					type='checkbox'
					register={register}
				/>

				<div className='col-span-2'>
					<InputForm
						label='Observaciones'
						name='notas'
						isTextarea={true}
						register={register}
						errors={errors}
						placeholder='Ejm: Observaciones generales, etc'
					/>
				</div>
			</div>

			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
