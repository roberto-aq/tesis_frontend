import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

interface CardInfoProps {
	title: string;
	content: string | number;
	tooltipText?: string;
}

export const CardInfo: React.FC<CardInfoProps> = ({
	title,
	content,
	tooltipText,
}) => {
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	return (
		<div className=' bg-purple60  p-5 rounded-lg flex flex-col gap-[8px]'>
			<div className='flex justify-between items-center relative'>
				<p className='text-secondGray font-bold capitalize '>
					{title}
				</p>
				<button
					onClick={() => setIsTooltipVisible(!isTooltipVisible)}
				>
					<FiInfo color='#A9A6AA' size={20} />
				</button>
				{isTooltipVisible && tooltipText ? (
					<p className='absolute top-full right-0 w-3/4 mt-1 bg-purple80 text-white text-[11px] p-2 rounded-lg shadow-lg z-10'>
						{tooltipText}
					</p>
				) : (
					''
				)}
			</div>
			<p className='font-bold text-sm whitespace-normal overflow-hidden break-words capitalize'>
				{content}
			</p>
		</div>
	);
};
