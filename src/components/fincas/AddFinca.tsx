import React from 'react';
import { InputForm } from '../shared/InputForm';
import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { useGeneralStore } from '../../store';
import { useFincasStore } from '../../store/fincas/fincas.store';

export const AddFinca = () => {
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm();

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const createFinca = useFincasStore(state => state.createFinca);

	const onAddSubmit = handleSubmit(data => {
		const newFinca: any = {
			nombre: data.nombre,
			municipio: data.municipio,
			propietario: data.propietario,
			administrador: data.administrador,
			veterinario: data.veterinario,
			forrajes: data.forrajes,
			areaTotal: +data.areaTotal,
			areaAprovechable: +data.areaAprovechable,
			numeroPotreros: +data.numeroPotreros,
			rotacion: +data.rotacion,
			riego: data.riego,
			fertilizacion: data.fertilizacion,
			notas: data.notas
		};

		createFinca(newFinca);
		setIsOpenModal(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
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
