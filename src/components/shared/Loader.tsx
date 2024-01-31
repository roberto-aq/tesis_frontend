import LoaderGif from '../../assets/loader-cow.gif';

interface LoaderProps {
	fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ fullscreen }) => {
	return (
		<div
			className={`flex ${
				fullscreen ? 'bg-secondaryGreen' : 'bg-white shadow-sm'
			} w-full flex-1 h-screen rounded-xl items-center justify-center`}
		>
			<img src={LoaderGif} alt='Imagen de carga - Cargando...' />
		</div>
	);
};
