import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
	ServiciosSlice,
	createServiciosSlice,
} from './servicio.slice';
import { PartosSlice, createPartosSlice } from './partos.slice';

type ShareState = ServiciosSlice & PartosSlice;

export const useReproduccionStore = create<ShareState>()(
	devtools((...a) => ({
		...createPartosSlice(...a),
		...createServiciosSlice(...a),
	}))
);
