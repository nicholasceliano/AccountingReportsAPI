import { devConfig } from "./config.dev";
import { prodConfig } from "./config.prod";

export const config = () => {
	switch (process.env.NODE_ENV) {
		case 'dev':
			return devConfig;

		case 'prod':
			return prodConfig;

		default:
			return devConfig;
	}
};
