import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { SelectForm } from '../shared/SelectForm';
import { useEffect } from 'react';
import { useDescarteStore } from '../../store';

interface EditCausaEspecificaProps {
	setIsModalCausaEspecificaOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	causaEspecifica: any;
}

export const EditCausaEspecifica: React.FC<
	EditCausaEspecificaProps
> = ({ setIsModalCausaEspecificaOpen, causaEspecifica }) => {
	const {
		register,
		reset,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const causasGenerales = useDescarteStore(
		state => state.causasGenerales
	);
	const updateCausaEspecifica = useDescarteStore(
		state => state.updateCausaEspecifica
	);

	useEffect(() => {
		reset({
			descripcion: causaEspecifica.descripcion,
			causaGeneralId: causaEspecifica.causaGeneral.id,
		});
	}, []);

	const onEditSubmit = handleSubmit(async data => {
		const updatedCausaEspecifica: any = {
			...data,
		};

		updateCausaEspecifica(updatedCausaEspecifica, causaEspecifica.id);
		setIsModalCausaEspecificaOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<SelectForm
					errors={errors}
					register={register}
					required={true}
					label='Causa general'
					name='causaGeneralId'
					setValue={setValue}
					items={causasGenerales}
					initialValue={causaEspecifica.causaGeneral.id}
				/>
				<InputForm
					label='Nombre de la causa específica'
					placeholder='Ejm: accidente'
					name='descripcion'
					type='text'
					register={register}
					errors={errors}
					required={true}
				/>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
