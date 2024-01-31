import { Link, useRouteError } from 'react-router-dom';

export const NotFoundPage = () => {
	const error = useRouteError();

	return (
		<div className='container'>
			<h1>¡Ups!</h1>
			<p>Esta url no existe</p>
			<p>Regresa al inicio</p>
			<Link to='/'>Volver</Link>
		</div>
	);
};
