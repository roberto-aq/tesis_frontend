import { Link, useNavigate } from 'react-router-dom';
import { InputFormAuth, SectionAuth } from '../components';
import { useAuthStore } from '../store';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface LoginFormState {
	email: string;
	password: string;
}

const initialForm: LoginFormState = {
	email: '',
	password: '',
};

const formValidations = {
	email: {
		validator: (value: string) => value.includes('@'),
		errorMessage: 'El correo debe tener un @',
	},
	password: {
		validator: (value: string) => value.length >= 6,
		errorMessage: 'La contraseña debe tener al menos 6 caracteres',
	},
};

export const LoginPage = () => {
	const navigate = useNavigate();

	// const {
	// 	email,
	// 	password,
	// 	onInputChange,
	// 	isFormValid,
	// 	...formValidation,
	// } = useForm<LoginFormState>(initialForm, formValidations);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormState>();

	useEffect(() => {
		reset({
			email: 'usuario@prueba.com',
			password: 'Abc123',
		});
	}, []);

	const loginUser = useAuthStore(state => state.loginUser);

	// const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	// 	try {
	// 		await loginUser(email, password);
	// 		navigate('/inicio');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const onLogin = handleSubmit(async data => {
		try {
			await loginUser(data.email, data.password);
			navigate('/inicio');
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<div className=' container bg-purple60 h-[700px] rounded-[15px]'>
			<SectionAuth>
				<form
					className='flex-1 p-10  flex   justify-center flex-col gap-5'
					onSubmit={onLogin}
				>
					<h2 className='text-purple80 font-bold text-[45px] text-center mb-10'>
						Iniciar Sesión
					</h2>

					<InputFormAuth
						label='Correo Electrónico'
						name='email'
						type='email'
						register={register}
						required={true}
						errors={errors}
					/>

					<InputFormAuth
						label='Contraseña'
						name='password'
						type='password'
						register={register}
						required={true}
						errors={errors}
					/>

					<div className='flex flex-col gap-6 mt-5 items-center'>
						<button className='bg-purple80 rounded-xl text-white h-[65px] flex items-center justify-center w-[350px] font-bold text-xl'>
							Iniciar sesión
						</button>
						<span className='text-purple80'>
							¿No tienes una cuenta?
							<Link
								to='/auth/register'
								className='font-bold underline'
							>
								{' '}
								Regístrate
							</Link>
						</span>
					</div>
				</form>
			</SectionAuth>
		</div>
	);
};
