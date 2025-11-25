import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionTypes, IExecuteFunctions} from 'n8n-workflow';

export class VerifyEmail implements INodeType {
	description: INodeTypeDescription = {
        displayName: 'Verify Email Programmatic',
        name: 'VerifyEmailProgrammatic',
        icon: 'file:email.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["email"]}}',  // ← Cambiar a parámetro que existe
        description: 'Verify an email address using a third-party API',
        
        defaults: { 
            name: 'Verify Email Programmatic',
        },
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        
        credentials: [
            {
                name: 'verifyEmailApi',
                required: true,
            },
        ],     
		
        properties: [
            {
                displayName: 'Email Address',
                name: 'email',
                type: 'string',
                placeholder: 'user@example.com',  // ← Mejor placeholder
                default: '',
                required: true,
                description: 'The email address to verify',
            },           
        ]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const email = this.getNodeParameter('email', i) as string;
                const credentials = await this.getCredentials('verifyEmailApi');
                
                const apiUrl = credentials.apiUrl as string;
                const apiKey = credentials.apiKey as string;

                const response = await this.helpers.httpRequest({
                    method: 'GET',
                    url: apiUrl,
                    qs: {
                        email: email,
                        api_key: apiKey,
                    },
                    headers: {
                        Accept: 'application/json',
                    }, 
                    json: true,
                }) as IDataObject;

                returnData.push({
                    json: {
                        email: email,
                        score: response.score,
                        reason: response.reason || 'N/A',
                    },
                    pairedItem: i,
                });

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            email: this.getNodeParameter('email', i) as string,
                            error: error.message,
                            success: false,
                        },
                        pairedItem: i,
                    });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
	}
}