import { TbListDetails } from 'react-icons/tb';
import { FaCow } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import {
	GiCow,
	GiMilkCarton,
	GiWeight,
	GiFarmTractor,
	GiDeathJuice,
	GiHighGrass,
	GiPoisonBottle,
} from 'react-icons/gi';
import { MdPets } from 'react-icons/md';

export const enlacesAnimales = [
	{
		ruta: ``,
		texto: 'Detalles',
		Icono: TbListDetails,
	},
	{
		ruta: `alimentacion`,
		texto: 'Alimentación',
		Icono: GiHighGrass,
	},
	{
		ruta: `genealogia`,
		texto: 'Genealogía',
		Icono: FaCow,
	},
	{
		ruta: `sanidad`,
		texto: 'Sanidad',
		Icono: GiPoisonBottle,
	},
];

/* ********************************** */
/*           ENLACES SIDEBAR          */
/* ********************************** */

export const enlacesSidebar = [
	{
		ruta: '',
		texto: 'Inicio',
		Icono: FaHome,
	},
	{
		ruta: 'fincas',
		texto: 'Fincas',
		Icono: GiFarmTractor,
	},
	{
		ruta: 'animales',
		texto: 'Animales',
		Icono: GiCow,
	},
	{
		ruta: 'reproduccion',
		texto: 'Reproducción',
		Icono: MdPets,
	},
	{
		ruta: 'pesaje',
		texto: 'Pesaje',
		Icono: GiWeight,
	},
	{
		ruta: 'produccion',
		texto: 'Producción',
		Icono: GiMilkCarton,
	},
	{
		ruta: 'descarte',
		texto: 'Descarte',
		Icono: GiDeathJuice,
	},
];
