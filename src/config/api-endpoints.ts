export type ApiEndpints = Readonly<{
	getExchangeRate: string;
}>;

const apiEndpoints: ApiEndpints = {
	getExchangeRate: "https://api.apilayer.com/exchangerates_data/convert",
};

export default apiEndpoints;
