import { Button, Modal } from 'keep-react';
import { FaTrashAlt } from 'react-icons/fa';
import { useGeneralStore } from '../../store';

interface ModalDeleteProps {
	handleDelete: () => void;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
	handleDelete,
}) => {
	const modalError = useGeneralStore(state => state.modalError);
	const setModalError = useGeneralStore(state => state.setModalError);
	return (
		<Modal
			icon={<FaTrashAlt size={28} color='#E92215' />}
			size='md'
			show={modalError}
			onClose={() => setModalError(false)}
		>
			<Modal.Header>
				<p className='font-bold capitalize'>
					Confirmación de eliminación
				</p>
			</Modal.Header>
			<Modal.Body>
				<div className='space-y-6'>
					<p className='text-body-4 leading-relaxed text-metal-500'>
						¿Estás seguro que deseas eliminar este registro?
					</p>
				</div>
			</Modal.Body>
			<Modal.Footer className='flex justify-center'>
				<Button
					type='outlineGray'
					onClick={() => setModalError(false)}
				>
					Cancelar
				</Button>
				<Button type='primary' color='error' onClick={handleDelete}>
					Eliminar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
