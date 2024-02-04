import { ChangeEvent, useState } from 'react';
import {
	FieldError,
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

interface InputFormAuthProps {
	label: string;
	name: string;
	errors: FieldErrors<FieldValues>;
	errorField?: FieldError | undefined;
	type?:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'date'
		| 'checkbox';
	required?: boolean;
	placeholder?: string;
	register: UseFormRegister<FieldValues> | any;
	isTextarea?: boolean;
	isDisabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputFormAuth: React.FC<InputFormAuthProps> = ({
	label,
	name,
	errors,
	placeholder,
	register,
	errorField,
	type,
	required,
	isTextarea,
	isDisabled,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className='flex flex-col gap-2 px-5 '>
			<div className='flex justify-between items-center'>
				<label className='text-purple80 font-bold capitalize'>
					{label}:
				</label>
				<span
					className={`${
						required || type === 'checkbox'
							? 'text-red-500 text-xl mr-3'
							: 'text-purple80 text-xs'
					} font-bold self-end`}
				>
					{required || type === 'checkbox' ? '*' : 'Opcional'}
				</span>
			</div>
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
				<input
					type={isPasswordVisible ? 'text' : type}
					step={type === 'number' ? 'any' : ''}
					min={type === 'number' ? '0' : ''}
					name={name}
					className={`w-full bg-transparent outline-none  flex-1 font-bold py-2 ${
						isDisabled ? 'text-purple100' : 'text-primaryGray'
					} focus:outline-none ${
						type === 'checkbox'
							? 'h-5 w-5 accent-purple80 cursor-pointer'
							: ''
					}`}
					// required={required}
					{...register(name, {
						required: required && {
							value: true,
							message: `El campo ${label} es requerido`,
						},
					})}
					placeholder={placeholder}
				/>
				{type === 'password' ? (
					<>
						{isPasswordVisible ? (
							<FaEyeSlash
								className='text-purple80 text-[24px] cursor-pointer'
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							/>
						) : (
							<FaEye
								className='text-purple80 text-[24px] cursor-pointer'
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							/>
						)}
					</>
				) : (
					''
				)}
			</div>

			{/* {error && <span>{error}</span>} */}
		</div>
	);
};
