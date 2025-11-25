import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import dotenv from 'dotenv';

dotenv.config();

export class VerifyEmail implements INodeType {
	description: INodeTypeDescription = {
        displayName: 'Verify Email',
        name: 'VerifyEmail',
        icon: 'file:email.png',
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
                name: 'VerifyEmailApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.nasa.gov',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },        
		properties: [
		// Resources and operations will go here
		]
	};
}