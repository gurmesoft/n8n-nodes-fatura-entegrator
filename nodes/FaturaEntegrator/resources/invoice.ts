import { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['invoice'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a new invoice', action: 'Create an invoice' },
			{ name: 'Delete', value: 'delete', description: 'Delete an invoice', action: 'Delete an invoice' },
			{ name: 'Get', value: 'get', description: 'Get an invoice by ID', action: 'Get an invoice' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many invoices', action: 'Get many invoices' },
		],
		default: 'getAll',
		required: true,
	},
];

export const invoiceFields: INodeProperties[] = [
	// ── Create fields ──
	{
		displayName: 'Sale Channel Name or ID',
		name: 'sale_channel_id',
		type: 'options',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		typeOptions: { loadOptionsMethod: 'getSaleChannels' },
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Invoice Integration Name or ID',
		name: 'invoice_integration_id',
		type: 'options',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		typeOptions: { loadOptionsMethod: 'getInvoiceIntegrations' },
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		options: [
			{ name: 'Iade', value: 'IADE' },
			{ name: 'Ihrac Kayitli', value: 'IHRACKAYITLI' },
			{ name: 'Istisna', value: 'ISTISNA' },
			{ name: 'Konaklama Vergisi', value: 'KONAKLAMAVERGISI' },
			{ name: 'Ozel Matrah', value: 'OZELMATRAH' },
			{ name: 'Satis', value: 'SATIS' },
			{ name: 'Tevkifat', value: 'TEVKIFAT' },
			{ name: 'Tevkifat Iade', value: 'TEVKIFATIADE' },
		],
		default: 'SATIS',
		required: true,
		description: 'Invoice type',
	},
	{
		displayName: 'Customer',
		name: 'customer',
		type: 'fixedCollection',
		typeOptions: { multipleValues: false },
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		default: {},
		required: true,
		description: 'Customer information. Provide either an existing customer ID or inline details.',
		options: [
			{
				name: 'customerDetails',
				displayName: 'Customer Details',
				values: [
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
						displayName: 'Customer ID',
						name: 'id',
						type: 'number',
						default: 0,
						description: 'Existing customer ID (leave 0 to use inline details)',
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
						displayName: 'Name',
						name: 'name',
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
						displayName: 'Surname',
						name: 'surname',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Tax Number',
						name: 'tax_number',
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
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Person',
								value: 'person',
							},
							{
								name: 'Company',
								value: 'company',
							},
						],
						default: 'person',
					},
			],
			},
		],
	},
	{
		displayName: 'Lines',
		name: 'lines',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		default: {},
		required: true,
		description: 'Invoice line items',
		options: [
			{
				name: 'lineItems',
				displayName: 'Line Item',
				values: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Discount',
						name: 'discount',
						type: 'number',
						default: 0
					},
					{
						displayName: 'Discount Type',
						name: 'discount_type',
						type: 'options',
						options: [
							{
								name: 'None',
								value: '',
							},
							{
								name: 'Amount',
								value: 'amount',
							},
							{
								name: 'Percentage',
								value: 'percentage',
							},
						],
						default: '',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
							required:	true,
					},
					{
						displayName: 'Product ID',
						name: 'id',
						type: 'number',
						default: 0,
						description: 'Existing product ID (optional)',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
							required:	true,
					},
					{
						displayName: 'SKU',
						name: 'sku',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Tax Rate (KDV	%)',
						name: 'tax_rate',
						type: 'options',
						options: [
							{
								name: '%0',
								value: 0
							},
							{
								name: '%1',
								value: 1
							},
							{
								name: '%8',
								value: 8
							},
							{
								name: '%10',
								value: 10
							},
							{
								name: '%18',
								value: 18
							},
							{
								name: '%20',
								value: 20
							},
					],
						default: 20
					},
					{
						displayName: 'Unit',
						name: 'unit',
						type: 'options',
						options: [
							{
								name: 'Adet (C62)',
								value: 'C62',
							},
							{
								name: 'Ay (MON)',
								value: 'MON',
							},
							{
								name: 'Gun (DAY)',
								value: 'DAY',
							},
							{
								name: 'Kg (KGM)',
								value: 'KGM',
							},
							{
								name: 'Kutu (BX)',
								value: 'BX',
							},
							{
								name: 'Litre (LTR)',
								value: 'LTR',
							},
							{
								name: 'Metre (MTR)',
								value: 'MTR',
							},
							{
								name: 'Paket (PA)',
								value: 'PA',
							},
							{
								name: 'Saat (HUR)',
								value: 'HUR',
							},
							{
								name: 'Set (SET)',
								value: 'SET',
							},
							{
								name: 'Yil (ANN)',
								value: 'ANN',
							},
					],
						default: 'C62',
					},
					{
						displayName: 'Unit Price',
						name: 'unit_price',
						type: 'number',
						default: 0,
							required:	true,
					},
			],
			},
		],
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		options: [
			{ name: 'TRY', value: 'TRY' },
			{ name: 'USD', value: 'USD' },
			{ name: 'EUR', value: 'EUR' },
			{ name: 'GBP', value: 'GBP' },
		],
		default: 'TRY',
		description: 'Invoice currency',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		options: [
			{ displayName: 'Callback URL', name: 'callback_url', type: 'string', default: '', description: 'Webhook URL for invoice status updates' },
			{ displayName: 'Cash Sale', name: 'cash_sale', type: 'boolean', default: false },
			{ displayName: 'Currency Rate', name: 'currency_rate', type: 'number', typeOptions: { numberPrecision: 4 }, default: 1 },
			{ displayName: 'Due Date', name: 'due_date', type: 'dateTime', default: '' },
			{ displayName: 'Issue Date', name: 'issue_date', type: 'dateTime', default: '' },
			{ displayName: 'Issue Time', name: 'issue_time', type: 'string', default: '', placeholder: 'HH:mm', description: 'Issue time in HH:mm format' },
			{ displayName: 'Order Created At', name: 'order_created_at', type: 'dateTime', default: '' },
			{ displayName: 'Order Display ID', name: 'order_d_id', type: 'string', default: '' },
			{ displayName: 'Order ID', name: 'order_id', type: 'string', default: '' },
			{ displayName: 'Payment Date', name: 'payment_date', type: 'dateTime', default: '' },
			{ displayName: 'Waybill Date', name: 'waybill_date', type: 'dateTime', default: '' },
			{ displayName: 'Waybill Number', name: 'waybill_number', type: 'string', default: '' },
		],
	},
	{
		displayName: 'Internet Sale',
		name: 'is_internet_sale',
		type: 'boolean',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		default: false,
		description: 'Whether this is an internet sale',
	},
	{
		displayName: 'Internet Sale Details',
		name: 'internet_sale',
		type: 'fixedCollection',
		typeOptions: { multipleValues: false },
		displayOptions: { show: { resource: ['invoice'], operation: ['create'], is_internet_sale: [true] } },
		default: {},
		options: [
			{
				name: 'details',
				displayName: 'Details',
				values: [
					{ displayName: 'Web Address', name: 'web_address', type: 'string', default: '' },
					{
						displayName: 'Payment Method',
						name: 'payment_method',
						type: 'options',
						options: [
							{ name: 'Cash on Delivery', value: 'cash_on_delivery' },
							{ name: 'Credit/Debit Card', value: 'credit_or_debit' },
							{ name: 'Direct Transfer', value: 'direct_transfer' },
							{ name: 'Other', value: 'other' },
							{ name: 'Payment Agent', value: 'payment_agent' },
						],
						default: 'credit_or_debit',
					},
					{ displayName: 'Payment Platform', name: 'payment_platform', type: 'string', default: '' },
					{ displayName: 'Payment Date', name: 'payment_date', type: 'dateTime', default: '' },
				],
			},
		],
	},
	{
		displayName: 'Needs Shipment',
		name: 'is_need_shipment',
		type: 'boolean',
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		default: false,
		description: 'Whether this invoice needs shipment info',
	},
	{
		displayName: 'Shipment Details',
		name: 'shipment',
		type: 'fixedCollection',
		typeOptions: { multipleValues: false },
		displayOptions: { show: { resource: ['invoice'], operation: ['create'], is_need_shipment: [true] } },
		default: {},
		options: [
			{
				name: 'details',
				displayName: 'Details',
				values: [
					{
						displayName: 'Company Tax Number',
						name: 'company_tax_number',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Company Title',
						name: 'company_title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Courier Name',
						name: 'courier_name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Courier Tax Number',
						name: 'courier_tax_number',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Delivery Date',
						name: 'delivery_date',
						type: 'dateTime',
						default: '',
					},
				],
			},
		],
	},

	// ── Get fields ──
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		displayOptions: { show: { resource: ['invoice'], operation: ['get'] } },
		default: '',
		required: true,
	},

	// ── Delete fields ──
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		displayOptions: { show: { resource: ['invoice'], operation: ['delete'] } },
		default: '',
		required: true,
	},

	// ── Get All fields ──
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['invoice'], operation: ['getAll'] } },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['getAll'] } },
		options: [
			{ displayName: 'Customer Name', name: 'customerName', type: 'string', default: '', description: 'Filter by customer name' },
			{ displayName: 'Order ID', name: 'orderId', type: 'string', default: '', description: 'Filter by order ID' },
		],
	},
];
