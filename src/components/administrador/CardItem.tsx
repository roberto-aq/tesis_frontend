import { FaPlus } from 'react-icons/fa';

interface CardItemProps {
	items: any[];
	setNameModal: React.Dispatch<React.SetStateAction<string>>;
	setIsModalOpenItem: React.Dispatch<React.SetStateAction<boolean>>;
	setItemSelected: React.Dispatch<React.SetStateAction<any | null>>;
	title: string;
	handleDelete: (id: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({
	title,
	items,
	setNameModal,
	setIsModalOpenItem,
	setItemSelected,
	handleDelete,
}) => {
	return (
		<div className='bg-purple60 px-8 rounded-md flex flex-col gap-4 h-[300px] overflow-auto relative shadow-lg py-7'>
			<h1 className='text-purple80 font-bold text-xl capitalize'>
				{title}
			</h1>
			<div className='flex flex-col gap-3 h-full '>
				{items.length > 0 ? (
					<>
						{items.map(item => (
							<div
								key={item.id}
								className='flex gap-5 items-center  p-3 rounded-md'
							>
								<div className=' w-3 h-3 bg-purple80 rounded-full'></div>
								<p className='text-purple80'>
									{item.nombre || item.descripcion || '-'}
								</p>
								<div className='flex gap-3 flex-1  justify-end'>
									<button
										className='text-purple80 font-bold'
										onClick={() => {
											setNameModal('editar');
											setIsModalOpenItem(true);
											setItemSelected(item);
										}}
									>
										Editar
									</button>
									<button
										className='text-purple80 font-bold'
										onClick={() => handleDelete(item.id)}
									>
										Eliminar
									</button>
								</div>
							</div>
						))}
					</>
				) : (
					<div className='flex  justify-center h-full items-center'>
						<p className='text-xl font-bold text-primaryGray'>
							No hay resultados de {title}
						</p>
					</div>
				)}
			</div>
			<button
				className='bg-secondaryGreen text-white absolute right-0 mr-8 px-5 py-1 rounded-md font-bold text-sm flex gap-2 items-center w-[30%]  justify-center'
				onClick={() => {
					setIsModalOpenItem(true);
					setNameModal('añadir');
				}}
			>
				<FaPlus className='text-xs' />
				Añadir
			</button>
		</div>
	);
};
