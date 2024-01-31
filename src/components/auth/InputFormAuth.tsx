import { ChangeEvent, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

interface InputFormAuthProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	type?: 'text' | 'email' | 'password';
	required?: boolean;
}
export const InputFormAuth: React.FC<InputFormAuthProps> = ({
	label,
	name,
	value,
	onChange,
	error,
	type,
	required,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className='flex flex-col gap-4 px-12'>
			<label className='text-purple80 font-bold'>{label}:</label>
			<div
				className='flex h-[65px] px-5 border-2 border-purple80 rounded-[10px]
            gap-5 items-center'
			>
				<input
					type={isPasswordVisible ? 'text' : type}
					name={name}
					value={value}
					onChange={onChange}
					className={`self-stretch bg-transparent outline-none text-purple80 flex-1 font-bold ${
						error ? 'border-red-500' : ''
					}`}
					required={required}
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

			{error && <span>{error}</span>}
		</div>
	);
};
