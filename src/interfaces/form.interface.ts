import {
	FieldError,
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';

export interface InputFormProps {
	label: string;
	name: string;
	errors: FieldErrors<FieldValues>;
	errorField?: FieldError | undefined;
	type?:
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'date'
		| 'checkbox';
	required?: boolean;
	placeholder?: string;
	register: UseFormRegister<FieldValues> | any;
	isTextarea?: boolean;
	isDisabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	minDate?: string;
	maxDate?: string;
}
