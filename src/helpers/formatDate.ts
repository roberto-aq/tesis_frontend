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
