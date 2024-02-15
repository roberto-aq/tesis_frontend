import imagenAuth1 from '../../assets/imagen-auth1.webp';
import imagenAuth2 from '../../assets/imagen-auth2.webp';

interface SectionAuthProps {
	children: React.ReactNode;
}

export const SectionAuth: React.FC<SectionAuthProps> = ({
	children,
}) => {
	return (
		<section className='flex gap-5 h-full rounded-[15px] overflow-hidden shadow-sm transition-all'>
			<div className='flex-1  transition-all'>
				<img
					src={imagenAuth1}
					alt='Imagen de presentación'
					className='h-full w-full object-cover '
				/>
			</div>

			{children}
		</section>
	);
};
