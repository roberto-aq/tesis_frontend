import { ChangeEvent, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';

export const ImageField = () => {
	const [image, setImage] = useState<string | null>(null);

	const handleImageChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImage(imageUrl);
		}
		console.log(file);
	};

	return (
		<div className='relative w-full h-48  rounded-lg  '>
			<div className='w-full h-full bg-gray-300 rounded-lg overflow-hidden'>
				<input
					type='file'
					id='image-upload'
					accept='image/*'
					onChange={handleImageChange}
					className='absolute w-full h-full opacity-0 cursor-pointer z-10'
				/>
				{image && (
					<img
						src={image}
						alt='Imagen seleccionada'
						className='object-contain w-full h-full'
					/>
				)}
			</div>
			<div className='absolute -bottom-4 -right-3  '>
				<label
					htmlFor='image-upload'
					className='cursor-pointer w-[40px] h-[40px] bg-purple80 flex items-center justify-center rounded-full'
				>
					<FaCamera className='text-white' size={18} />
				</label>
			</div>
		</div>
	);
};
