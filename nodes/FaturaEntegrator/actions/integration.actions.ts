import { IExecuteFunctions } from 'n8n-workflow';

export async function executeIntegrationActions(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	credentials: any,
): Promise<any> {
	const baseUrl = 'https://app.faturaentegrator.com/api';

	if (operation === 'getAllInvoiceIntegrations') {
		const limit = this.getNodeParameter('limit', i) as number;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/integrations/invoice?limit=${limit}`,
			json: true,
		});
	} else if (operation === 'getInvoiceIntegration') {
		const integrationId = this.getNodeParameter('integrationId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/integrations/invoice/${integrationId}`,
			json: true,
		});
	} else if (operation === 'getAllSaleChannels') {
		const limit = this.getNodeParameter('limit', i) as number;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/integrations/sale-channel?limit=${limit}`,
			json: true,
		});
	} else if (operation === 'getSaleChannel') {
		const saleChannelId = this.getNodeParameter('saleChannelId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/integrations/sale-channel/${saleChannelId}`,
			json: true,
		});
	}
}
