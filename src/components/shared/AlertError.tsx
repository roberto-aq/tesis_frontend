import { Alert } from 'keep-react';
import { FiXCircle } from 'react-icons/fi';
import { useGeneralStore } from '../../store';

interface AlertErrorProps {
	error: string | null;
}

export const AlertError: React.FC<AlertErrorProps> = ({ error }) => {
	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);
	const setShowAlertError = useGeneralStore(
		state => state.setShowAlertError
	);
	const onDismiss = () => setShowAlertError(!showAlertError);

	return (
		<div className='absolute bottom-0 right-0 mr-8 mb-8'>
			<Alert
				onDismiss={onDismiss}
				dismiss={false}
				rounded={true}
				withBorder={true}
				withBorderAccent={true}
				color='error'
			>
				<Alert.Container>
					<Alert.Icon>
						<FiXCircle size={24} color='#E92215' />
					</Alert.Icon>
					<Alert.Body>
						<Alert.Title>¡Ups!</Alert.Title>
						<Alert.Description>
							{error ||
								'Algo salió mal. Vuelva a intentarlo en otro momento.'}
						</Alert.Description>
					</Alert.Body>
				</Alert.Container>
			</Alert>
		</div>
	);
};
