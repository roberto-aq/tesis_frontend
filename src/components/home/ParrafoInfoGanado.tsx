import { Conteo } from '../../pages';

interface ParrafoInfoGanadoProps {
	clave: string;
	distribucion: Conteo;
}

export const ParrafoInfoGanado: React.FC<ParrafoInfoGanadoProps> = ({
	clave,
	distribucion,
}) => {
	return (
		<p className='font-bold  text-lg flex gap-5'>
			<span>{clave}</span> - <span>{distribucion[clave] || '0'}</span>
		</p>
	);
};
