import { useState, useEffect, useMemo, ChangeEvent } from 'react';

// Tipo para el estado inicial del formulario
interface FormState {
	[key: string]: any;
}

// Tipo para la función de validación y mensaje de error
interface ValidationRule {
	validator: (value: any) => boolean;
	errorMessage: string;
}

// Tipo para las validaciones del formulario
interface FormValidations {
	[field: string]: ValidationRule;
}

// Tipo para el estado de las validaciones
interface FormValidationState {
	[key: string]: string | null;
}

export const useForm = <T extends FormState>(
	initialForm: T,
	formValidations: FormValidations = {}
) => {
	const [formState, setFormState] = useState<T>(initialForm);
	const [formValidation, setFormValidation] =
		useState<FormValidationState>({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		return Object.values(formValidation).every(
			value => value === null
		);
	}, [formValidation]);

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: name === 'email' ? value.toLowerCase() : value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	const createValidators = () => {
		const formCheckedValues: FormValidationState = {};

		for (const formField in formValidations) {
			const { validator, errorMessage } = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = validator(
				formState[formField]
			)
				? null
				: errorMessage;
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};
