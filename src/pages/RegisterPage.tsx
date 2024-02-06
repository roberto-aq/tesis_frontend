import { Link, useNavigate } from 'react-router-dom';
import { InputForm, InputFormAuth, SectionAuth } from '../components';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store';
import { useFincasStore } from '../store/fincas/fincas.store';

export const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const registerUser = useAuthStore(state => state.registerUser);
	const token = useAuthStore(state => state.token);
	const setStatus = useAuthStore(state => state.setStatus);
	const setFincaId = useAuthStore(state => state.setFincaId);
	const user = useAuthStore(state => state.user);

	const createFinca = useFincasStore(state => state.createFinca);

	const onRegister = handleSubmit(data => {
		const usuarioNuevo = {
			email: data.email,
			password: data.password,
			nombre: data.nombre,
			apellidos: data.apellidos,
			telefono: data.telefono,
			direccion: data.direccion,
		};

		registerUser(usuarioNuevo);
	});

	const onRegisterFinca = handleSubmit(async data => {
		const newFinca: any = {
			nombre: data.nombre,
			municipio: data.municipio,
			propietario: data.propietario,
			administrador: data.administrador,
			veterinario: data.veterinario,
			forrajes: data.forrajes,
			areaTotal: +data.areaTotal,
			areaAprovechable: +data.areaAprovechable,
			numeroPotreros: +data.numeroPotreros,
			rotacion: +data.rotacion,
			riego: data.riego,
			fertilizacion: data.fertilizacion,
		};

		const finca = await createFinca(newFinca);
		setStatus('authorized');
		setFincaId(finca.id);
	});

	// Observar el valor del campo de contraseña
	const password = watch('password');
	const confirmPassword = watch('confirmPassword');

	return (
		<div className=' container bg-purple60 h-[700px] rounded-[15px]'>
			<SectionAuth>
				{!token ? (
					<form
						className='flex-1   flex   justify-center flex-col gap-5 h-[100%] overflow-auto'
						onSubmit={onRegister}
					>
						<h2 className='text-purple80 font-bold text-[45px] text-center mb-10 my-10'>
							Registrarse
						</h2>

						<div className='grid grid-cols-2  h-full gap-4'>
							<div className='col-span-2'>
								<InputFormAuth
									label='Correo Electrónico'
									name='email'
									type='email'
									register={register}
									required={true}
									errors={errors}
								/>
							</div>

							<InputFormAuth
								label='Contraseña'
								name='password'
								type='password'
								register={register}
								required={true}
								errors={errors}
							/>
							<InputFormAuth
								label='Repetir contraseña'
								name='confirmPassword'
								type='password'
								register={register}
								required={true}
								errors={errors}
							/>

							<InputFormAuth
								label='Nombre'
								name='nombre'
								type='text'
								register={register}
								required={true}
								errors={errors}
							/>
							<InputFormAuth
								label='Apellidos'
								name='apellidos'
								type='text'
								register={register}
								required={true}
								errors={errors}
							/>
							<InputFormAuth
								label='Teléfono'
								name='telefono'
								type='text'
								register={register}
								errors={errors}
							/>
							<InputFormAuth
								label='Dirección'
								name='direccion'
								type='text'
								register={register}
								errors={errors}
							/>
						</div>

						<div className='flex flex-col gap-6 mt-5 items-center'>
							<button className='bg-purple80 rounded-xl text-white h-[65px] flex items-center justify-center w-[350px] font-bold text-xl'>
								Registrarse
							</button>
							<span className='text-purple80'>
								¿Ya tienes una cuenta?
								<Link
									to='/auth/login'
									className='font-bold underline'
								>
									{' '}
									Iniciar sesión
								</Link>
							</span>
						</div>
					</form>
				) : (
					<form
						className='flex-1   flex   justify-center flex-col gap-5 h-[100%] overflow-auto'
						onSubmit={onRegisterFinca}
					>
						<h2 className='text-purple80 font-bold text-[45px] text-center mt-32'>
							Registrar Finca
						</h2>

						<div className='grid grid-cols-2  h-full gap-4'>
							<InputFormAuth
								label='nombre de la Finca'
								name='nombre'
								type='text'
								register={register}
								required={true}
								errors={errors}
								placeholder='Ejm: Finca la esperanza'
							/>

							<InputFormAuth
								label='municipio'
								name='municipio'
								type='text'
								register={register}
								required={true}
								errors={errors}
								placeholder='Ejm: San Juan de Urabá'
							/>
							<InputFormAuth
								label='propietario'
								name='propietario'
								type='text'
								register={register}
								required={true}
								errors={errors}
								placeholder='Ejm: Juan Pérez'
							/>

							<InputFormAuth
								label='administrador'
								name='administrador'
								type='text'
								register={register}
								errors={errors}
								placeholder='Ejm: Ricardo Pérez'
							/>
							<InputFormAuth
								label='veterinario'
								name='veterinario'
								type='text'
								register={register}
								errors={errors}
								placeholder='Ejm: Susana Martínez'
							/>
							<InputFormAuth
								label='Forrajes'
								name='forrajes'
								type='text'
								register={register}
								errors={errors}
								placeholder='Ejm: Kikuyo, Brachiaria, etc'
								required={true}
							/>
							<InputFormAuth
								label='Hectáreas Totales'
								name='areaTotal'
								type='number'
								errors={errors}
								required={true}
								register={register}
								placeholder='Ejm: 20'
							/>
							<InputFormAuth
								label='Hectáreas Útiles'
								name='areaAprovechable'
								type='number'
								errors={errors}
								required={true}
								register={register}
								placeholder='Ejm: 10'
							/>

							<InputFormAuth
								label='número de potreros'
								name='numeroPotreros'
								type='number'
								register={register}
								errors={errors}
								placeholder='Ejm: 5 potreros'
							/>

							<InputFormAuth
								label='rotación de potreros'
								name='rotacion'
								type='number'
								register={register}
								errors={errors}
								placeholder='Ejm: 3 meses'
							/>

							<InputFormAuth
								label='Riego'
								name='riego'
								errors={errors}
								type='checkbox'
								register={register}
							/>
							<InputFormAuth
								label='fertilización'
								name='fertilizacion'
								errors={errors}
								type='checkbox'
								register={register}
							/>
						</div>

						<div className='flex flex-col gap-6 mb-6 mt-2 items-center'>
							<button className='bg-purple80 rounded-xl text-white h-[55px] flex items-center justify-center w-[350px] font-bold text-lg hover:bg-purple100 transition-all'>
								Completar Registro
							</button>
						</div>
					</form>
				)}
			</SectionAuth>
		</div>
	);
};
