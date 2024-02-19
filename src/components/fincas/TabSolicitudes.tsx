import { FaCheck } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store';
import { UsuariosInactivos } from '../../interfaces';
import { ModalInfoFinca } from './ModalInfoFinca';
import { AuthService } from '../../services/auth.service';
import { formatearFecha } from '../../helpers/formatDate';

const headersRow = [
	'Nombre de la finca',
	'Propietario',
	'Fecha de solicitud',
	'Acciones',
];

export const TabSolicitudes = () => {
	const [modalLocalOpen, setModalLocalOpen] = useState(false);
	const [selectedFinca, setSelectedFinca] =
		useState<UsuariosInactivos | null>(null);

	const getAllInactiveUsers = useAuthStore(
		state => state.getAllInactiveUsers
	);
	const usuariosInactivos = useAuthStore(
		state => state.usuariosInactivos
	);

	const onChangeModal = (usuario: UsuariosInactivos) => {
		setModalLocalOpen(true);
		setSelectedFinca(usuario);
	};

	const activateUser = async (usuario: UsuariosInactivos) => {
		await AuthService.activateUser(usuario.id);
		setModalLocalOpen(false);
		getAllInactiveUsers();
	};

	// !TODO RECHAZAR

	useEffect(() => {
		getAllInactiveUsers();
	}, []);

	return (
		<div className='p-8 flex flex-col gap-5'>
			<div className='grid grid-cols-5 bg-purple80 py-4 rounded-[5px] px-6 items-center justify-center'>
				{headersRow.map((header, index) => (
					<p key={index} className='font-bold text-white text-center'>
						{header}
					</p>
				))}
			</div>
			{usuariosInactivos.length > 0 ? (
				<>
					{usuariosInactivos.map((usuario, index) => (
						<div
							className={`grid grid-cols-5 gap-5 ${
								index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
							} py-4 rounded-[5px] px-6 items-center`}
							key={usuario.finca?.id || usuario.id}
						>
							<p className='font-bold text-center'>
								{usuario.finca?.nombre || 'Sin finca'}
							</p>
							<p className='font-bold text-center'>
								{usuario.finca?.propietario || 'Sin finca'}
							</p>
							<p className='font-bold text-center'>
								{formatearFecha(
									usuario.finca?.fecha_registro.split('T')[0]
								) || 'Sin finca'}
							</p>
							<div className='flex gap-3 justify-center '>
								<button
									className='bg-green-500 h-[40px] w-[40px] flex items-center justify-center rounded-lg hover:bg-green-600'
									onClick={() => activateUser(usuario)}
								>
									<FaCheck size={20} color='#fff' />
								</button>
								{/* !TODO RECHAZAR*/}
								{/* <button className='bg-red-500 h-[40px] w-[40px] flex items-center justify-center rounded-lg hover:bg-red-600'>
									<CgClose size={20} color='#fff' />
								</button> */}
							</div>
							<button
								className='bg-purple80 h-full text-white font-bold rounded-md hover:bg-purple100 text-sm'
								onClick={() => onChangeModal(usuario)}
							>
								Ver Información
							</button>
						</div>
					))}
				</>
			) : (
				<div className='flex justify-center items-center h-28'>
					<p className='text-xl font-bold text-primaryGray'>
						No hay solicitudes pendientes
					</p>
				</div>
			)}

			{modalLocalOpen && (
				<ModalInfoFinca
					setModalLocalOpen={setModalLocalOpen}
					usuario={selectedFinca as UsuariosInactivos}
					activateUser={activateUser}
				/>
			)}
		</div>
	);
};
