interface CardContentInfoProps {
	title: string;
	content: string;
}

export const CardContentInfo: React.FC<CardContentInfoProps> = ({
	title,
	content,
}) => {
	return (
		<div className=' bg-purple60  p-5 rounded-lg flex flex-col gap-[8px]'>
			<div className='flex justify-between items-center relative'>
				<p className='text-secondGray font-bold capitalize'>
					{title}
				</p>
			</div>
			<p className='font-bold text-sm whitespace-normal overflow-hidden break-words'>
				{content}
			</p>
		</div>
	);
};
