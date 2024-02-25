import { Parto } from '../interfaces';

export const calcularEdadEnMeses = (fechaNacimiento: string) => {
	const fechaNac = new Date(fechaNacimiento);
	const fechaActual = new Date();

	let meses =
		(fechaActual.getFullYear() - fechaNac.getFullYear()) * 12;
	meses -= fechaNac.getMonth();
	meses += fechaActual.getMonth();

	return meses <= 0 ? 0 : meses;
};

// Calcula la edad del animal al primer parto
export const calcularEdadPrimerParto = (
	fechaNacimiento: string,
	fechaParto: string
) => {
	const nacimiento = new Date(fechaNacimiento);
	const parto = new Date(fechaParto);

	// Calcular la diferencia total en meses
	let meses = (parto.getFullYear() - nacimiento.getFullYear()) * 12;
	meses -= nacimiento.getMonth();
	meses += parto.getMonth();

	// Asegurar que el valor no sea negativo
	return meses <= 0 ? 0 : meses;
};

export const obtenerPrimerParto = (partos: any[]) => {
	if (partos.length === 0) {
		return 0;
	}

	const partosOrdenados = [...partos].sort(
		(a, b) =>
			new Date(b.fechaRegistro).getTime() -
			new Date(a.fechaRegistro).getTime()
	);

	return partosOrdenados[0];
};

// Obtener Intervalos entre partos
export const calcularIntervaloEntrePartos = (partos: Parto[]) => {
	// Asegurarse de que los partos están ordenados por fecha
	partos.sort(
		(a, b) => +new Date(a.fechaParto) - +new Date(b.fechaParto)
	);

	// Crear un array para almacenar los intervalos
	const intervalos = [];

	// Iterar sobre los partos, empezando desde el segundo elemento
	for (let i = 1; i < partos.length; i++) {
		const fechaPartoActual = new Date(partos[i].fechaParto);
		const fechaPartoAnterior = new Date(partos[i - 1].fechaParto);

		// Calcular la diferencia en días y agregarla al array de intervalos
		const diferenciaEnDias =
			(+fechaPartoActual - +fechaPartoAnterior) /
			(1000 * 60 * 60 * 24);
		intervalos.push(diferenciaEnDias);
	}

	return intervalos;
};

// Función para calcular los días de lactancia de los registros de producción de un animal
export const calcularDiasLactancia = (
	fechaRegistro: string,
	fechaUltimoParto: string
) => {
	const fechaInicio = new Date(fechaUltimoParto);
	const fechaFin = new Date(fechaRegistro);
	const diferenciaTiempo =
		fechaFin.getTime() - fechaInicio.getTime();
	const diferenciaDias = Math.ceil(
		diferenciaTiempo / (1000 * 3600 * 24)
	);
	return diferenciaDias;
};