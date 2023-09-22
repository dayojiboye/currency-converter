export type ApiEndpints = Readonly<{
	getExchangeRate: string;
}>;

const apiEndpoints: ApiEndpints = {
	getExchangeRate: "https://api.exchangerate.host/convert",
};

export default apiEndpoints;
