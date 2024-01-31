import { useEffect, useRef, useState } from 'react';
import {
	FieldError,
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa6';

export interface SelectedItem {
	id: string | number;
	nombre?: string;
	descripcion?: string;
}

interface SelectFormProps {
	items: SelectedItem[];
	placeholder?: string;
	label: string;
	setValue: UseFormSetValue<FieldValues> | any;
	register: UseFormRegister<FieldValues> | any;
	name: string;
	errors: FieldErrors<FieldValues>;
	required: boolean;
	initialValue?: string | number | null;
	errorField?: FieldError | undefined;
}

export const SelectForm: React.FC<SelectFormProps> = ({
	items,
	placeholder = 'Selecciona una opción...',
	label,
	setValue,
	register,
	name,
	errors,
	required,
	initialValue,
	errorField,
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<
		SelectedItem | null | undefined
	>(null);

	const onOptionClicked = (item: SelectedItem) => () => {
		setSelectedItem(item);
		setValue(name, item.id.toString());
		setIsOpen(false);
	};
	const toggling = () => {
		setIsOpen(!isOpen);

		// Solo intenta enfocar cuando se abre el menú
		if (!isOpen) {
			// Retraso para dar tiempo a que el menú se despliegue antes de desplazarse a él
			setTimeout(() => {
				dropdownRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			}, 100);
		}
	};

	useEffect(() => {
		const initialItem =
			initialValue !== null
				? items.find(item => item.id === initialValue)
				: null;

		setSelectedItem(initialItem);
	}, [initialValue, items]);

	return (
		<div className='flex flex-col gap-2 flex-1'>
			<label className='font-bold capitalize text-sm'>{label}:</label>
			<div className='w-full no-select'>
				<div className='relative'>
					<div
						className={`w-full px-6 py-3 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 cursor-pointer flex items-center justify-between border border-[#bbb] ${
							errors[name] || errorField ? 'border-red-500 ' : ''
						}}`}
						onClick={toggling}
					>
						<p className='font-bold text-primaryGray capitalize'>
							{selectedItem
								? selectedItem.nombre || selectedItem.descripcion
								: placeholder}
						</p>
						<div className='pointer-events-none flex items-center justify-center'>
							<FaChevronDown color='#808080' size={15} />
						</div>
					</div>
					{isOpen && (
						<div
							ref={dropdownRef}
							className='absolute w-full bg-gray-100 rounded-[8px] z-10 mt-1 '
						>
							<div className='flex flex-col max-h-[150px] overflow-y-scroll '>
								{items.map(item => (
									<div
										className='px-6 py-4 hover:bg-gray-200 cursor-pointer flex gap-3 items-center border-b border-[#bbb] '
										onClick={onOptionClicked(item)}
										key={item.id}
									>
										<div className='flex w-2 h-2 bg-[#808080] rounded-full'></div>
										<span className='font-bold capitalize text-[#808080] text-sm'>
											{item.nombre || item.descripcion}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<input
					type='hidden'
					{...register(name, {
						required: {
							value: required,
							message: `Debe seleccionar al menos una opción`,
						},
					})}
					value={selectedItem ? selectedItem.id.toString() : ''}
				/>
			</div>
		</div>
	);
};
