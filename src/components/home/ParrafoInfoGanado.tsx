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
		<p className='font-bold  text-xl'>
			{clave} - {distribucion[clave]}
		</p>
	);
};
