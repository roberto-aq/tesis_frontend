interface LayoutInfoAnimalProps {
	children: React.ReactNode;
	title: string;
}

export const LayoutInfoAnimal: React.FC<LayoutInfoAnimalProps> = ({
	children,
	title,
}) => {
	return (
		<div className='w-full flex flex-col gap-5  flex-1'>
			<div className='flex bg-purple80 text-white h-[50px] items-center rounded-lg px-5'>
				<p className='font-bold'>{title}</p>
			</div>

			<div className='bg-white rounded-lg  overflow-auto  flex-1 relative'>
				{children}
			</div>
		</div>
	);
};
