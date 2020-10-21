import {AnyDbPublisher} from './anydb-publisher';
import {DefaultPublisher} from './default-publisher';
import {DynamoDbPublisher} from './dynamodb-publisher';

jest.mock('./default-publisher');
jest.mock('./dynamodb-publisher');

describe('AnyPublisher', () => {

    it('should instantiate default when unknown', async () => {
        const publisherAttributes = {options: {driver: 'unknown'}};
        const publishMock = jest.fn();
        // @ts-ignore
        DefaultPublisher.mockImplementationOnce(() => ({publish: publishMock}));

        await new AnyDbPublisher(publisherAttributes as any).publish();

        expect(publishMock).toHaveBeenCalled();
    });

    it('should instantiate dynamo when driver is dynamo', async () => {
        const publisherAttributes = {options: {driver: 'DynaMoDb'}};
        const publishMock = jest.fn();
        // @ts-ignore
        DynamoDbPublisher.mockImplementationOnce(() => ({publish: publishMock}));

        await new AnyDbPublisher(publisherAttributes as any).publish();

        expect(publishMock).toHaveBeenCalled();

    });

});
