import { useState } from 'react';
import {
	AlertError,
	ProduccionTable,
	SelectList,
} from '../components';
import { Animal } from '../interfaces';
import { DatePicker } from 'keep-react';
import { MdSearch } from 'react-icons/md';
import { useAnimalesStore } from '../store/animales';
import { FaPlus } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';
import { useProduccionStore } from '../store/produccion/produccion.store';
import { useGeneralStore } from '../store';

export const ProduccionPage = () => {
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(
		null
	);
	const [promedioLitrosDia, setPromedioLitrosDia] = useState<
		number | null
	>(null);
	const [date, setDate] = useState<Date | null>(null);
	const [editable, setEditable] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const handleAnimalSelect = (animal: Animal) => {
		setSelectedAnimal(animal);
	};

	const isLoading = useProduccionStore(state => state.isLoading);

	// const handleSearchInput = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const newSearchTerm = e.target.value.trim();
	// 	setSearchInput(newSearchTerm);
	// };

	const animales = useAnimalesStore(state => state.animales);

	// ! Arreglar la fecha actual para que no se adelante un día

	const activateAddRecord = () => {
		setEditable(true);
		if (!date) {
			setDate(new Date());
		}
	};

	const handleDateChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newDate = e.target.value
			? new Date(e.target.value + 'T00:00')
			: null;
		setDate(newDate);
	};

	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);
	const error = useProduccionStore(state => state.error);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<SelectList
				handleAnimalSelect={handleAnimalSelect}
				isLoading={isLoading}
			/>
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
				<div className='flex items-center gap-4 justify-between'>
					<div className='w-[30%]  h-[80%]'>
						<DatePicker
							singleDate={setDate}
							placeholder='Día-Mes-Año'
							className='text-purple80 font-bold border w-full border-purple80 h-full rounded-[5px] px-4 outline-none cursor-pointer'
						>
							<DatePicker.SingleDate />
						</DatePicker>

						{/* <input
							type='date'
							name=''
							id=''
							className='border w-full border-purple80 h-full rounded-[5px] px-4 outline-none font-bold text-purple80 cursor-pointer'
							value={date ? date.toISOString().split('T')[0] : ''}
							onChange={handleDateChange}
						/> */}
					</div>
					{/* <div className='flex border h-[80%] border-[#BBB] items-center px-4 gap-4 rounded-[5px] flex-[1.5]'>
						<MdSearch size={25} color='#BBB' />
						<input
							type='search'
							placeholder='buscar por nombre o por identificación'
							className='capitalize outline-none  self-stretch w-full'
							value={searchInput}
							onChange={handleSearchInput}
						/>
					</div> */}
					<div className=' bg-purple60   rounded-lg flex flex-col w-[30%] gap-[8px] py-2 px-5'>
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
							{promedioLitrosDia || '-'}
						</p>
					</div>
				</div>
				<ProduccionTable
					fecha={date}
					editable={editable}
					setEditable={setEditable}
					setPromedioLitrosDia={setPromedioLitrosDia}
				/>
			</div>

			{showAlertError && error && <AlertError error={error} />}
		</div>
	);
};
