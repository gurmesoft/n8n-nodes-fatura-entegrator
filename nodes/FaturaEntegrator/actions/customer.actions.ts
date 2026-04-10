import { IExecuteFunctions } from 'n8n-workflow';

export async function executeCustomerActions(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	credentials: any,
): Promise<any> {
	const baseUrl = 'https://app.faturaentegrator.com/api';

	if (operation === 'create') {
		const body: Record<string, any> = {
			name: this.getNodeParameter('name', i) as string,
			surname: this.getNodeParameter('surname', i) as string,
			tax_number: this.getNodeParameter('tax_number', i) as string,
			type: this.getNodeParameter('type', i) as string,
		};

		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
		Object.assign(body, additionalFields);

		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'POST',
			url: `${baseUrl}/customers`,
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/customers/${customerId}`,
			json: true,
		});
	} else if (operation === 'getAll') {
		const limit = this.getNodeParameter('limit', i) as number;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/customers?limit=${limit}`,
			json: true,
		});
	} else if (operation === 'delete') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'DELETE',
			url: `${baseUrl}/customers/${customerId}`,
			json: true,
		});
	}
}
