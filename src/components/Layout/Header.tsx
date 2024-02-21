import { CiBellOn } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa6';
import { useAuthStore } from '../../store';
import { SelectFincas } from '../shared/SelectFincas';

export const Header = () => {
	const user = useAuthStore(state => state.user);

	return (
		<header className='flex bg-white py-3 px-10'>
			<div className='flex-1 flex '>
				<button className=' px-2'>
					<FaBars size={25} />
				</button>
			</div>
			<div className='flex items-center '>
				{user?.rol === 'administrador' && <SelectFincas />}
				<button className=' py-3 px-6 border-l-2 border-r-2'>
					<CiBellOn size={25} />
				</button>
				<div className='flex gap-3 items-center ml-6 '>
					{/* Container Avatar */}
					<div className='rounded-full overflow-hidden w-[50px] h-[50px]'>
						<img
							src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='Imagen Avatar'
							className='w-[full] h-[full] object-contain'
						/>
					</div>
					<div className='flex flex-col flex-1'>
						<p className='font-bold'>
							{user?.nombre || 'No usuario'}
						</p>
						<p className=''>{user?.email}</p>
					</div>
				</div>
			</div>
		</header>
	);
};
