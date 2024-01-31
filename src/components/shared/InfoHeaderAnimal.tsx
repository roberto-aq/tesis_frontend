import { IconType } from 'react-icons';
import { Animal } from '../../interfaces';
import { DataHeader } from '../animales/DataHeader';
import { ButtonModal } from './ButtonModal';
import { useEffect, useState } from 'react';
import { formatDate } from '../../helpers/formatDate';

interface infoHeaderAnimalProps {
	animal: Animal;
	onChangeModal: () => void;
	textLabel: string;
	Icon?: IconType;
	color: string;
}

export const InfoHeaderAnimal: React.FC<infoHeaderAnimalProps> = ({
	animal,
	onChangeModal,
	textLabel,
	Icon,
	color,
}) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='flex flex-col gap-6 justify-center'>
			<section className='flex flex-col gap-2'>
				<div className='flex   justify-between items-center'>
					<h3 className='text-[40px] font-bold'>
						#{animal.numeroIdentificador}
					</h3>
					<div className='flex  h-[45px]'>
						<ButtonModal
							textLabel={textLabel}
							color={color}
							Icon={Icon}
							onClick={onChangeModal}
						/>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<p className='font-bold text-[24px] text-primaryGray'>
						{animal.nombre}
					</p>
					<p className='font-bold'>
						Fecha actual:{' '}
						<span className='font-normal'>
							{formatDate(currentDate)}
						</span>
					</p>
				</div>
			</section>
			<DataHeader animal={animal} />
		</div>
	);
};
