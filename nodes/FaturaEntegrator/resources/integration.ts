import { INodeProperties } from 'n8n-workflow';

export const integrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['integration'] } },
		options: [
			{ name: 'Get Invoice Integration', value: 'getInvoiceIntegration', action: 'Get an invoice integration' },
			{ name: 'Get Many Invoice Integrations', value: 'getAllInvoiceIntegrations', action: 'Get many invoice integrations' },
			{ name: 'Get Many Sale Channels', value: 'getAllSaleChannels', action: 'Get many sale channels' },
			{ name: 'Get Sale Channel', value: 'getSaleChannel', action: 'Get a sale channel' },
		],
		default: 'getAllSaleChannels',
		required: true,
	},
];

export const integrationFields: INodeProperties[] = [
	// ── Get Invoice Integration fields ──
	{
		displayName: 'Integration ID',
		name: 'integrationId',
		type: 'string',
		displayOptions: { show: { resource: ['integration'], operation: ['getInvoiceIntegration'] } },
		default: '',
		required: true,
		description: 'ID of the invoice integration. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
	},

	// ── Get Sale Channel fields ──
	{
		displayName: 'Sale Channel ID',
		name: 'saleChannelId',
		type: 'string',
		displayOptions: { show: { resource: ['integration'], operation: ['getSaleChannel'] } },
		default: '',
		required: true,
		description: 'ID of the sale channel. <a href="https://dev.faturaentegrator.com">API Docs</a>.',
	},

	// ── Get All fields ──
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['integration'], operation: ['getAllInvoiceIntegrations', 'getAllSaleChannels'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];
