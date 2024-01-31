import { InputFormProps } from '../../interfaces';

export const InputForm: React.FC<InputFormProps> = ({
	label,
	name,
	errors,
	type,
	required = false,
	placeholder,
	register,
	isTextarea = false,
	isDisabled = false,
	errorField,
	onChange,
}) => {
	return (
		<div className='flex flex-col gap-2 '>
			<label className='font-bold capitalize text-sm'>{label}:</label>
			<div
				className={`flex ${
					isTextarea ? 'h-[100px]' : 'h-[50px]'
				} px-5 border  rounded-[5px] gap-5 items-center ${
					errors[name] || errorField ? 'border-red-500' : ''
				} ${
					isDisabled
						? 'bg-purple60 border-purple80'
						: 'bg-white border-[#bbb]'
				}`}
			>
				{isTextarea ? (
					<textarea
						{...register(name, {
							required: required && {
								value: true,
								message: `El campo ${label} es requerido`,
							},
						})}
						placeholder={placeholder}
						className='w-full h-full bg-transparent outline-none text-primaryGray flex-1 font-bold resize-none py-3'
					/>
				) : (
					<input
						type={type}
						step={type === 'number' ? 'any' : ''}
						min={type === 'number' ? '0' : ''}
						placeholder={placeholder}
						disabled={isDisabled}
						className={`w-full bg-transparent outline-none  flex-1 font-bold py-2 ${
							isDisabled ? 'text-purple100' : 'text-primaryGray'
						}`}
						{...register(name, {
							required: required && {
								value: true,
								message: `El campo ${label} es requerido`,
							},
						})}
						onChange={onChange}
					/>
				)}
			</div>
		</div>
	);
};
