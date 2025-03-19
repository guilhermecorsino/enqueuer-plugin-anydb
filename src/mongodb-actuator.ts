import {
  InputActuatorModel as ActuatorModel,
  Logger,
  Actuator,
} from "enqueuer";

import { MongoClient, MongoServerError } from "mongodb";

export class MongoDbActuator extends Actuator {
  private readonly client: MongoClient;

  public constructor(properties: ActuatorModel) {
    super(properties);

    const url = `mongodb://${this.options.host}:${this.options.port}`;
    this.client = new MongoClient(url, {
      auth: {
        username: this.options.username,
        password: this.options.password,
      },
    });
  }

  public async act(): Promise<any> {
    try {
      const db = this.client.db(this.options.database);
      Logger.trace("Connected successfully to database");
      const collection = db.collection(this.collection);
      Logger.trace("Connected successfully to collection");
      if (!(this.methodName in collection)) {
        throw new Error(`Method '${this.methodName}' not found in collection`);
      }

      let result: { [propname: string]: any };
      if (this.methodName === "find") {
        result = {
          documents: await collection
            .find(this.methodParams, this.methodOptions)
            .toArray(),
        };
      } else {
        //@ts-expect-error
        result = await collection[this.methodName](
          this.methodParams,
          this.methodOptions
        );
      }

      Logger.trace(`Query completed: ${result}`);
      this.executeHookEvent("onQueryCompleted", result);
      return result;
    } catch (error) {
      if (error instanceof MongoServerError) {
        Logger.error(`Error executing mongodb query: ${error.errmsg}`);
      } else {
        Logger.error(`Error executing query: ${error}`);
      }
      throw error;
    }
  }
}
