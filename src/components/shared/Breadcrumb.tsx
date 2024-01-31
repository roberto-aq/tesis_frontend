import { Link, useMatches } from 'react-router-dom';

const pathnames = [
	'inicio/animales',
	'inicio/reproduccion',
	'inicio/pesaje',
	'inicio/produccion',
	'inicio/descarte',
	'inicio/fincas',
];

export const Breadcrumb = () => {
	const matches = useMatches();
	const crumbs = matches
		.filter((match: any) => match.handle && match.handle.crumb)
		.map((match: any) => ({
			path: match.pathname,
			crumb: match.handle.crumb(match.data),
		}));

	// Verifica si el usuario está en la página de inicio
	const isAtHome = crumbs.length === 1 && crumbs[0].path === '/';

	return (
		<nav aria-label='breadcrumbs' className='mb-7'>
			<ol className='flex gap-1 text-[#808080] font-semibold text-sm'>
				{/* Si no está en Inicio, mostramos el enlace a Inicio */}
				{!isAtHome && (
					<li>
						<Link to='/'>Inicio</Link>
					</li>
				)}
				{/* Renderizamos las migas de pan restantes */}
				{crumbs.map(({ path, crumb }, index) => (
					<li key={index} className='flex items-center gap-1'>
						{!isAtHome && <span className='mx-2'>{'>'}</span>}
						{path.startsWith('/inicio/animales/') && (
							<>
								<Link to='/inicio/animales'>Animales</Link>
								<span className='mx-2'>{'>'}</span>
							</>
						)}
						{path.startsWith('/inicio/reproduccion/') && (
							<>
								<Link to='/inicio/reproduccion'>Reproducción</Link>
								<span className='mx-2'>{'>'}</span>
							</>
						)}
						{path.startsWith('/inicio/pesaje/') && (
							<>
								<Link to='/inicio/pesaje'>Pesaje</Link>
								<span className='mx-2'>{'>'}</span>
							</>
						)}
						{path.startsWith('/inicio/produccion/') && (
							<>
								<Link to='/inicio/produccion'>Producción</Link>
								<span className='mx-2'>{'>'}</span>
							</>
						)}
						{path.startsWith('/inicio/descarte/') && (
							<>
								<Link to='/inicio/descarte'>Descarte</Link>
								<span className='mx-2'>{'>'}</span>
							</>
						)}
						{index === crumbs.length - 1 ? (
							<span className='capitalize font-bold text-purple100 underline'>
								{crumb}
							</span>
						) : (
							<Link to={path}>{crumb}</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};
