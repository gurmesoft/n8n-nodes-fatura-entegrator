import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import {
	NodeOperationError,
	NodeConnectionType,
	ApplicationError,
} from 'n8n-workflow';

import { customerOperations, customerFields } from './resources/customer';
import { invoiceOperations, invoiceFields } from './resources/invoice';
import { productOperations, productFields } from './resources/product';
import { integrationOperations, integrationFields } from './resources/integration';

import { executeCustomerActions } from './actions/customer.actions';
import { executeInvoiceActions } from './actions/invoice.actions';
import { executeProductActions } from './actions/product.actions';
import { executeIntegrationActions } from './actions/integration.actions';

export class FaturaEntegrator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fatura Entegratör',
		name: 'faturaEntegrator',
		icon: 'file:faturaentegrator.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Fatura Entegratör API for invoice management',
		documentationUrl: 'https://dev.faturaentegrator.com',
		defaults: {
			name: 'Fatura Entegratör ',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'faturaEntegratorApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
						description: 'Manage customers. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
					},
					{
						name: 'Integration',
						value: 'integration',
						description: 'View invoice integrations and sale channels. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
					},
					{
						name: 'Invoice',
						value: 'invoice',
						description: 'Manage invoices. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
					},
					{
						name: 'Product',
						value: 'product',
						description: 'Manage products. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
					},
				],
				default: 'invoice',
				required: true,
			},
			...customerOperations,
			...customerFields,
			...invoiceOperations,
			...invoiceFields,
			...productOperations,
			...productFields,
			...integrationOperations,
			...integrationFields,
		],
	};

	methods = {
		loadOptions: {
			getSaleChannels: this.getSaleChannels,
			getInvoiceIntegrations: this.getInvoiceIntegrations,
		},
	};

	async getSaleChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const baseUrl = 'https://app.faturaentegrator.com/api';

		try {
			const responseData = await this.helpers.httpRequestWithAuthentication.call(
				this, 'faturaEntegratorApi',
				{ method: 'GET', url: `${baseUrl}/integrations/sale-channel`, json: true },
			);

			const items = Array.isArray(responseData) ? responseData
				: responseData?.data && Array.isArray(responseData.data) ? responseData.data
				: responseData?.data?.data && Array.isArray(responseData.data.data) ? responseData.data.data
				: [];

			return items.map((item: any) => ({
				name: item.sale_channel || item.name || item.title || `Channel ${item.id}`,
				value: item.id?.toString() || '',
			}));
		} catch (error) {
			throw new ApplicationError(`Failed to load sale channels: ${(error as Error).message}`);
		}
	}

	async getInvoiceIntegrations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const baseUrl = 'https://app.faturaentegrator.com/api';

		try {
			const responseData = await this.helpers.httpRequestWithAuthentication.call(
				this, 'faturaEntegratorApi',
				{ method: 'GET', url: `${baseUrl}/integrations/invoice`, json: true },
			);

			const items = Array.isArray(responseData) ? responseData
				: responseData?.data && Array.isArray(responseData.data) ? responseData.data
				: responseData?.data?.data && Array.isArray(responseData.data.data) ? responseData.data.data
				: [];

			return items.map((item: any) => ({
				name: item.name || item.title || `Integration ${item.id}`,
				value: item.id?.toString() || '',
			}));
		} catch (error) {
			throw new ApplicationError(`Failed to load invoice integrations: ${(error as Error).message}`);
		}
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('faturaEntegratorApi');

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				let responseData;

				if (resource === 'customer') {
					responseData = await executeCustomerActions.call(this, operation, i, credentials);
				} else if (resource === 'invoice') {
					responseData = await executeInvoiceActions.call(this, operation, i, credentials);
				} else if (resource === 'product') {
					responseData = await executeProductActions.call(this, operation, i, credentials);
				} else if (resource === 'integration') {
					responseData = await executeIntegrationActions.call(this, operation, i, credentials);
				}

				returnData.push({
					json: responseData || {},
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), (error as Error).message, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
