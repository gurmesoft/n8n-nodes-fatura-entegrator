import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
				action: 'Create a customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
				action: 'Delete a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer by ID',
				action: 'Get a customer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many customers',
				action: 'Get many customers',
			},
		],
		default: 'getAll',
		required: true,
	},
];

export const customerFields: INodeProperties[] = [
	// ── Create fields ──
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		default: '',
		required: true,
		description: 'Customer first name',
	},
	{
		displayName: 'Surname',
		name: 'surname',
		type: 'string',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		default: '',
		required: true,
		description: 'Customer last name',
	},
	{
		displayName: 'Tax Number',
		name: 'tax_number',
		type: 'string',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		default: '',
		required: true,
		description: 'Tax identification number (TC Kimlik No or Vergi No)',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		options: [
			{ name: 'Person (Gerçek Kişi)', value: 'person' },
			{ name: 'Company (Tüzel Kişi)', value: 'company' },
		],
		default: 'person',
		description: 'Customer type',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'TÜRKİYE',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
			},
			{
				displayName: 'IBAN',
				name: 'iban',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postcode',
				name: 'postcode',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tax Office',
				name: 'tax_office',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Company title (for company type)',
			},
		],
	},

	// ── Get fields ──
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		displayOptions: { show: { resource: ['customer'], operation: ['get'] } },
		default: '',
		required: true,
		description: 'ID of the customer to retrieve',
	},

	// ── Delete fields ──
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		displayOptions: { show: { resource: ['customer'], operation: ['delete'] } },
		default: '',
		required: true,
		description: 'ID of the customer to delete',
	},

	// ── Get All fields ──
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
];
