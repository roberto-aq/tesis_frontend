interface InputDisabledProps {
	label: string;
	value: string;
	type: string;
}

export const InputDisabled: React.FC<InputDisabledProps> = ({
	label,
	value,
	type,
}) => {
	return (
		<div className='flex flex-col gap-2 '>
			<label className='font-bold capitalize text-sm'>{label}:</label>
			<div
				className={`flex h-[50px] px-5 border  rounded-[5px] gap-5 items-center bg-purple60 border-purple80`}
			>
				<input
					type={type}
					disabled
					className={`w-full bg-transparent outline-none  flex-1 font-bold py-2 text-purple100`}
					value={value}
				/>
			</div>
		</div>
	);
};
