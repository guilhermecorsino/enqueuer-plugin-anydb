import {InputPublisherModel as PublisherModel, Publisher} from 'enqueuer';
import {DynamoDbPublisher} from './dynamodb-publisher';
import {DefaultPublisher} from './default-publisher';

export class AnyDbPublisher extends Publisher {
    private static readonly dynamoDbDriver = 'DynamoDB';
    private readonly publisherInstance: Publisher;

    public constructor(publisherProperties: PublisherModel) {
        super(publisherProperties);

        const hook = (name: string, data: any) => this.executeHookEvent(name, data);
        if (AnyDbPublisher.dynamoDbDriver.toLowerCase() === (this.options.driver || '').toLowerCase()) {
            this.publisherInstance = new DynamoDbPublisher(publisherProperties, hook);
        } else {
            this.publisherInstance = new DefaultPublisher(publisherProperties, hook);
        }
    }

    public async publish(): Promise<any> {
        return this.publisherInstance.publish();
    }
}
