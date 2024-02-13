import { pesosIdeales } from '../../data/pesosIdeales';
import { calcularEdadEnMeses } from '../../helpers/functions';
import { PesoResponse } from '../../interfaces';
import { usePesajeStore } from '../../store';
import { useAnimalesStore } from '../../store/animales';
import { CardInfo } from '../shared/CardInfo';

export const TabInicioPesaje = () => {
	const animal = useAnimalesStore(state => state.animalById);
	const pesos = usePesajeStore(state => state.pesos);

	const edadEnMeses = calcularEdadEnMeses(animal?.fechaNacimiento);

	const obtenerUltimoPesoRegistrado = (pesos: any[]) => {
		if (pesos.length === 0) {
			return 0;
		}

		const pesosOrdenados = [...pesos].sort(
			(a, b) =>
				new Date(b.fechaRegistro).getTime() -
				new Date(a.fechaRegistro).getTime()
		);

		return pesosOrdenados[0].peso;
	};

	const pesoActual = obtenerUltimoPesoRegistrado(pesos);

	const calcularPesoEsperado = (edadEnMeses: number) => {
		// Si la edad está dentro de la tabla, simplemente devuelve el peso ideal.
		if (edadEnMeses <= 25) {
			return pesosIdeales[edadEnMeses]?.ideal || 'No disponible';
		}

		return 'No disponible';
	};

	const pesoEsperado = calcularPesoEsperado(edadEnMeses);

	const calcularPorcentajeIdeal = (
		pesoEsperado: number | string,
		pesoActual: number
	) => {
		//El peso Esperado no puede ser 'No disponible' y  el pesoActual tiene que ser un número válido.
		if (typeof pesoEsperado === 'number' && pesoActual > 0) {
			const porcentajeIdeal = (pesoActual / pesoEsperado) * 100;
			return porcentajeIdeal.toFixed(2) + '%'; // Redondea a dos decimales y agrega el símbolo de porcentaje
		}

		return 'No disponible';
	};

	const porcentajeIdeal = calcularPorcentajeIdeal(
		pesoEsperado,
		pesoActual
	);

	const obtenerDiferenciaEnKilos = (
		pesoActual: number,
		pesoEsperado: number | string
	) => {
		if (typeof pesoEsperado === 'number') {
			return `${pesoActual - pesoEsperado} kg`;
		}

		return 'No disponible';
	};

	const calcularIncrementoPesoMes = (pesos: PesoResponse[]) => {
		if (pesos.length < 2) {
			return 0;
		}

		// Pesos ordenados por fecha de registro
		const pesosOrdenados = [...pesos].sort(
			(a, b) =>
				new Date(b.fechaRegistro).getTime() -
				new Date(a.fechaRegistro).getTime()
		);

		// Tomamos los dos registros más recientes
		const pesoActual = pesosOrdenados[0].peso;
		const pesoAnterior = pesosOrdenados[1].peso;

		// Calcula el incremento de peso
		const incrementoPeso = +pesoActual - +pesoAnterior;

		return incrementoPeso + ' kg'; // Devuelve la diferencia de peso como cadena
	};

	const calcularIncrementoPesoDiario = (pesos: any[]): string => {
		if (pesos.length < 2) {
			return 'No disponible'; // Necesitas al menos dos registros para calcular el incremento diario
		}

		// Ordenar los pesos por fecha
		const pesosOrdenados = [...pesos].sort(
			(a, b) =>
				new Date(b.fechaRegistro).getTime() -
				new Date(a.fechaRegistro).getTime()
		);

		// Tomar los dos registros más recientes
		const pesoActual = pesosOrdenados[0].peso;
		const pesoAnterior = pesosOrdenados[1].peso;
		const diasEntrePesajes =
			(new Date(pesosOrdenados[0].fechaRegistro).getTime() -
				new Date(pesosOrdenados[1].fechaRegistro).getTime()) /
			(1000 * 3600 * 24);

		// Calcula el incremento diario en gramos
		const incrementoDiario =
			((pesoActual - pesoAnterior) / diasEntrePesajes) * 1000; // Convertir kg a gr

		return incrementoDiario.toFixed(2) + ' gr/día'; // Redondea a dos decimales
	};

	const calcularAcumuladoGrDiaSumatoria = (pesos: any[]): string => {
		if (pesos.length < 2) {
			return 'No disponible'; // Necesitas al menos dos registros para calcular la sumatoria
		}

		// Ordenar los pesos por fecha
		const pesosOrdenados = [...pesos].sort(
			(a, b) =>
				new Date(a.fechaRegistro).getTime() -
				new Date(b.fechaRegistro).getTime()
		);

		let incrementoTotalGramos = 0;
		let diasTotales = 0;

		// Recorre los pesos para calcular el incremento total en gramos
		for (let i = 1; i < pesosOrdenados.length; i++) {
			const pesoActual = pesosOrdenados[i].peso;
			const pesoAnterior = pesosOrdenados[i - 1].peso;
			const diasEntrePesajes =
				(new Date(pesosOrdenados[i].fechaRegistro).getTime() -
					new Date(pesosOrdenados[i - 1].fechaRegistro).getTime()) /
				(1000 * 3600 * 24);

			incrementoTotalGramos += (pesoActual - pesoAnterior) * 1000; // Convertir kg a gr
			diasTotales += diasEntrePesajes;
		}

		// Calcula el acumulado gr/día como sumatoria de incrementos dividido por días totales
		const acumuladoGrDia = incrementoTotalGramos / diasTotales;

		return acumuladoGrDia.toFixed(2) + ' gr/día'; // Redondea a dos decimales
	};

	return (
		<div className='p-8 grid grid-cols-4 gap-5'>
			<CardInfo
				title='Peso de nacimiento'
				content={`${animal?.pesoNacimiento}kg`}
				tooltipText='Muestra el peso de nacimiento del animal'
			/>
			<CardInfo
				title='Edad actual en meses'
				content={`${edadEnMeses} meses`}
				tooltipText='Muestra la edad actual del animal en meses'
			/>
			<CardInfo
				title='Último peso registrado'
				content={`${pesoActual} kg`}
				tooltipText='Muestra el último peso registrado'
			/>
			<CardInfo
				title='Peso esperado'
				content={calcularPesoEsperado(edadEnMeses)}
				tooltipText='Muestra el peso esperado del animal en base a la tabla de pesos ideales'
			/>
			<CardInfo
				title='Diferencia en Kilos'
				content={obtenerDiferenciaEnKilos(pesoActual, pesoEsperado)}
				tooltipText='Diferencia en Kilos con el peso esperado del animal'
			/>
			<CardInfo
				title='Incremento peso mes'
				content={calcularIncrementoPesoMes(pesos)}
				tooltipText='Diferencia entre el ultimo mes registrado y el nuevo mes en kg (+25kg)'
			/>
			<CardInfo
				title='Incremento Gr/Día'
				content={calcularIncrementoPesoDiario(pesos)}
				tooltipText=''
			/>
			<CardInfo
				title='Acumulado Gr/Día'
				content={calcularAcumuladoGrDiaSumatoria(pesos)}
				tooltipText=''
			/>
			<CardInfo
				title='Porcentaje Ideal'
				content={porcentajeIdeal}
				tooltipText='Porcentaje del peso ideal alcanzado. Es decir si el peso esperado es 20kg y tiene 18kg el porcentaje sería algo como 96%'
			/>
		</div>
	);
};
