import { createBrowserRouter } from 'react-router-dom';
import { LayoutUsuario } from '../layout/LayoutUsuario';
import {
	AnimalDetailPage,
	AnimalesPage,
	FincasPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	PesajePage,
	ProduccionPage,
	RegisterPage,
	ReproduccionPage,
	DescartePage,
	ReproduccionDetailPage,
	PesajeDetailPage,
	DescarteDetailPage,
	ProduccionDetailPage,
} from '../pages';
import {
	AlimentacionAnimal,
	DetailsAnimal,
	GenealogiaAnimal,
	SanidadAnimal,
} from '../components';
import { Root } from '../Root';
import { LayoutAuth } from '../layout/LayoutAuth';
import {
	PesajeAnimalLoader,
	DescarteAnimalLoader,
	ProduccionAnimalLoader,
	ReproduccionAnimalLoader,
	AnimalLoader,
} from '../interfaces';
import {
	animalesLoader,
	descarteAnimalLoader,
	pesajeAnimalLoader,
	produccionAnimalLoader,
	reproduccionAnimalLoader,
} from './loaders';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: 'inicio',
				element: <LayoutUsuario />,
				children: [
					{
						index: true,
						element: <HomePage />,
					},
					{
						path: 'animales',
						element: <AnimalesPage />,
						handle: {
							crumb: () => 'Animales',
						},
					},
					{
						path: 'animales/:id',
						element: <AnimalDetailPage />,
						loader: animalesLoader,
						handle: {
							crumb: (data: AnimalLoader) => {
								return data.animalInfo.nombre;
							},
						},
						children: [
							{
								index: true,
								element: <DetailsAnimal />,
							},
							{
								path: 'alimentacion',
								element: <AlimentacionAnimal />,
							},
							{
								path: 'genealogia',
								element: <GenealogiaAnimal />,
							},
							{
								path: 'sanidad',
								element: <SanidadAnimal />,
							},
						],
					},
					{
						path: 'fincas',
						element: <FincasPage />,
						handle: {
							crumb: () => 'Fincas',
						},
					},
					{
						path: 'reproduccion',
						element: <ReproduccionPage />,
						handle: {
							crumb: () => 'Reproducción',
						},
					},
					{
						path: 'reproduccion/:id',
						element: <ReproduccionDetailPage />,
						loader: reproduccionAnimalLoader,
						handle: {
							crumb: (data: ReproduccionAnimalLoader) => {
								return data.info.nombre;
							},
						},
					},
					{
						path: 'pesaje',
						element: <PesajePage />,
						handle: {
							crumb: () => 'Pesaje',
						},
					},
					{
						path: 'pesaje/:id',
						element: <PesajeDetailPage />,
						// !PENDIENTE LOADER
						loader: pesajeAnimalLoader,
						handle: {
							crumb: (data: PesajeAnimalLoader) => {
								return data.animal.nombre;
							},
						},
					},
					{
						path: 'produccion',
						element: <ProduccionPage />,
						handle: {
							crumb: () => 'Producción',
						},
					},
					{
						path: 'produccion/:id',
						element: <ProduccionDetailPage />,
						// !PENDIENTE LOADER
						loader: produccionAnimalLoader,
						handle: {
							crumb: (data: ProduccionAnimalLoader) => {
								return data.animal.nombre;
							},
						},
					},
					{
						path: 'descarte',
						element: <DescartePage />,
						handle: {
							crumb: () => 'Descarte',
						},
					},
					{
						path: 'descarte/:id',
						element: <DescarteDetailPage />,
						// !PENDIENTE LOADER
						loader: descarteAnimalLoader,
						handle: {
							crumb: (data: DescarteAnimalLoader) => {
								return data.animal.nombre;
							},
						},
					},
				],
			},
			// Rutas Públicas - Auth
			{
				path: 'auth',
				element: <LayoutAuth />,
				children: [
					{
						path: 'login',
						element: <LoginPage />,
					},
					{
						path: 'register',
						element: <RegisterPage />,
					},
				],
			},
		],
	},
]);
