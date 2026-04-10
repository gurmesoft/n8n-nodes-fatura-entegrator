import type {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class FaturaEntegratorTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fatura Entegratör Trigger',
		name: 'faturaEntegratorTrigger',
		icon: 'file:faturaentegrator.svg',
		group: ['trigger'],
		version: 1,
		description: 'Triggers when invoice status changes via callback webhook',
		defaults: {
			name: 'Fatura Entegratör Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'faturaEntegratorApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Info',
				name: 'info',
				type: 'notice',
				default: '',
				description: 'Use this webhook URL as the callback_url when creating invoices. The trigger will fire when the invoice status changes (completed, failed, etc.).',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body as IDataObject;

		return {
			workflowData: [
				[
					{
						json: {
							...body,
							timestamp: new Date().toISOString(),
							webhookReceived: true,
						},
					},
				],
			],
		};
	}
}
