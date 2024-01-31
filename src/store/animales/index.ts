import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AnimalesSlice, createAnimalesSlice } from './animales.slice';
import { RazasSlice, createRazasSlice } from './razas.slice';
import { GruposSlice, createGruposSlice } from './grupos.slice';
import {
	estadosReproductivosSlice,
	createEstadosReproductivosSlice,
} from './estadosReproductivos.slice';
import {
	AlimentacionSlice,
	createAlimentacionSlice,
} from './alimentacion.slice';
import { SanidadSlice, createSanidadSlice } from './sanidad.slice';

type ShareState = AnimalesSlice &
	RazasSlice &
	GruposSlice &
	estadosReproductivosSlice &
	AlimentacionSlice &
	SanidadSlice;

export const useAnimalesStore = create<ShareState>()(
	devtools((...a) => ({
		...createAnimalesSlice(...a),
		...createRazasSlice(...a),
		...createGruposSlice(...a),
		...createEstadosReproductivosSlice(...a),
		...createAlimentacionSlice(...a),
		...createSanidadSlice(...a),
	}))
);
