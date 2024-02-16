import { MdOutlineClose } from 'react-icons/md';
import { useGeneralStore } from '../../store';

interface ModalFormProps {
	children: React.ReactNode;
	title: string;
	setIsOpenModalLocal?: React.Dispatch<React.SetStateAction<boolean>>;
	height?: string;
}

export const ModalForm: React.FC<ModalFormProps> = ({
	children,
	title,
	setIsOpenModalLocal,
	height = '90%',
}) => {
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			<div
				className={`bg-white p-6 py-8 rounded-lg shadow-lg  relative  flex flex-col gap-2 
				w-[85%] md:[75%] lg:w-[60%] xl:w-[50%] h-[${height}] 
			`}
			>
				<button
					onClick={() => {
						setIsOpenModal(false);
						if (setIsOpenModalLocal) {
							setIsOpenModalLocal(false);
						}
					}}
					className='bg-red-500 rounded-full w-10 h-10 flex items-center justify-center absolute -top-4 -right-4 '
				>
					<MdOutlineClose size={25} color='#fff' />
				</button>
				<div className='flex flex-col gap-3 w-full h-full'>
					<h2 className='text-4xl font-bold text-center mb-5'>
						{title}
					</h2>
					{children}
				</div>
			</div>
		</div>
	);
};
