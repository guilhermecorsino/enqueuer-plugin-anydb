import {InputPublisherModel as PublisherModel, Logger, Publisher} from 'enqueuer';
import * as AWS from 'aws-sdk';

export class DynamoDbPublisher extends Publisher {
    private readonly docClient: AWS.DynamoDB.DocumentClient;
    private readonly dynamodb: AWS.DynamoDB;

    public constructor(publisherProperties: PublisherModel, hook: any) {
        super(publisherProperties);
        this.hook = hook;
        AWS.config.update({...this.options});

        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.dynamodb = new AWS.DynamoDB();
    }

    public async publish(): Promise<any> {
        return new Promise((resolve, reject) => {
            let client: AWS.DynamoDB.DocumentClient | AWS.DynamoDB = this.docClient;
            if (this.command.toLowerCase().includes('table')) {
                Logger.info(`Operation on table structure`);
                client = this.dynamodb;
            }

            // @ts-ignore
            client[this.command](this.params, (error: Error, data: any) => {
                if (error) {
                    Logger.error(error.toString());
                    reject(error);
                    return;
                }
                Logger.trace(`Query completed: ${data}`);
                this.hook('onCommandCompleted', data);
                resolve(data);
            });
        });
    }
}
