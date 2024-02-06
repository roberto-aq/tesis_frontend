import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useGeneralStore } from '../store';
import {
	AddFinca,
	ButtonModal,
	ModalForm,
	TabFincasList,
	TabSolicitudes,
} from '../components';

export const FincasPage = () => {
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const tabs = [
		{ label: 'Fincas', content: <TabFincasList /> },
		{
			label: 'Solicitudes en espera',
			content: <TabSolicitudes />,
		},
	];

	return (
		<div className=' h-full flex flex-col gap-7'>
			<div className='flex items-center justify-between'>
				<h3 className='text-3xl font-bold'>Lista de Fincas</h3>
				<ButtonModal
					textLabel={'Añadir Finca'}
					Icon={FaPlus}
					color='secondaryGreen'
					onClick={onChangeModal}
				/>
			</div>
			<section className='bg-white h-full overflow-auto rounded-lg'>
				{/* MENÚ PESTAÑAS */}
				<div className='flex h-[50px]  px-6 shadow-md gap-6'>
					{tabs.map((tab, index) => (
						<button
							className={`border-b-2   px-8  font-bold capitalize ${
								activeTabIndex === index
									? 'text-purple80 border-purple80'
									: 'text-primaryGray border-transparent'
							}`}
							key={index}
							onClick={() => setActiveTabIndex(index)}
						>
							{tab.label}
						</button>
					))}
				</div>
				{tabs[activeTabIndex].content}
			</section>

			{isOpenModal && (
				<ModalForm title='Añadir Finca'>
					<AddFinca />
				</ModalForm>
			)}
		</div>
	);
};
