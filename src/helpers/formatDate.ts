export const formatDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false, // Puedes usar esto para el formato de 24 horas
	};
	return date.toLocaleDateString('es-ES', options);
};

export const formatDateShort = (isoData: string): string => {
	if (isoData === '') return '';

	const date = new Date(isoData);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return date.toLocaleDateString('es-ES', options);
};

export const formatearFecha = (
	fechaInput: string | Date | undefined
) => {
	if (!fechaInput) return '-';

	// Determinar si la entrada es una cadena o un objeto Date
	const fecha =
		typeof fechaInput === 'string'
			? new Date(`${fechaInput}T00:00:00`) // Para strings, añadir T00:00:00 para evitar problemas de zona horaria
			: new Date(fechaInput); // Para objetos Date, usar directamente

	// Asegurarse de que la fecha es válida
	if (isNaN(fecha.getTime())) {
		return 'Fecha inválida';
	}

	const opciones: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC', // Asegurarse de que la fecha no se convierta a la zona horaria local
	};

	// Convertir la fecha a una cadena con el formato deseado
	const newDate: string = fecha.toLocaleDateString('es-ES', opciones);
	return newDate.split('de').join('').trim();
};

export const diferenciasDias = (
	// Esta fecha puede ser ultimo parto, o anterior servicio
	fechaAnterior: string,
	// Esta fecha puede ser fecha primer servicio o fecha ultimo servicio
	fechaActual: string
) => {
	const fecha1 = new Date(fechaAnterior);
	const fecha2 = new Date(fechaActual);

	const resta = fecha2.getTime() - fecha1.getTime();

	const diferenciaDias = Math.ceil(resta / (1000 * 3600 * 24));

	return diferenciaDias;
};
