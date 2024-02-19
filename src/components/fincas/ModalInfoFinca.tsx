import { MdOutlineClose } from 'react-icons/md';
import { UsuariosInactivos } from '../../interfaces';
import { CardContentInfo } from './CardContentInfo';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { formatearFecha } from '../../helpers/formatDate';

export interface ModalInfoFincaProps {
	setModalLocalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	usuario: UsuariosInactivos;
	activateUser: (usuario: UsuariosInactivos) => Promise<void>;
}

export const ModalInfoFinca: React.FC<ModalInfoFincaProps> = ({
	setModalLocalOpen,
	usuario,
	activateUser,
}) => {
	const { finca } = usuario;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			<div
				className={`bg-white p-6 py-8 rounded-lg shadow-lg  relative  flex flex-col gap-2 
                        w-[60%] xl:[50%] h-[100&]`}
			>
				<button
					onClick={() => {
						setModalLocalOpen(false);
					}}
					className='bg-red-500 rounded-full w-10 h-10 flex items-center justify-center absolute -top-4 -right-4 '
				>
					<MdOutlineClose size={25} color='#fff' />
				</button>
				<div className='flex flex-col gap-3 w-full h-full'>
					<h2 className='text-4xl font-bold text-center mb-5'>
						Información de la Finca
					</h2>

					<div className='flex flex-col gap-6 h-[600px] overflow-auto'>
						<div className='grid grid-cols-4 gap-5  '>
							<CardContentInfo
								title='Nombre'
								content={finca?.nombre || '-'}
							/>
							<CardContentInfo
								title='Municipio'
								content={finca?.municipio || '-'}
							/>
							<CardContentInfo
								title='Propietario'
								content={finca?.propietario || '-'}
							/>
							<CardContentInfo
								title='Administrador'
								content={finca?.administrador || '-'}
							/>
							<CardContentInfo
								title='Veterinario'
								content={finca?.veterinario || '-'}
							/>
							<CardContentInfo
								title='Forrajes'
								content={finca?.forrajes || '-'}
							/>
							<CardContentInfo
								title='Hectáreas totales'
								content={finca?.areaTotal.toString() || '-'}
							/>
							<CardContentInfo
								title='Hectáreas útiles'
								content={finca?.areaAprovechable.toString() || '-'}
							/>
							<CardContentInfo
								title='Número de potreros'
								content={finca?.numeroPotreros || '-'}
							/>
							<CardContentInfo
								title='Rotación'
								content={finca?.rotacion || '-'}
							/>
							<CardContentInfo
								title='Riego'
								content={finca?.riego ? '✅' : '❌'}
							/>
							<CardContentInfo
								title='Fertilización'
								content={finca?.fertilizacion ? '✅' : '❌'}
							/>

							<div className='col-span-4'>
								<CardContentInfo
									title='Observaciones'
									content={finca?.notas || '-'}
								/>
							</div>
						</div>

						<h2 className='text-4xl font-bold text-center mb-5'>
							Información de usuario registrado
						</h2>

						<div className='grid grid-cols-3 gap-5'>
							<CardContentInfo
								title='Nombre'
								content={usuario.nombre}
							/>
							<CardContentInfo
								title='Apellidos'
								content={usuario.apellidos}
							/>
							<CardContentInfo
								title='Correo'
								content={usuario.email}
							/>
							<CardContentInfo
								title='Fecha de solicitud'
								content={
									formatearFecha(
										usuario.fecha_creacion.split('T')[0]
									) || '-'
								}
							/>
							<CardContentInfo
								title='Teléfono'
								content={usuario.telefono || '-'}
							/>
							<CardContentInfo
								title='Dirección'
								content={usuario.direccion || '-'}
							/>
						</div>
					</div>
					<button
						className='bg-secondaryGreen self-center h-[45px] flex items-center justify-center text-white font-bold gap-3 px-10 rounded-lg mt-5 hover:bg-green-600'
						onClick={() => activateUser(usuario)}
					>
						<IoCheckmarkCircle size={20} />
						Aceptar
					</button>
				</div>
			</div>
		</div>
	);
};
