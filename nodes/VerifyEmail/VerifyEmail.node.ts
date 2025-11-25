import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';


export class VerifyEmail implements INodeType {
	description: INodeTypeDescription = {
        displayName: 'Verify Email',
        name: 'verifyEmail',
        icon: 'file:email.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Verify an email address using a third-party API',
        defaults: {
            name: 'Verify Email',
        },
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [
            {
                name: 'verifyEmailApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: '={{$credentials.apiUrl}}',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },        
		properties: [
            {
                displayName: 'Email Address',
                name: 'email',
                type: 'string',
                placeholder: 'Enter the email address to verify',
                noDataExpression: true,
                default: '',
                routing: {
                    request: {
                        qs: {
                            email: '={{ $value }}',
                        }
                    }
                }
            },           
        ],
		usableAsTool: true
	};
}