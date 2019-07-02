import { Publisher, InputPublisherModel as PublisherModel } from 'enqueuer';
import * as anyDb from 'any-db';

export class AnyDbPublisher extends Publisher {
    private readonly url: string;

    public constructor(publisherProperties: PublisherModel) {
        super(publisherProperties);
    
        this.url = `${this.options.driver}://${this.options.user}:${this.options.password}@${this.options.hostname}/${this.options.database}`
    }

    public async publish(): Promise<any> {
        return new Promise((resolve, reject) => {
            let connection = anyDb.createConnection(this.url);
            connection.query(this.query, [], (error:Error, result: anyDb.ResultSet) => {
                if(error) {
                    console.log(error);
                    reject(error);
                    return;
                }
                console.log(result);
                resolve(result);
            });
        });
    }

}
