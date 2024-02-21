import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { useDescarteStore } from '../../store';
import { SelectForm } from '../shared/SelectForm';

interface AddCausaEspecificaProps {
	setIsModalCausaEspecificaOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

export const AddCausaEspecifica: React.FC<
	AddCausaEspecificaProps
> = ({ setIsModalCausaEspecificaOpen }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const createCausaEspecifica = useDescarteStore(
		state => state.createCausaEspecifica
	);
	const causasGenerales = useDescarteStore(
		state => state.causasGenerales
	);

	const onAddSubmit = handleSubmit(async data => {
		const causaEspecifica: any = {
			...data,
		};

		createCausaEspecifica(causaEspecifica);
		setIsModalCausaEspecificaOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
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
