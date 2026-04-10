import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FaturaEntegratorApi implements ICredentialType {
	name = 'faturaEntegratorApi';
	displayName = 'Fatura Entegratör API';
	documentationUrl = 'https://dev.faturaentegrator.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Bearer API key from Fatura Entegratör. Get it from <a href="https://app.faturaentegrator.com">app.faturaentegrator.com</a> panel.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.faturaentegrator.com/api',
			url: '/helpers/profile',
			method: 'GET',
		},
	};
}
