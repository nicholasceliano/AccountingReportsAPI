import { Config } from "./models/config";

export const prodConfig: Config = {
	apiVersion: 'taffy',
	clientHostname: 'http://localhost:4200',
	env: 'prod',
	hostname: 'http://localhost:3000',
	port: 3000,
};