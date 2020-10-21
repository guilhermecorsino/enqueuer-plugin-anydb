import * as AWS from 'aws-sdk';
import {DynamoDbPublisher} from './dynamodb-publisher';

jest.mock('aws-sdk');

describe('DynamoDbPublisher', () => {
    it('should instantiate both client and dynamo instances', async () => {
        // @ts-ignore
        AWS.DynamoDB.mockImplementationOnce(() => ({}));
        // @ts-ignore
        AWS.DynamoDB.DocumentClient.mockImplementationOnce(() => ({}));

        const publisherAttributes = {options: {region: 'far'}};
        const updateMock = jest.fn();
        // @ts-ignore
        AWS.config.update.mockImplementationOnce(updateMock);

        const dynamoDbPublisher = new DynamoDbPublisher(publisherAttributes as any, () => true);

        expect(updateMock).toHaveBeenCalledWith(publisherAttributes.options);
        expect(AWS.DynamoDB).toHaveBeenCalled();
        expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalled();
    });

    it('should call table methods', async () => {
        const methodMock = jest.fn((params, cb) => cb(null, 'args'));
        // @ts-ignore
        AWS.DynamoDB.mockImplementationOnce(() => ({createTable: methodMock}));

        // @ts-ignore
        AWS.config.update.mockImplementationOnce(jest.fn());

        const response = await new DynamoDbPublisher({options: {region: 'far'}, command: 'createTable', params: 'params'} as any,
            () => true).publish();

        expect(methodMock).toHaveBeenCalledWith('params', expect.any(Function));
        expect(response).toBe('args');
    });

    it('should call item methods', async () => {
        const methodMock = jest.fn((params, cb) => cb(null, 'args'));
        // @ts-ignore
        AWS.DynamoDB.DocumentClient.mockImplementationOnce(() => ({create: methodMock}));

        // @ts-ignore
        AWS.config.update.mockImplementationOnce(jest.fn());

        const response = await new DynamoDbPublisher({options: {region: 'far'}, command: 'create', params: 'params'} as any,
            () => true).publish();

        expect(methodMock).toHaveBeenCalledWith('params', expect.any(Function));
        expect(response).toBe('args');
    });

    it('should catch errors', async () => {
        const methodMock = jest.fn((params, cb) => cb('error'));
        // @ts-ignore
        AWS.DynamoDB.DocumentClient.mockImplementationOnce(() => ({erroredOne: methodMock}));

        // @ts-ignore
        AWS.config.update.mockImplementationOnce(jest.fn());

        await expect(async () => await new DynamoDbPublisher({options: {region: 'far'}, command: 'erroredOne', params: 'params'} as any,
            () => true).publish()).rejects.toBe('error');

        expect(methodMock).toHaveBeenCalledWith('params', expect.any(Function));
    });

    it('should fire onCommandCompleted event', async () => {
        // @ts-ignore
        AWS.DynamoDB.DocumentClient.mockImplementationOnce(() => ({hookTest: (params, cb) => cb(null, 'args')}));
        const hookMock = jest.fn();

        // @ts-ignore
        AWS.config.update.mockImplementationOnce(jest.fn());

        const response = await new DynamoDbPublisher({options: {region: 'far'}, command: 'hookTest', params: 'params'} as any,
            hookMock).publish();

        expect(hookMock).toHaveBeenCalledWith('onCommandCompleted', 'args');
        expect(response).toBe('args');
    });

});
