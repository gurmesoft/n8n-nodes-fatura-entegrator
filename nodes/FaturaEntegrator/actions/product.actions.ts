import { IExecuteFunctions } from 'n8n-workflow';

export async function executeProductActions(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	credentials: any,
): Promise<any> {
	const baseUrl = 'https://app.faturaentegrator.com/api';

	if (operation === 'create') {
		const body: Record<string, any> = {
			name: this.getNodeParameter('name', i) as string,
			unit_price: this.getNodeParameter('unit_price', i) as number,
			tax_rate: this.getNodeParameter('tax_rate', i),
			unit: this.getNodeParameter('unit', i) as string,
		};

		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
		Object.assign(body, additionalFields);

		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'POST',
			url: `${baseUrl}/products`,
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const productId = this.getNodeParameter('productId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/products/${productId}`,
			json: true,
		});
	} else if (operation === 'getAll') {
		const limit = this.getNodeParameter('limit', i) as number;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/products?limit=${limit}`,
			json: true,
		});
	} else if (operation === 'delete') {
		const productId = this.getNodeParameter('productId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'DELETE',
			url: `${baseUrl}/products/${productId}`,
			json: true,
		});
	}
}
