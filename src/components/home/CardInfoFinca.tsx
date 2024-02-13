interface CardInfoFincaProps {
	label: string;
	content: string;
}

export const CardInfoFinca: React.FC<CardInfoFincaProps> = ({
	label,
	content,
}) => {
	return (
		<div className='bg-white rounded-lg p-8 flex flex-col gap-3 items-center justify-center shadow-lg h-[120px]'>
			<p className='font-bold text-purple80 text-xl'>{label}</p>
			<p className='font-bold text-purple100 text-lg capitalize'>
				{content}
			</p>
		</div>
	);
};
