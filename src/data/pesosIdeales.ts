interface IPesosIdeales {
	[key: number]: {
		ideal: number;
		idealHigh: number;
		idealLow: number;
	};
}

export const pesosIdeales: IPesosIdeales = {
	/* 
        Ideal = Peso Ideal 
        IdealHigh = Peso Ideal más el 10%
        IdealLow = Peso Ideal menos el 10%
    */
	0: {
		ideal: 40,
		idealHigh: 44,
		idealLow: 36,
	},
	1: {
		ideal: 61.6,
		idealHigh: 67.76,
		idealLow: 55.44,
	},
	2: {
		ideal: 83.2,
		idealHigh: 91.52,
		idealLow: 74.88,
	},
	3: {
		ideal: 104.8,
		idealHigh: 115.28,
		idealLow: 94.32,
	},
	4: {
		ideal: 126.4,
		idealHigh: 139,
		idealLow: 113.8,
	},
	5: {
		ideal: 148,
		idealHigh: 162.8,
		idealLow: 133.2,
	},
	6: {
		ideal: 169.6,
		idealHigh: 186.6,
		idealLow: 152.6,
	},
	7: {
		ideal: 191.2,
		idealHigh: 210.32,
		idealLow: 171.04,
	},
	8: {
		ideal: 212.8,
		idealHigh: 234.1,
		idealLow: 191.5,
	},
	9: {
		ideal: 234.4,
		idealHigh: 257.8,
		idealLow: 211,
	},
	10: {
		ideal: 256,
		idealHigh: 282,
		idealLow: 230,
	},
	11: {
		ideal: 278,
		idealHigh: 305,
		idealLow: 250,
	},
	12: {
		ideal: 299,
		idealHigh: 329,
		idealLow: 269,
	},
	13: {
		ideal: 321,
		idealHigh: 353,
		idealLow: 289,
	},
	14: {
		ideal: 342,
		idealHigh: 377,
		idealLow: 308,
	},
	15: {
		ideal: 364,
		idealHigh: 400,
		idealLow: 328,
	},
	16: {
		ideal: 386,
		idealHigh: 424,
		idealLow: 347,
	},
	17: {
		ideal: 407,
		idealHigh: 448,
		idealLow: 366,
	},
	18: {
		ideal: 429,
		idealHigh: 472,
		idealLow: 386,
	},
	19: {
		ideal: 450,
		idealHigh: 495,
		idealLow: 405,
	},
	20: {
		ideal: 472,
		idealHigh: 519,
		idealLow: 425,
	},
	21: {
		ideal: 494,
		idealHigh: 543,
		idealLow: 444,
	},
	22: {
		ideal: 515,
		idealHigh: 567,
		idealLow: 464,
	},
	23: {
		ideal: 537,
		idealHigh: 590,
		idealLow: 483,
	},
	24: {
		ideal: 558,
		idealHigh: 614,
		idealLow: 503,
	},
	25: {
		ideal: 580,
		idealHigh: 638,
		idealLow: 522,
	},
};
