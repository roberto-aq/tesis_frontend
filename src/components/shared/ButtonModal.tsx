import { IconType } from 'react-icons';

interface propsButtonModal {
	textLabel: string;
	Icon?: IconType;
	color: string;
	onClick?: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void | (() => void);
}

export const ButtonModal: React.FC<propsButtonModal> = ({
	textLabel,
	Icon,
	color,
	onClick,
}) => {
	const containEdit = textLabel.includes('Editar');

	return (
		<button
			className={`bg-${color} text-white px-5 rounded-lg py-2 font-bold flex items-center justify-center gap-3 ${
				containEdit && 'bg-blueEdit'
			}`}
			onClick={onClick}
		>
			{Icon && <Icon size={15} />}
			{textLabel}
		</button>
	);
};
