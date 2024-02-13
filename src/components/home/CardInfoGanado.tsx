interface CardInfoGanadoProps {
	label: string;
	children: React.ReactNode;
}

export const CardInfoGanado: React.FC<CardInfoGanadoProps> = ({
	children,
	label,
}) => {
	return (
		<div className='flex flex-col gap-3  flex-1 h-[180px] overflow-auto border border-purple80 rounded-lg px-5 py-2 shadow-sm '>
			<p className='font-bold text-purple80 text-xl text-center'>
				{label}
			</p>
			{children}
		</div>
	);
};
