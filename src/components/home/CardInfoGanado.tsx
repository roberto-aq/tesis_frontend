interface CardInfoGanadoProps {
	label: string;
	children: React.ReactNode;
}

export const CardInfoGanado: React.FC<CardInfoGanadoProps> = ({
	children,
	label,
}) => {
	return (
		<div className='flex flex-col gap-3  flex-1 h-[180px] overflow-auto border rounded-lg p-5 shadow-md bg-white'>
			<p className='font-bold text-purple80 text-xl text-center'>
				{label}
			</p>
			{children}
		</div>
	);
};
