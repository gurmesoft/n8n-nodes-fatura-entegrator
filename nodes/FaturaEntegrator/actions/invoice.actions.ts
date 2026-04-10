import { IExecuteFunctions } from 'n8n-workflow';

export async function executeInvoiceActions(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	credentials: any,
): Promise<any> {
	const baseUrl = 'https://app.faturaentegrator.com/api';

	if (operation === 'create') {
		const body: Record<string, any> = {
			sale_channel_id: this.getNodeParameter('sale_channel_id', i),
			invoice_integration_id: this.getNodeParameter('invoice_integration_id', i),
			type: this.getNodeParameter('type', i),
			currency: this.getNodeParameter('currency', i),
		};

		// Customer
		const customerCollection = this.getNodeParameter('customer', i) as any;
		if (customerCollection?.customerDetails) {
			const details = Array.isArray(customerCollection.customerDetails)
				? customerCollection.customerDetails[0]
				: customerCollection.customerDetails;
			if (details) {
				// If customer ID is provided and > 0, use it; otherwise send inline details
				if (details.id && details.id > 0) {
					body.customer = { id: details.id };
				} else {
					const customerData = { ...details };
					delete customerData.id;
					body.customer = customerData;
				}
			}
		}

		// Lines
		const linesCollection = this.getNodeParameter('lines', i) as any;
		if (linesCollection?.lineItems && Array.isArray(linesCollection.lineItems)) {
			body.lines = linesCollection.lineItems.map((line: any) => {
				const lineData: Record<string, any> = { ...line };
				// Remove empty discount fields
				if (!lineData.discount_type) {
					delete lineData.discount_type;
					delete lineData.discount;
				}
				if (lineData.id === 0) delete lineData.id;
				return lineData;
			});
		}

		// Additional fields
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
		Object.keys(additionalFields).forEach((key) => {
			if (additionalFields[key] !== '' && additionalFields[key] !== null && additionalFields[key] !== undefined) {
				body[key] = additionalFields[key];
			}
		});

		// Internet sale
		const isInternetSale = this.getNodeParameter('is_internet_sale', i, false) as boolean;
		if (isInternetSale) {
			body.is_internet_sale = true;
			const internetSale = this.getNodeParameter('internet_sale', i, {}) as any;
			if (internetSale?.details) {
				const details = Array.isArray(internetSale.details) ? internetSale.details[0] : internetSale.details;
				if (details) body.internet_sale = details;
			}
		}

		// Shipment
		const isNeedShipment = this.getNodeParameter('is_need_shipment', i, false) as boolean;
		if (isNeedShipment) {
			body.is_need_shipment = true;
			const shipment = this.getNodeParameter('shipment', i, {}) as any;
			if (shipment?.details) {
				const details = Array.isArray(shipment.details) ? shipment.details[0] : shipment.details;
				if (details) body.shipment = details;
			}
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'POST',
			url: `${baseUrl}/invoices`,
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const invoiceId = this.getNodeParameter('invoiceId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url: `${baseUrl}/invoices/${invoiceId}`,
			json: true,
		});
	} else if (operation === 'getAll') {
		const limit = this.getNodeParameter('limit', i) as number;
		let url = `${baseUrl}/invoices?limit=${limit}`;

		const filters = this.getNodeParameter('filters', i, {}) as any;
		if (filters.customerName) {
			url += `&filters[$or][0][receiver][name][$eq]=${encodeURIComponent(filters.customerName)}`;
		}
		if (filters.orderId) {
			url += `&filters[$or][0][order_id][$eq]=${encodeURIComponent(filters.orderId)}`;
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'GET',
			url,
			json: true,
		});
	} else if (operation === 'delete') {
		const invoiceId = this.getNodeParameter('invoiceId', i) as string;
		return await this.helpers.httpRequestWithAuthentication.call(this, 'faturaEntegratorApi', {
			method: 'DELETE',
			url: `${baseUrl}/invoices/${invoiceId}`,
			json: true,
		});
	}
}
