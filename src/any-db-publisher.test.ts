import * as anyDb from 'any-db';
import {AnyDbPublisher} from './any-db-publisher';

jest.mock('any-db');

describe('AnyDbPublisher', () => {
    let queryMock: any;

    beforeEach(() => {
        queryMock = jest.fn((query: string, params: string[], callback: Function) => callback());
    });

    it('should create connection with correct url', async () => {
        const createConnectionMock = jest.fn((url, cb) => cb(null, ({
            query: (query: string, params: string[], callback: Function) => callback()
        })));
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce(createConnectionMock);

        const publisherProperties: any = {
            options: {
                driver: 'driver',
                user: 'user',
                password: 'password',
                hostname: 'hostname',
                database: 'database',
            }
        };
        await new AnyDbPublisher(publisherProperties).publish();

        expect(createConnectionMock).toHaveBeenCalledWith('driver://user:password@hostname/database', expect.any(Function));
    });

    it('should reject when connection fails', async () => {
        const createConnectionMock = jest.fn((url, cb) => cb('Connection error', ({
            query: (query: string, params: string[], callback: Function) => callback()
        })));
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce(createConnectionMock);

        const publisherProperties: any = {
            options: {
                driver: 'driver',
                user: 'user',
                password: 'password',
                hostname: 'hostname',
                database: 'database',
            }
        };

        await expect(new AnyDbPublisher(publisherProperties).publish()).rejects.toBe('Connection error');
    });

    it('should query correctly', async () => {
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce((url, cb) => cb(null, ({
            query: queryMock
        })));

        const publisherProperties: any = {
            options: {},
            query: 'select some stuff'
        };
        await new AnyDbPublisher(publisherProperties).publish();

        expect(queryMock.mock.calls[0][0]).toBe(publisherProperties.query);
    });

    it('should default params to empty list', async () => {
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce((url, cb) => cb(null, ({
            query: queryMock
        })));

        const publisherProperties: any = {
            options: {},
            query: 'select some stuff'
        };
        await new AnyDbPublisher(publisherProperties).publish();

        expect(queryMock.mock.calls[0][1]).toEqual([]);
    });

    it('should send params to query method', async () => {
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce((url, cb) => cb(null, ({
            query: queryMock
        })));

        const publisherProperties: any = {
            options: {},
            query: 'select some stuff',
            params: [1, 'string', true]
        };
        await new AnyDbPublisher(publisherProperties).publish();

        expect(queryMock.mock.calls[0][1]).toEqual([1, 'string', true]);
    });

    it('should reject when error', async () => {
        queryMock = jest.fn((query: string, params: string[], callback: Function) => callback('Error'));
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce((url, cb) => cb(null, ({
            query: queryMock
        })));

        const publisherProperties: any = {
            options: {},
            query: 'select some stuff',
            params: [1, 'string', true]
        };

        await expect(new AnyDbPublisher(publisherProperties).publish()).rejects.toBe('Error');
    });

    it('should resolve with query return', async () => {
        queryMock = jest.fn((query: string, params: string[], callback: Function) => callback(null, 'good return'));
        // @ts-ignore
        anyDb.createConnection.mockImplementationOnce((url, cb) => cb(null, ({
            query: queryMock
        })));

        const publisherProperties: any = {
            options: {},
            query: 'select some stuff',
            params: [1, 'string', true]
        };

        await expect(new AnyDbPublisher(publisherProperties).publish()).resolves.toBe('good return');
    });
});
