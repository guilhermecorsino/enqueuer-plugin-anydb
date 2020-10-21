import {InputPublisherModel as PublisherModel, Logger, Publisher} from 'enqueuer';
import * as anyDb from 'any-db';

export class DefaultPublisher extends Publisher {

    public constructor(publisherProperties: PublisherModel, hook: any) {
        super(publisherProperties);

        this.hook = hook;

        this.url = `${this.options.driver}://${this.options.user}:${this.options.password}@${this.options.hostname}/${this.options.database}`;
    }

    public async publish(): Promise<any> {
        return new Promise((resolve, reject) => {
            anyDb.createConnection(this.url, ((error, connection) => {
                if (error) {
                    Logger.error(error.toString());
                    reject(error);
                    return;

                }
                connection.query(this.query, this.params || [], (error: Error, result: anyDb.ResultSet) => {
                    if (error) {
                        Logger.error(error.toString());
                        reject(error);
                        return;
                    }
                    Logger.trace(`Query completed: ${result}`);
                    this.executeHookEvent('onQueryCompleted', result);
                    resolve(result);
                });
            }));
        });
    }
}
