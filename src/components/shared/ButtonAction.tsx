interface ButtonActionProps {
	textLabel: string;
}

export const ButtonAction: React.FC<ButtonActionProps> = ({
	textLabel,
}) => {
	return (
		<button className='bg-purple80 text-white self-center rounded-lg h-[45px] items-center justify-center flex px-16 font-bold'>
			{textLabel}
		</button>
	);
};
