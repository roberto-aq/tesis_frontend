import { MdOutlineClose } from 'react-icons/md';
import { useAuthStore } from '../../store';

interface ModalErrorAuthProps {
	errorMessage: string;
	setIsModalErrorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalErrorAuth: React.FC<ModalErrorAuthProps> = ({
	errorMessage,
	setIsModalErrorOpen,
}) => {
	const clearError = useAuthStore(state => state.clearError);

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 py-10 rounded-lg shadow-lg max-w-sm relative w-[500px] flex flex-col gap-2'>
				<button
					onClick={() => {
						setIsModalErrorOpen(false);
						clearError();
					}}
					className='bg-red-500 rounded-full w-10 h-10 flex items-center justify-center absolute -top-4 -right-4 '
				>
					<MdOutlineClose size={25} color='#fff' />
				</button>
				<h3 className='font-bold text-3xl text-center mb-3'>Ups!</h3>
				<p className='text-lg text-purple100 font-bold capitalize'>
					{errorMessage}
				</p>
				<p className=' text-primaryGray font-semibold'>
					Vuelve a intentarlo
				</p>
			</div>
		</div>
	);
};
