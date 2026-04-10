import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['product'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a new product', action: 'Create a product' },
			{ name: 'Delete', value: 'delete', description: 'Delete a product', action: 'Delete a product' },
			{ name: 'Get', value: 'get', description: 'Get a product by ID', action: 'Get a product' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many products', action: 'Get many products' },
		],
		default: 'getAll',
		required: true,
	},
];

export const productFields: INodeProperties[] = [
	// ── Create fields ──
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: { show: { resource: ['product'], operation: ['create'] } },
		default: '',
		required: true,
	},
	{
		displayName: 'Unit Price',
		name: 'unit_price',
		type: 'number',
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: ['product'], operation: ['create'] } },
		default: 0,
		required: true,
	},
	{
		displayName: 'Tax Rate (KDV %)',
		name: 'tax_rate',
		type: 'options',
		displayOptions: { show: { resource: ['product'], operation: ['create'] } },
		options: [
			{ name: '%0', value: 0 },
			{ name: '%1', value: 1 },
			{ name: '%8', value: 8 },
			{ name: '%10', value: 10 },
			{ name: '%18', value: 18 },
			{ name: '%20', value: 20 },
		],
		default: 20,
	},
	{
		displayName: 'Unit',
		name: 'unit',
		type: 'options',
		displayOptions: { show: { resource: ['product'], operation: ['create'] } },
		options: [
			{ name: 'Adet (C62)', value: 'C62' },
			{ name: 'Ay (MON)', value: 'MON' },
			{ name: 'Gun (DAY)', value: 'DAY' },
			{ name: 'Kg (KGM)', value: 'KGM' },
			{ name: 'Kutu (BX)', value: 'BX' },
			{ name: 'Litre (LTR)', value: 'LTR' },
			{ name: 'Metre (MTR)', value: 'MTR' },
			{ name: 'Paket (PA)', value: 'PA' },
			{ name: 'Saat (HUR)', value: 'HUR' },
			{ name: 'Set (SET)', value: 'SET' },
			{ name: 'Yil (ANN)', value: 'ANN' },
		],
		default: 'C62',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['product'], operation: ['create'] } },
		options: [
			{ displayName: 'Quantity', name: 'quantity', type: 'number', default: 1 },
			{ displayName: 'SKU', name: 'sku', type: 'string', default: '' },
		],
	},

	// ── Get fields ──
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		displayOptions: { show: { resource: ['product'], operation: ['get'] } },
		default: '',
		required: true,
	},

	// ── Delete fields ──
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		displayOptions: { show: { resource: ['product'], operation: ['delete'] } },
		default: '',
		required: true,
	},

	// ── Get All fields ──
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['product'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];
