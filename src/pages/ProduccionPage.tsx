import { useState } from 'react';
import { CardInfo, ProduccionTable, SelectList } from '../components';
import { Animal } from '../interfaces';
import { DatePicker } from 'keep-react';
import { MdSearch } from 'react-icons/md';
import { useAnimalesStore } from '../store/animales';
import { FaPlus } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';

export const ProduccionPage = () => {
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(
		null
	);

	const [date, setDate] = useState<Date | null>(null);
	const [searchInput, setSearchInput] = useState('');
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const handleAnimalSelect = (animal: Animal) => {
		setSelectedAnimal(animal);
	};

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newSearchTerm = e.target.value.trim();
		setSearchInput(newSearchTerm);
	};

	const animales = useAnimalesStore(state => state.animales);

	console.log(date);

	const activateAddRecord = () => {
		console.log('click');
	};

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<SelectList handleAnimalSelect={handleAnimalSelect} />
			<div className='bg-white rounded-lg flex flex-col gap-5 relative p-8 '>
				<div className='flex justify-end'>
					<button
						className={`bg-secondaryGreen text-white px-5 rounded-lg py-2 font-bold flex items-center justify-center gap-3`}
						onClick={activateAddRecord}
					>
						<FaPlus size={15} />
						Añadir registros
					</button>
				</div>
				<div className='flex items-center gap-4'>
					<div className='flex-1'>
						<DatePicker
							singleDate={setDate}
							placeholder='Día / Mes / Año'
						>
							<DatePicker.SingleDate />
						</DatePicker>
					</div>

					<div className='flex border h-[80%] border-[#BBB] items-center px-4 gap-4 rounded-[5px] flex-[1.5]'>
						<MdSearch size={25} color='#BBB' />
						<input
							type='search'
							placeholder='buscar por nombre o por identificación'
							className='capitalize outline-none  self-stretch w-full'
							value={searchInput}
							onChange={handleSearchInput}
						/>
					</div>
					<div className=' bg-purple60   rounded-lg flex flex-col flex-1 gap-[8px] py-2 px-5'>
						<div className='flex justify-between items-center relative'>
							<p className='text-secondGray font-bold capitalize '>
								Promedio Ltrs día
							</p>
							<button
								onClick={() => setIsTooltipVisible(!isTooltipVisible)}
							>
								<FiInfo color='#A9A6AA' size={20} />
							</button>
							{isTooltipVisible && (
								<p className='absolute top-full right-0 w-3/4 mt-1 bg-purple80 text-white text-[11px] p-2 rounded-lg shadow-lg z-10'>
									Muestra el promedio de ltrs de los animales en un
									día seleccionado
								</p>
							)}
						</div>
						<p className='font-bold text-sm whitespace-normal overflow-hidden break-words capitalize'>
							300
						</p>
					</div>
					<div className=' bg-purple60   rounded-lg flex flex-col flex-1 py-2 px-5 gap-[8px]'>
						<div className='flex justify-between items-center relative'>
							<p className='text-secondGray font-bold capitalize '>
								Promedio Ltrs día
							</p>
							<button
								onClick={() => setIsTooltipVisible(!isTooltipVisible)}
							>
								<FiInfo color='#A9A6AA' size={20} />
							</button>
							{isTooltipVisible && (
								<p className='absolute top-full right-0 w-3/4 mt-1 bg-purple80 text-white text-[11px] p-2 rounded-lg shadow-lg z-10'>
									Muestra el promedio de ltrs de los animales en un
									día seleccionado
								</p>
							)}
						</div>
						<p className='font-bold text-sm whitespace-normal overflow-hidden break-words capitalize'>
							300
						</p>
					</div>
				</div>
				<ProduccionTable />
			</div>
		</div>
	);
};
