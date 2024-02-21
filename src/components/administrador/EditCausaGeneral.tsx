import { useForm } from 'react-hook-form';
import { Causa } from '../../interfaces';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { useEffect } from 'react';
import { useDescarteStore } from '../../store';

interface EditCausaGeneralProps {
	setIsModalCausaGeneralOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	causaGeneral: Causa;
}

export const EditCausaGeneral: React.FC<EditCausaGeneralProps> = ({
	setIsModalCausaGeneralOpen,
	causaGeneral,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		if (causaGeneral) {
			reset({
				descripcion: causaGeneral.descripcion,
			});
		}
	}, []);

	const updateCausaGeneral = useDescarteStore(
		state => state.updateCausaGeneral
	);

	const onEditSubmit = handleSubmit(async data => {
		const updatedCausaGeneral: any = {
			...data,
		};

		updateCausaGeneral(updatedCausaGeneral, causaGeneral.id);
		setIsModalCausaGeneralOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='Nombre de la causa general'
					placeholder='Ejm: muerte'
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
